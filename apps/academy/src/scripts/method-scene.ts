/**
 * Sekcja "Metoda": jedno uderzenie forhendem rozłożone na cztery filary.
 * Klatki nagrania są przewijane ręcznie (currentTime), a nakładka SVG jest malowana co klatkę.
 * Bez JS albo przy ograniczeniu ruchu zostaje statyczny plakat.
 */

// Nagranie: klatki 36–153, interpolowane do 4 klatek na klatkę źródłową.
const F0 = 36;
const FPS = 25;
const SUB = 4;
const LAST = 468;
const TRAIL = 1994;
const TRAIL_LEN = [
  0, 7, 16, 26, 42, 73, 107, 137, 165, 190, 216, 243, 271, 297, 327, 364, 408, 474, 528, 576, 729, 856, 1034, 1121,
  1246, 1347, 1430, 1460, 1508, 1586, 1682, 1811, 1926, 1959, 1963, 1977, 1994,
];
type Pt = [number, number];
const HEAD: Pt[] = [
  [314, 115], [319, 113], [325, 119], [324, 128], [324, 145], [334, 174], [344, 207], [348, 236], [350, 264],
  [355, 289], [360, 314], [362, 341], [361, 369], [354, 394], [342, 421], [328, 456], [302, 490], [241, 516],
  [189, 531], [215, 507], [367, 498], [494, 495], [670, 470], [757, 462], [871, 412], [970, 390], [1050, 369],
  [1052, 345], [1012, 319], [943, 282], [850, 262], [727, 297], [620, 341], [590, 355], [590, 356], [590, 342],
  [594, 326],
];
const BALL: Pt[] = [
  [1152, 702], [1092, 586], [1031, 480], [976, 389], [925, 310], [877, 240], [829, 182], [782, 139], [734, 104],
  [690, 77], [648, 62], [606, 56], [567, 61], [528, 75], [489, 100], [454, 134], [420, 173], [385, 219], [351, 275],
  [321, 334], [291, 402], [256, 480], [352, 426], [514, 304], [680, 182], [862, 62], [1044, -58],
];
/** Klatka, w której stopa dotyka kortu (kolejność jak w markupie). */
const FEET_FRAME = [38, 38, 56, 62, 92, 94, 118];

// Pętla: każdy krok gra (zwalniając do stopklatki), potem stoi sekundę.
const PAUSE = 1;
const RESET = 0.6;
const TIMELINE = [
  { d: 2.8, f0: 36, f1: 100, t0: 0 },
  { d: 1.25, f0: 100, f1: 112, t0: 0 },
  { d: 1.15, f0: 112, f1: 119, t0: 0 },
  { d: 1.4, f0: 119, f1: 119, t0: 0 },
  { d: 3, f0: 119, f1: 153, t0: 0 },
];
let acc = 0;
for (const step of TIMELINE) {
  step.t0 = acc;
  acc += step.d + PAUSE;
}
const LOOP = acc + RESET;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
// Pełna prędkość, potem zwolnienie do 1/4 w ostatnich 28% kroku.
const slowOut = (u: number) => {
  const a = 0.72;
  const e = 0.25;
  const total = a + ((1 - a) * (1 + e)) / 2;
  if (u <= a) return u / total;
  const x = u - a;
  return (a + x - ((1 - e) * x * x) / (2 * (1 - a))) / total;
};
function at(list: number[], i: number): number;
function at(list: Pt[], i: number): Pt;
function at(list: number[] | Pt[], i: number): number | Pt {
  const i0 = Math.max(0, Math.min(list.length - 1, Math.floor(i)));
  const i1 = Math.min(list.length - 1, i0 + 1);
  const w = clamp(i - i0);
  const a = list[i0];
  const b = list[i1];
  if (Array.isArray(a) && Array.isArray(b)) return [a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w];
  return (a as number) + ((b as number) - (a as number)) * w;
}

type El = HTMLElement | SVGElement;

