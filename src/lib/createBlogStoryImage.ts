import type { BlogPost } from "../content/blog/posts";

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const STORY_FALLBACK_IMAGE = "/og-logo-v2.jpg";
const STORY_LOGO = "/logo_v2_circle.webp";

function getAssetUrl(path?: string) {
  if (!path) {
    return STORY_FALLBACK_IMAGE;
  }

  return path.startsWith("http") ? path : path;
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

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageRatio = image.width / image.height;
  const targetRatio = width / height;
  const sourceWidth =
    imageRatio > targetRatio ? image.height * targetRatio : image.width;
  const sourceHeight =
    imageRatio > targetRatio ? image.height : image.width / targetRatio;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;

  ctx.drawImage(
    image,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height,
  );
}

function getWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;

    if (ctx.measureText(candidate).width <= maxWidth) {
      line = candidate;
      return;
    }

    if (line) {
      lines.push(line);
    }

    line = word;
  });

  if (line) {
    lines.push(line);
  }

  if (lines.length <= maxLines) {
    return lines;
  }

  const trimmed = lines.slice(0, maxLines);
  let lastLine = trimmed[trimmed.length - 1];

  while (
    lastLine.length > 0 &&
    ctx.measureText(`${lastLine}...`).width > maxWidth
  ) {
    lastLine = lastLine.slice(0, -1).trim();
  }

  trimmed[trimmed.length - 1] = `${lastLine}...`;
  return trimmed;
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) {
  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });

  return y + lines.length * lineHeight;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawBackgroundFallback(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, STORY_WIDTH, STORY_HEIGHT);
  gradient.addColorStop(0, "#0a0f1a");
  gradient.addColorStop(0.5, "#101d32");
  gradient.addColorStop(1, "#0c1829");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Could not create story image"));
    }, "image/png");
  });
}

export async function createBlogStoryBlob(post: BlogPost) {
  const canvas = document.createElement("canvas");
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas is not supported");
  }

  try {
    const background = await loadImage(getAssetUrl(post.image));
    drawCoverImage(ctx, background, 0, 0, STORY_WIDTH, STORY_HEIGHT);
  } catch {
    try {
      const fallback = await loadImage(STORY_FALLBACK_IMAGE);
      drawCoverImage(ctx, fallback, 0, 0, STORY_WIDTH, STORY_HEIGHT);
    } catch {
      drawBackgroundFallback(ctx);
    }
  }

  const overlay = ctx.createLinearGradient(0, 0, 0, STORY_HEIGHT);
  overlay.addColorStop(0, "rgba(10, 15, 26, 0.72)");
  overlay.addColorStop(0.46, "rgba(10, 15, 26, 0.58)");
  overlay.addColorStop(1, "rgba(10, 15, 26, 0.9)");
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  ctx.strokeStyle = "rgba(0, 200, 255, 0.18)";
  ctx.lineWidth = 3;
  for (let offset = -STORY_HEIGHT; offset < STORY_WIDTH; offset += 96) {
    ctx.beginPath();
    ctx.moveTo(offset, STORY_HEIGHT);
    ctx.lineTo(offset + STORY_HEIGHT, 0);
    ctx.stroke();
  }

  try {
    const logo = await loadImage(STORY_LOGO);
    ctx.save();
    drawRoundedRect(ctx, 78, 124, 118, 118, 59);
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(78, 124, 118, 118);
    drawCoverImage(ctx, logo, 78, 124, 118, 118);
    ctx.restore();
  } catch {
    ctx.fillStyle = "#00c8ff";
    drawRoundedRect(ctx, 78, 124, 118, 118, 59);
    ctx.fill();
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 38px 'Saira Condensed', sans-serif";
  ctx.fillText("MICHAŁ KAPUSZ", 226, 174);
  ctx.fillStyle = "#00c8ff";
  ctx.font = "600 23px 'DM Sans', sans-serif";
  ctx.fillText("TRENER TENISA", 228, 212);

  ctx.fillStyle = "rgba(0, 200, 255, 0.16)";
  drawRoundedRect(ctx, 78, 396, 118, 54, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(0, 200, 255, 0.62)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#6ee2ff";
  ctx.font = "700 29px 'Saira Condensed', sans-serif";
  ctx.fillText("BLOG", 108, 432);

  const titleMaxWidth = 900;
  let titleSize = 86;
  let titleLines: string[] = [];

  do {
    ctx.font = `800 ${titleSize}px 'Saira Condensed', sans-serif`;
    titleLines = getWrappedLines(
      ctx,
      post.title.toUpperCase(),
      titleMaxWidth,
      5,
    );
    titleSize -= 4;
  } while (titleLines.length >= 5 && titleSize > 66);

  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${titleSize + 4}px 'Saira Condensed', sans-serif`;
  const nextY = drawWrappedText(ctx, titleLines, 78, 610, titleSize * 0.98);

  ctx.fillStyle = "rgba(255, 255, 255, 0.76)";
  ctx.font = "500 34px 'DM Sans', sans-serif";
  const descriptionLines = getWrappedLines(ctx, post.description, 850, 4);
  drawWrappedText(ctx, descriptionLines, 82, nextY + 78, 50);

  return canvasToBlob(canvas);
}
