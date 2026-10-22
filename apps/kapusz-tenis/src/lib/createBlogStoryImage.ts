/** Grafika 1080 × 1920 do Instagram Story w stylu marki (kolory i fonty z tokenów CSS). */

export interface StoryPost {
  title: string;
  description: string;
  image?: string;
}

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const STORY_FALLBACK_IMAGE = "/og-logo-v2.jpg";
const STORY_LOGO = "/brand-mark.webp";

function token(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image: ${src}`));
    image.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, w: number, h: number) {
  const imageRatio = image.width / image.height;
  const targetRatio = w / h;
  const sw = imageRatio > targetRatio ? image.height * targetRatio : image.width;
  const sh = imageRatio > targetRatio ? image.height : image.width / targetRatio;
  ctx.drawImage(image, (image.width - sw) / 2, (image.height - sh) / 2, sw, sh, x, y, w, h);
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;

  const trimmed = lines.slice(0, maxLines);
  let last = trimmed[trimmed.length - 1];
  while (last.length > 0 && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1).trim();
  trimmed[trimmed.length - 1] = `${last}…`;
  return trimmed;
}

function drawLines(ctx: CanvasRenderingContext2D, lines: string[], x: number, y: number, lineHeight: number) {
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));
  return y + lines.length * lineHeight;
}

function toBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not create story image"))), "image/png");
  });
}

export async function createBlogStoryBlob(post: StoryPost) {
  const canvas = document.createElement("canvas");
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported");

  const black = token("--k-black", "#000000");
  const snow = token("--k-snow", "#f5f5f7");
  const gray = token("--k-gray-400", "#a1a1a6");
  const accent = token("--k-accent", "#a79383");
  const sans = token("--k-font-sans", "sans-serif");
  const mono = token("--k-font-mono", "monospace");

  await Promise.all([
    document.fonts.load(`600 80px ${sans}`),
    document.fonts.load(`400 40px ${sans}`),
    document.fonts.load(`400 26px ${mono}`),
  ]).catch(() => undefined);

  ctx.fillStyle = black;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  // Zdjęcie wpisu w górnej części, wtapiające się w czerń.
  const photoHeight = 1180;
  try {
    const background = await loadImage(post.image ?? STORY_FALLBACK_IMAGE);
    drawCover(ctx, background, 0, 0, STORY_WIDTH, photoHeight);
  } catch {
    try {
      drawCover(ctx, await loadImage(STORY_FALLBACK_IMAGE), 0, 0, STORY_WIDTH, photoHeight);
    } catch {
      /* zostaje czarne tło */
    }
  }
  const fadeOut = ctx.createLinearGradient(0, 0, 0, photoHeight);
  fadeOut.addColorStop(0, "rgba(0, 0, 0, 0.55)");
  fadeOut.addColorStop(0.25, "rgba(0, 0, 0, 0.1)");
  fadeOut.addColorStop(0.6, "rgba(0, 0, 0, 0.35)");
  fadeOut.addColorStop(1, black);
  ctx.fillStyle = fadeOut;
  ctx.fillRect(0, 0, STORY_WIDTH, photoHeight);

  // Znak i podpis marki.
  try {
    const logo = await loadImage(STORY_LOGO);
    const h = 64;
    ctx.drawImage(logo, 80, 150, (logo.width / logo.height) * h, h);
  } catch {
    /* bez znaku */
  }
  ctx.fillStyle = snow;
  ctx.font = `600 34px ${sans}`;
  ctx.fillText("Michał Kapusz", 172, 196);

  // Treść.
  ctx.fillStyle = accent;
  ctx.font = `400 26px ${mono}`;
  ctx.fillText("BLOG · KAPUSZ-TENIS.PL", 80, 1000);

  let size = 88;
  let lines: string[] = [];
  do {
    ctx.font = `600 ${size}px ${sans}`;
    lines = wrapLines(ctx, post.title, 920, 5);
    size -= 4;
  } while (lines.length >= 5 && size > 64);

  ctx.fillStyle = snow;
  const afterTitle = drawLines(ctx, lines, 80, 1110, (size + 4) * 1.08);

  ctx.fillStyle = gray;
  ctx.font = `400 38px ${sans}`;
  drawLines(ctx, wrapLines(ctx, post.description, 900, 4), 80, afterTitle + 70, 56);

  return toBlob(canvas);
}