export function mountMethodScene(root: HTMLElement, videoUrl: string) {
  const E: Record<string, El | undefined> = {};
  root.querySelectorAll<HTMLElement | SVGElement>("[data-st]").forEach((el) => {
    E[el.dataset.st as string] = el;
  });
  const live = E.live as HTMLElement | undefined;
  const still = E.still as HTMLElement | undefined;
  const frame = E.frame as HTMLElement | undefined;
  const video = E.video as HTMLVideoElement | undefined;
  if (!live || !still || !frame || !video) return;

  const steps = [...root.querySelectorAll<HTMLLIElement>("[data-st-step]")];
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-st-go]")];

  // Plakat zostaje pod spodem, dopóki nagranie się nie wczyta.
  live.hidden = false;

  let t = 0;
  let raf = 0;
  let last = 0;
  let visible = false;
  let ready = false;
  let lastFrame = -1;
  let currentStep = -1;
  let objectUrl: string | undefined;
  let loading = false;

  const op = (el: El | undefined, v: number) => {
    if (el) el.style.opacity = String(Math.round(v * 1000) / 1000);
  };
  const set = (el: Element | undefined, attr: string, v: string) => el?.setAttribute(attr, v);

  const fallBackToStill = () => {
    cancelAnimationFrame(raf);
    raf = 0;
    live.hidden = true;
    still.hidden = false;
    steps.forEach((li) => li.classList.add("on"));
  };

  // Nagranie pobierane w całości, żeby przewijać do dowolnej klatki bez zapytań o zakresy.
  const load = () => {
    if (loading) return;
    loading = true;
    video.muted = true;
    video.addEventListener("loadeddata", () => {
      ready = true;
      still.hidden = true;
      lastFrame = -1;
      t = 0;
      kick();
    });
    video.addEventListener("error", () => {
      if (video.src.startsWith("blob:")) {
        video.src = videoUrl;
        return;
      }
      fallBackToStill();
    });
    fetch(videoUrl)
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {
        video.src = videoUrl;
      });
  };

  const setStep = (k: number) => {
    if (k === currentStep) return;
    currentStep = k;
    steps.forEach((li, i) => {
      li.classList.toggle("on", i === k);
      li.classList.toggle("done", i < k);
    });
    buttons.forEach((btn, i) => btn.setAttribute("aria-pressed", String(i === k)));
  };

  const draw = () => {
    const reset = t >= LOOP - RESET;
    let k = 0;
    for (let i = TIMELINE.length - 1; i >= 0; i--) {
      if (t >= TIMELINE[i].t0) {
        k = i;
        break;
      }
    }
    const sg = TIMELINE[k];
    const ts = t - sg.t0;
    const u = clamp(ts / sg.d);
    // Finał gra dokończenie ruchu w pierwszych 60%, potem robi miejsce na znak akademii.
    const f = sg.f0 + (sg.f1 - sg.f0) * slowOut(k === 4 ? clamp(ts / (sg.d * 0.6)) : u);
    const back = k === 4 ? ease(ramp(u, 0.45, 0.7)) : 0;
    const fade = 1 - 0.78 * back;
    // Bieżący krok wchodzi, poprzednie zostają jako blady kontekst; przy kontakcie reszta cichnie.
    const grp = (K: number) =>
      (k < K ? 0 : k === K ? ease(ramp(ts, 0, 0.35)) : k === 3 ? 0.18 : k === 4 ? (K === 2 ? 0.7 : 0.3) : 0.45) * fade;

    op(live, (t < 0.45 ? ease(t / 0.45) : 1) * (reset ? 1 - ease((t - LOOP + RESET) / RESET) : 1));
    if (ready && !video.seeking) {
      const j = Math.max(0, Math.min(LAST, Math.round((f - F0) * SUB)));
      if (j !== lastFrame) {
        lastFrame = j;
        video.currentTime = (j + 0.5) / (FPS * SUB);
      }
    }
    op(video, 1 - 0.72 * back);

    // Ruch: każdy krok wysyła falę światła po korcie.
    op(E.gRuch, grp(0));
    op(E.tRuch, grp(0));
    if (E.rip) {
      Array.from(E.rip.children).forEach((g, i) => {
        const a = FEET_FRAME[i];
        [0, 1].forEach((j) => {
          const w = clamp((f - a - j * 4) / 14);
          const rx = 12 + 95 * w;
          const ring = g.children[j] as SVGElement;
          set(ring, "rx", rx.toFixed(1));
          set(ring, "ry", (rx * 0.22).toFixed(1));
          op(ring, w > 0 && w < 1 ? 0.9 * Math.pow(1 - w, 1.3) : 0);
        });
        op(g.children[2] as SVGElement, f >= a ? 0.7 : 0);
      });
    }

    // Taktyka: wachlarz kierunków, z którego zostaje jeden.
    op(E.gTak, grp(1));
    const drawn = k === 1 ? ease(ramp(u, 0.05, 0.55)) : k > 1 ? 1 : 0;
    const pick = k === 1 ? ease(ramp(u, 0.55, 0.95)) : k > 1 ? 1 : 0;
    if (E.rays) {
      Array.from(E.rays.children).forEach((node, i) => {
        const ray = node as SVGElement;
        ray.style.strokeDashoffset = String(780 * (1 - drawn));
        op(ray, i === 2 ? 0.45 + 0.55 * pick : 0.5 - 0.36 * pick);
        if (i === 2) ray.style.strokeWidth = (1.4 + 1.4 * pick).toFixed(2);
      });
    }
    op(E.goal, pick);
    op(E.tTak, grp(1) * (k === 1 ? ramp(u, 0.55, 0.85) : 1));

    // Technika: jedna smuga światła, powtarzana aż jest za każdym razem taka sama.
    op(E.gTech, grp(2));
    op(E.tTech, grp(2));
    const ti = clamp(f, 100, 136) - 100;
    const off = String(TRAIL - (f < 100 ? 0 : at(TRAIL_LEN, ti)));
    const ghostOff = String(TRAIL - (f < 100 ? 0 : at(TRAIL_LEN, Math.max(0, ti - 2))));
    [E.trg, E.trc].forEach((el) => {
      if (el) el.style.strokeDashoffset = off;
    });
    [E.gh1, E.gh2].forEach((el) => {
      if (el) el.style.strokeDashoffset = ghostOff;
    });
    const cometOn = k >= 2 && f >= 100 && f <= 136;
    if (E.comet && cometOn) {
      const h = at(HEAD, ti);
      E.comet.style.transform = `translate(${h[0].toFixed(1)}px, ${h[1].toFixed(1)}px)`;
    }
    op(E.comet, cometOn ? 1 : 0);
    const flash = k === 2 ? ramp(f, 117.5, 119) : k === 3 ? 1 - ramp(ts, 0, 0.8) : 0;
    set(E.flash, "r", (26 + 46 * flash).toFixed(1));
    op(E.flash, flash);

    // Głowa: moment kontaktu zastyga: aureola, powolny oddech, przyciemnione brzegi.
    op(E.gGlo, k < 3 ? 0 : k === 3 ? ease(ramp(ts, 0, 0.4)) : 0.3 * fade);
    op(E.tGlo, k < 3 ? 0 : k === 3 ? ease(ramp(ts, 0.15, 0.45)) : 0.3 * fade);
    [E.br1, E.br2].forEach((el, i) => {
      const ph = (ts / 1.6 + i * 0.5) % 1;
      set(el, "r", (60 + 85 * ph).toFixed(1));
      op(el, k === 3 ? (1 - ph) * 0.5 : 0);
    });
    op(E.vig, k === 3 ? 0.85 * ease(ramp(ts, 0.1, 0.6)) : k === 4 ? 0.85 * (1 - ramp(ts, 0, 0.5)) : 0);

    // Piłka, a w finale jej powrót do znaku akademii.
    const bi = f - 98;
    const ballOn = bi >= 0 && bi <= BALL.length - 1;
    if (E.ball && ballOn) {
      const b = at(BALL, bi);
      E.ball.style.transform = `translate(${b[0].toFixed(1)}px, ${b[1].toFixed(1)}px)`;
    }
    op(E.ball, ballOn ? 1 : 0);
    const lf = k === 4 ? ease(ramp(u, 0.55, 0.8)) : 0;
    op(E.fin, lf);
    if (E.fin) E.fin.style.transform = `scale(${(0.94 + 0.06 * lf).toFixed(4)})`;
    op(E.cap, k === 4 ? ease(ramp(u, 0.8, 0.98)) : 0);
    if (E.fb) {
      const tb = k === 4 ? ease(ramp(u, 0.6, 0.92)) : 0;
      const x = (1 - tb) * (1 - tb) * 1100 + 2 * (1 - tb) * tb * 960 + tb * tb * 719;
      const y = (1 - tb) * (1 - tb) * -70 + 2 * (1 - tb) * tb * 120 + tb * tb * 364;
      const mix = (a: number, b: number) => Math.round(a + (b - a) * tb);
      set(E.fb, "cx", x.toFixed(1));
      set(E.fb, "cy", y.toFixed(1));
      set(E.fb, "r", (6.5 + 34.5 * tb).toFixed(1));
      E.fb.style.fill = `rgb(${mix(255, 167)}, ${mix(255, 148)}, ${mix(255, 132)})`;
      op(E.fb, k === 4 && u > 0.6 ? 1 - ramp(u, 0.92, 0.98) : 0);
    }
    set(E.hole, "r", (42 * (1 - (k === 4 ? ramp(u, 0.9, 0.96) : 0))).toFixed(1));

    // Linia kroku wypełnia się przez cały krok, łącznie z pauzą.
    for (let i = 0; i < 5; i++) {
      const bar = E[`bar${i}`];
      if (bar) bar.style.transform = `scaleX(${(k > i ? 1 : k === i ? clamp(ts / (sg.d + PAUSE)) : 0).toFixed(4)})`;
    }
    setStep(k);
  };

  const loop = (now: number) => {
    raf = 0;
    if (!visible) return;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    if (ready) t = (t + dt) % LOOP;
    draw();
    raf = requestAnimationFrame(loop);
  };

  function kick() {
    if (visible && !raf) {
      last = 0;
      raf = requestAnimationFrame(loop);
    }
  }

  buttons.forEach((btn, i) =>
    btn.addEventListener("click", () => {
      t = TIMELINE[i].t0;
      draw();
    }),
  );

  // Pętla działa tylko, gdy scena jest na ekranie; nagranie zaczyna się ładować tuż przed nią.
  const preload = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        load();
        preload.disconnect();
      }
    },
    { rootMargin: "600px 0px" },
  );
  preload.observe(frame);

  new IntersectionObserver((entries) => {
    visible = entries.some((e) => e.isIntersecting);
    kick();
  }).observe(frame);

  setStep(0);
  draw();
  window.addEventListener("pagehide", () => {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  });
}
