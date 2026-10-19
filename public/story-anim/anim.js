// Animacje dla grafik cennika (story 1080x1920).
// Tryb na żywo: otwórz plik w przeglądarce. Tryb nagrywania: ?capture=1 + window.__seek(ms).
(function () {
  const capture = new URLSearchParams(location.search).has("capture");
  const EASE = "cubic-bezier(.25,.8,.25,1)";
  const LOGO_SPIN = 10000; // jeden pełny obrót logo = długość filmu, więc film się zapętla
  const anims = [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function anim(el, keyframes, opts) {
    if (!el) return;
    anims.push(el.animate(keyframes, { fill: "both", easing: EASE, ...opts }));
  }

  // Delikatne wejście: pojawienie się z lekkim przesunięciem w górę.
  function enter(el, delay, distance = 20, duration = 800) {
    anim(el, [{ opacity: 0, transform: `translateY(${distance}px)` }, { opacity: 1, transform: "none" }], { delay, duration });
  }

  // Logo 3D: warstwy klonów w osi Z dają grubość, tył ma własną (nielustrzaną) kopię logo,
  // a całość powoli obraca się wokół własnej osi pionowej.
  function logo3d(img, { thickness, edge, round }) {
    const persp = document.createElement("div");
    persp.style.cssText = "display:inline-block;perspective:1100px;";
    const body = document.createElement("div");
    body.style.cssText = "position:relative;display:block;transform-style:preserve-3d;";
    const w = img.offsetWidth, h = img.offsetHeight;
    img.parentNode.insertBefore(persp, img);
    persp.appendChild(body);

    const half = thickness / 2;
    const layer = (z, extra) => {
      const c = img.cloneNode();
      c.style.cssText = `display:block;position:absolute;left:0;top:0;width:${w}px;height:${h}px;box-shadow:none;transform:translateZ(${z}px)${extra || ""};`;
      body.appendChild(c);
      return c;
    };
    for (let z = -half + 1; z < half; z += 1) {
      const c = layer(z);
      c.style.filter = `brightness(${edge})`;
    }
    // Na monecie tył pokazuje czytelne logo; wycięty znak „K” to bryła, więc od tyłu widać jego lustrzane odbicie.
    if (round) layer(-half, " rotateY(180deg)").style.backfaceVisibility = "hidden";
    else layer(-half);

    img.style.position = "relative";
    img.style.display = "block";
    img.style.width = `${w}px`;
    img.style.height = `${h}px`;
    img.style.transform = `translateZ(${half}px)`;
    if (round) img.style.backfaceVisibility = "hidden";
    body.appendChild(img);

    const shine = document.createElement("div");
    const mask = `url(${img.getAttribute("src")}) center / 100% 100% no-repeat`;
    shine.style.cssText = `position:absolute;inset:0;transform:translateZ(${half + 0.5}px);pointer-events:none;
      backface-visibility:hidden;background:linear-gradient(105deg,transparent 35%,rgba(110,226,255,.8) 50%,transparent 65%) 0 0 / 300% 100%;
      -webkit-mask:${mask};mask:${mask};${round ? "border-radius:50%;" : ""}`;
    body.appendChild(shine);

    anim(persp, [{ opacity: 0 }, { opacity: 1 }], { duration: 900 });
    anim(body, [{ transform: "rotateY(0deg)" }, { transform: "rotateY(360deg)" }],
      { duration: LOGO_SPIN, iterations: Infinity, easing: "linear" });
    anim(shine, [{ backgroundPosition: "150% 0" }, { backgroundPosition: "-50% 0" }],
      { delay: 1300, duration: 3000, iterations: Infinity, easing: "ease-in-out" });
  }

  // Logo Akademii: obraca się tylko znak „K” z piłką, napis zostaje nieruchomy.
  // Pozycje w procentach odpowiadają kadrowaniu plików w /academy (logo 1050x667).
  function splitAcademyLogo(img) {
    const box = document.createElement("div");
    box.style.cssText = `position:relative;display:inline-block;width:${img.offsetWidth}px;height:${img.offsetHeight}px;vertical-align:middle;`;
    img.replaceWith(box);
    const word = document.createElement("img");
    word.src = "/academy/kapusz-academy-wordmark-light.webp";
    word.style.cssText = "position:absolute;left:0;top:56.37%;width:100%;height:43.63%;";
    const holder = document.createElement("div");
    holder.style.cssText = "position:absolute;left:32.48%;top:1.5%;width:38.29%;height:54.72%;";
    const mark = document.createElement("img");
    mark.src = "/academy/kapusz-academy-mark-light.webp";
    mark.style.cssText = "display:block;width:100%;height:100%;";
    holder.appendChild(mark);
    box.append(word, holder);
    return mark;
  }

  function shine(el, delay) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;";
    const s = document.createElement("div");
    s.style.cssText = "position:absolute;top:0;bottom:0;width:40%;background:linear-gradient(100deg,transparent,rgba(110,226,255,.22),transparent);";
    wrap.appendChild(s);
    el.appendChild(wrap);
    anim(s, [{ transform: "translateX(-120%)" }, { transform: "translateX(320%)" }],
      { delay, duration: 3200, iterations: Infinity, easing: "ease-in-out" });
  }

  function build() {
    const root = $(".s1, .s2");
    const v1 = root.classList.contains("s1");

    // tło
    anim(root, [{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
    if (v1) {
      anims.push(root.animate([{ backgroundPosition: "0 0" }, { backgroundPosition: "80px 80px" }],
        { pseudoElement: "::before", duration: 10000, iterations: Infinity }));
    } else {
      anim($(".s2-court"), [{ opacity: 0 }, { opacity: 1 }], { duration: 1400 });
      anim($(".s2-glow"), [{ opacity: 0.6 }, { opacity: 1 }, { opacity: 0.6 }],
        { duration: 5000, iterations: Infinity, easing: "ease-in-out" });
    }

    // logo
    const logo = $(v1 ? ".s1-brand img" : ".s2-head img");
    if (/academy/.test(logo.getAttribute("src"))) {
      logo3d(splitAcademyLogo(logo), { thickness: 14, edge: 0.55, round: false });
    } else {
      logo3d(logo, { thickness: 24, edge: 0.62, round: true });
    }

    // nagłówek
    let t = 300;
    if (v1) {
      enter($(".s1-brand > div:not(.s1-pill)"), t);
      enter($(".s1-pill"), (t += 150));
      enter($(".s1 h1"), (t += 150), 24);
      t += 150;
      $$(".s1-chip").forEach((el) => enter(el, (t += 70), 14, 700));
    } else {
      enter($(".s2-head small"), t);
      enter($(".s2-head h1"), (t += 150), 24);
      enter($(".s2-head p"), (t += 150), 14);
    }

    // kafelki
    t += 250;
    $$(v1 ? ".s1-cat, .s1-row" : ".s2-cat, .s2-row").forEach((el) => {
      enter(el, t, 24);
      if (el.classList.contains("hot")) shine(el, t + 1400);
      t += 90;
    });
    $$(".s2-pack").forEach((el, k) => {
      enter(el, t, 24);
      shine(el, t + 1400 + k * 400);
      t += 90;
    });

    // stopka + puls CTA
    t += 150;
    if (v1) {
      const foot = $(".s1-foot");
      enter(foot, t, 24);
      anim(foot, [{ boxShadow: "0 0 0 0 rgba(0,200,255,.45)" }, { boxShadow: "0 0 0 22px rgba(0,200,255,0)" }],
        { delay: t + 1000, duration: 2000, iterations: Infinity, easing: "ease-out", fill: "none" });
    } else {
      enter($(".s2-foot .info"), t, 14);
      const tel = $(".s2-foot .tel");
      enter(tel, t + 100, 24);
      anim(tel, [{ boxShadow: "0 0 30px rgba(0,200,255,.3), 0 0 0 0 rgba(0,200,255,.45)" },
        { boxShadow: "0 0 30px rgba(0,200,255,.3), 0 0 0 22px rgba(0,200,255,0)" }],
        { delay: t + 1100, duration: 2000, iterations: Infinity, easing: "ease-out", fill: "none" });
    }
  }

  async function init() {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((i) => i.decode().catch(() => {})));
    build();
    if (capture) {
      anims.forEach((a) => a.pause());
      window.__seek = (ms) => anims.forEach((a) => (a.currentTime = ms));
      window.__seek(0);
      window.__ready = true;
    }
  }

  init();
})();
