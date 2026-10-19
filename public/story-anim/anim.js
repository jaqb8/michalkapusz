// Animacje dla grafik cennika (story 1080x1920).
// Tryb na żywo: otwórz plik w przeglądarce. Tryb nagrywania: ?capture=1 + window.__seek(ms).
(function () {
  const capture = new URLSearchParams(location.search).has("capture");
  const EASE = "cubic-bezier(.2,.8,.2,1)";
  const anims = [];
  const counters = [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function anim(el, keyframes, opts) {
    if (!el) return;
    anims.push(el.animate(keyframes, { fill: "both", easing: EASE, ...opts }));
  }

  function enter(el, delay, from, duration = 700) {
    anim(el, [{ opacity: 0, transform: from }, { opacity: 1, transform: "none" }], { delay, duration });
  }

  // Logo 3D: warstwy klonów w osi Z dają grubość, całość obraca się w perspektywie.
  function logo3d(img, { layers, depth, round }) {
    const persp = document.createElement("div");
    persp.style.cssText = "display:inline-block;perspective:900px;";
    const sway = document.createElement("div");
    sway.style.cssText = "display:inline-block;transform-style:preserve-3d;";
    const body = document.createElement("div");
    body.style.cssText = "position:relative;display:block;transform-style:preserve-3d;";
    img.parentNode.insertBefore(persp, img);
    persp.appendChild(sway);
    sway.appendChild(body);
    for (let i = layers; i >= 1; i--) {
      const c = img.cloneNode();
      c.style.cssText = `display:block;position:absolute;left:0;top:0;box-shadow:none;transform:translateZ(${-i * depth}px);filter:brightness(${0.22 + 0.25 * (1 - i / layers)});`;
      body.appendChild(c);
    }
    img.style.position = "relative";
    img.style.display = "block";
    img.style.transform = "translateZ(0)";
    body.appendChild(img);

    const shine = document.createElement("div");
    const mask = `url(${img.getAttribute("src")}) center / 100% 100% no-repeat`;
    shine.style.cssText = `position:absolute;inset:0;transform:translateZ(1px);pointer-events:none;
      background:linear-gradient(105deg,transparent 35%,rgba(110,226,255,.85) 50%,transparent 65%) 0 0 / 300% 100%;
      -webkit-mask:${mask};mask:${mask};${round ? "border-radius:50%;" : ""}`;
    body.appendChild(shine);

    anim(body, [
      { opacity: 0, transform: "translateY(-40px) rotateX(35deg) rotateY(-540deg) scale(.3)" },
      { opacity: 1, offset: 0.25 },
      { opacity: 1, transform: "rotateX(0) rotateY(0) scale(1)" },
    ], { delay: 0, duration: 2200, easing: "cubic-bezier(.22,1,.36,1)" });
    anim(sway, [
      { transform: "rotateY(0) rotateX(0)", easing: "ease-out" },
      { transform: "rotateY(38deg) rotateX(-12deg)", easing: "ease-in-out" },
      { transform: "rotateY(-38deg) rotateX(12deg)", easing: "ease-in" },
      { transform: "rotateY(0) rotateX(0)" },
    ], { delay: 2200, duration: 5000, iterations: Infinity, easing: "linear", fill: "none" });
    anim(shine, [{ backgroundPosition: "150% 0" }, { backgroundPosition: "-50% 0" }],
      { delay: 1300, duration: 3000, iterations: Infinity, easing: "ease-in-out", fill: "both" });
  }

  function counter(el, start, duration = 900) {
    if (!el) return;
    const node = Array.from(el.childNodes).find((n) => n.nodeType === 3 && /\d/.test(n.textContent));
    if (!node) return;
    const target = parseInt(node.textContent, 10);
    counters.push({ node, target, start, duration });
  }

  function updateCounters(t) {
    for (const c of counters) {
      const p = Math.min(1, Math.max(0, (t - c.start) / c.duration));
      const e = 1 - Math.pow(1 - p, 3);
      c.node.textContent = String(Math.round(c.target * e));
    }
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
        { pseudoElement: "::before", duration: 6000, iterations: Infinity }));
    } else {
      anim($(".s2-court"), [{ opacity: 0, transform: "translateX(-50%) perspective(900px) rotateX(75deg) scale(.6)" },
        { opacity: 1, transform: "translateX(-50%) perspective(900px) rotateX(58deg)" }], { duration: 1600 });
      anim($(".s2-glow"), [{ opacity: 0.5 }, { opacity: 1 }, { opacity: 0.5 }],
        { duration: 4000, iterations: Infinity, easing: "ease-in-out" });
    }

    // logo
    const logo = $(v1 ? ".s1-brand img" : ".s2-head img");
    const round = !/academy/.test(logo.getAttribute("src"));
    logo3d(logo, round ? { layers: 22, depth: 1.6, round } : { layers: 18, depth: 1.8, round });

    // nagłówek
    let t = 500;
    if (v1) {
      enter($(".s1-brand > div:not(.s1-pill)"), t, "translateX(-40px)");
      enter($(".s1-pill"), (t += 200), "translateY(20px) scale(.9)");
      anim($(".s1 h1"), [{ clipPath: "inset(-60px 100% -60px -60px)", transform: "translateX(-30px)" },
        { clipPath: "inset(-60px -60px -60px -60px)", transform: "none" }], { delay: (t += 150), duration: 900 });
      t += 300;
      $$(".s1-chip").forEach((el) => enter(el, (t += 90), "translateY(30px)", 500));
    } else {
      enter($(".s2-head small"), t, "translateY(20px)");
      anim($(".s2-head h1"), [{ opacity: 0, transform: "scale(1.4)", filter: "blur(12px)" },
        { opacity: 1, transform: "none", filter: "blur(0)" }], { delay: (t += 200), duration: 800 });
      enter($(".s2-head p"), (t += 300), "translateY(20px)");
    }

    // kafelki
    t = 1350;
    let i = 0;
    const rows = v1 ? $$(".s1-cat, .s1-row") : $$(".s2-cat, .s2-row");
    rows.forEach((el) => {
      const isCat = /-cat/.test(el.className);
      if (isCat) {
        enter(el, t, "translateX(-30px)", 500);
      } else {
        const dir = i++ % 2 ? 1 : -1;
        enter(el, t, `perspective(1200px) translateX(${dir * 160}px) rotateY(${dir * -28}deg)`, 750);
        counter($(v1 ? ".s1-price b" : ".s2-price", el), t + 150);
        if (el.classList.contains("hot")) shine(el, t + 1200);
      }
      t += isCat ? 80 : 120;
    });
    if (!v1) {
      $$(".s2-pack").forEach((el, k) => {
        enter(el, t, "perspective(1000px) translateY(80px) rotateX(35deg) scale(.9)", 800);
        counter($(".p", el), t + 200);
        anim($(".tag", el), [{ opacity: 0, transform: "scale(0) rotate(-20deg)" }, { opacity: 1, transform: "none" }],
          { delay: t + 500, duration: 500, easing: "cubic-bezier(.3,1.6,.5,1)" });
        shine(el, t + 1200 + k * 400);
        t += 160;
      });
    } else {
      $$(".s1-txt .save").forEach((el) => anim(el, [{ opacity: 0, transform: "scale(0)" }, { opacity: 1, transform: "none" }],
        { delay: 2600, duration: 450, easing: "cubic-bezier(.3,1.6,.5,1)" }));
    }

    // stopka + puls CTA
    t += 200;
    if (v1) {
      const foot = $(".s1-foot");
      enter(foot, t, "translateY(80px) scale(.92)", 800);
      anim(foot, [{ boxShadow: "0 0 0 0 rgba(0,200,255,.55)" }, { boxShadow: "0 0 0 26px rgba(0,200,255,0)" }],
        { delay: t + 900, duration: 1600, iterations: Infinity, easing: "ease-out", fill: "none" });
    } else {
      enter($(".s2-foot .info"), t, "translateY(30px)", 600);
      const tel = $(".s2-foot .tel");
      enter(tel, t + 150, "translateY(60px) scale(.85)", 800);
      anim(tel, [{ boxShadow: "0 0 30px rgba(0,200,255,.3), 0 0 0 0 rgba(0,200,255,.55)" },
        { boxShadow: "0 0 30px rgba(0,200,255,.3), 0 0 0 26px rgba(0,200,255,0)" }],
        { delay: t + 1000, duration: 1600, iterations: Infinity, easing: "ease-out", fill: "none" });
    }
  }

  async function init() {
    await document.fonts.ready;
    build();
    if (capture) {
      anims.forEach((a) => a.pause());
      window.__seek = (ms) => {
        anims.forEach((a) => (a.currentTime = ms));
        updateCounters(ms);
      };
      window.__seek(0);
      window.__ready = true;
    } else {
      const t0 = performance.now();
      const tick = () => {
        updateCounters(performance.now() - t0);
        requestAnimationFrame(tick);
      };
      tick();
    }
  }

  init();
})();
