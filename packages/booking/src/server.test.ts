import { describe, expect, it, vi } from "vitest";
import { MIN_FILL_MS, handleBookingSubmission, type Mailer, type OutgoingEmail } from "./server";
import { escapeHtml } from "./email";

const NOW = 1_800_000_000_000;

const validBody = {
  audience: "adult",
  format: "duo",
  billing: "pack10",
  name: "Anna Nowak",
  email: "anna@example.com",
  phone: "+48 600 100 200",
  days: ["tue", "thu"],
  times: ["evening"],
  multisport: true,
  message: "Gramy razem z mężem <b>od roku</b>.",
  consent: true,
  website: "",
  startedAt: NOW - 60_000,
};

function fakeMailer() {
  const sent: OutgoingEmail[] = [];
  const mailer: Mailer = {
    send: vi.fn(async (email: OutgoingEmail) => {
      sent.push(email);
    }),
  };
  return { mailer, sent };
}

const config = (mailer: Mailer) => ({
  mailer,
  from: "Akademia <rezerwacje@example.com>",
  coachTo: "coach@example.com",
  now: () => NOW,
});

describe("handleBookingSubmission", () => {
  it("sends the request to the coach and a confirmation to the client", async () => {
    const { mailer, sent } = fakeMailer();
    const result = await handleBookingSubmission(validBody, config(mailer));

    expect(result).toEqual({ ok: true });
    expect(sent).toHaveLength(2);

    const [coach, client] = sent;
    expect(coach.to).toBe("coach@example.com");
    expect(coach.replyTo).toBe("anna@example.com");
    expect(coach.subject).toContain("Anna Nowak");
    expect(coach.text).toContain("Trening dwuosobowy · pakiet 10 treningów · 700 zł / os. + ½ ceny kortu");
    expect(coach.text).toContain("wtorek, czwartek");
    expect(coach.text).toContain("Multisport");

    expect(client.to).toBe("anna@example.com");
    expect(client.replyTo).toBe("coach@example.com");
    expect(client.subject).toContain("Otrzymaliśmy");
  });

  it("escapes user input in the HTML body", async () => {
    const { mailer, sent } = fakeMailer();
    await handleBookingSubmission(validBody, config(mailer));
    expect(sent[0].html.includes("<b>od roku</b>")).toBe(false);
    expect(sent[0].html).toContain(escapeHtml("<b>od roku</b>"));
  });

  it("returns field errors for invalid input without sending anything", async () => {
    const { mailer, sent } = fakeMailer();
    const result = await handleBookingSubmission(
      { ...validBody, email: "nie-email", phone: "12", consent: false },
      config(mailer),
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(400);
    expect(Object.keys(result.errors).sort()).toEqual(["consent", "email", "phone"]);
    expect(sent).toHaveLength(0);
  });

  it("rejects a pack for formats that do not offer one", async () => {
    const { mailer } = fakeMailer();
    const result = await handleBookingSubmission({ ...validBody, format: "group4" }, config(mailer));
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.billing).toMatch(/Pakiet/);
  });

  it("silently drops submissions caught by the honeypot or filled too fast", async () => {
    const { mailer, sent } = fakeMailer();
    expect(await handleBookingSubmission({ ...validBody, website: "spam.example" }, config(mailer))).toEqual({ ok: true });
    expect(
      await handleBookingSubmission({ ...validBody, startedAt: NOW - MIN_FILL_MS + 100 }, config(mailer)),
    ).toEqual({ ok: true });
    expect(sent).toHaveLength(0);
  });

  it("fails when the coach email cannot be sent", async () => {
    const onError = vi.fn();
    const mailer: Mailer = { send: vi.fn().mockRejectedValue(new Error("down")) };
    const result = await handleBookingSubmission(validBody, { ...config(mailer), onError });
    expect(result).toMatchObject({ ok: false, status: 500 });
    expect(onError).toHaveBeenCalled();
  });

  it("still succeeds when only the client confirmation fails", async () => {
    const send = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error("bounce"));
    const result = await handleBookingSubmission(validBody, config({ send }));
    expect(result).toEqual({ ok: true });
  });

  it("rejects a body that is not an object", async () => {
    const { mailer } = fakeMailer();
    expect(await handleBookingSubmission("oops", config(mailer))).toMatchObject({ ok: false, status: 400 });
  });
});
