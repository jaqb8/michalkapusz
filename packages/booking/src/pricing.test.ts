import { describe, expect, it } from "vitest";
import { FORMATS, canBuyPack, quote } from "./pricing";

describe("quote", () => {
  it("prices a single individual session for the whole court", () => {
    const q = quote({ audience: "adult", format: "individual", billing: "single" });
    expect(q.price).toBe(120);
    expect(q.unit).toBe("zł za trening");
    expect(q.note).toBe("+ pełna cena kortu");
    expect(q.title).toBe("Dorośli · Indywidualnie");
  });

  it("prices group sessions per person with a share of the court", () => {
    const q = quote({ audience: "junior", format: "group4", billing: "single" });
    expect(q.price).toBe(50);
    expect(q.unit).toBe("zł / os. za trening");
    expect(q.note).toBe("+ ¼ ceny kortu");
  });

  it("prices a duo pack per person and shows the saving", () => {
    const q = quote({ audience: "adult", format: "duo", billing: "pack10" });
    expect(q.price).toBe(700);
    expect(q.unit).toBe("zł / os. · pakiet 10 treningów");
    expect(q.note).toBe("70 zł za trening · oszczędzasz 50 zł · + ½ ceny kortu");
    expect(q.billing).toBe("pack10");
  });

  it("falls back to a single session when a pack is not offered", () => {
    const q = quote({ audience: "child", format: "group3", billing: "pack10" });
    expect(q.price).toBe(60);
    expect(q.billing).toBe("single");
  });

  it("keeps pack prices consistent with the single price", () => {
    for (const format of FORMATS) {
      if (!("pack" in format)) continue;
      expect(format.pack.perSession * 10).toBe(format.pack.price);
      expect(format.price * 10 - format.pack.price).toBe(format.pack.saving);
    }
  });

  it("offers packs only for duo and individual", () => {
    expect(FORMATS.filter((f) => canBuyPack(f.id)).map((f) => f.id)).toEqual(["duo", "individual"]);
  });
});
