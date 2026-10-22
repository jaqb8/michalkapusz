import { useEffect, useRef, useState } from "react";
import { createBlogStoryBlob, type StoryPost } from "../../lib/createBlogStoryImage";
import "./islands.css";

interface BlogShareActionsProps {
  post: StoryPost & { slug: string };
  compact?: boolean;
}

type ShareStatus = { type: "success" | "error" | "loading"; message: string };

const SITE_ORIGIN = "https://kapusz-tenis.pl";

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function sanitizeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    if (!document.execCommand("copy")) throw new Error("Copy command failed");
  } finally {
    document.body.removeChild(textarea);
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function BlogShareActions({ post, compact = false }: BlogShareActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ShareStatus | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const statusTimeoutRef = useRef<number | null>(null);
  const postUrl = `${SITE_ORIGIN}/blog/${post.slug}/`;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutside, true);
    document.addEventListener("touchstart", handleOutside, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutside, true);
      document.removeEventListener("touchstart", handleOutside, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(
    () => () => {
      if (statusTimeoutRef.current) window.clearTimeout(statusTimeoutRef.current);
    },
    [],
  );

  const showStatus = (next: ShareStatus) => {
    setStatus(next);
    if (statusTimeoutRef.current) window.clearTimeout(statusTimeoutRef.current);
    if (next.type !== "loading") statusTimeoutRef.current = window.setTimeout(() => setStatus(null), 3200);
  };

  const handleCopyLink = async () => {
    try {
      await copyText(postUrl);
      setIsOpen(false);
      showStatus({ type: "success", message: "Link skopiowany" });
    } catch {
      showStatus({ type: "error", message: "Nie udało się skopiować linku" });
    }
  };

  const handleSharePost = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.description, url: postUrl });
        setIsOpen(false);
        showStatus({ type: "success", message: "Post udostępniony" });
        return;
      }
      await copyText(postUrl);
      setIsOpen(false);
      showStatus({ type: "success", message: "Link skopiowany" });
    } catch (error) {
      if (!isAbortError(error)) showStatus({ type: "error", message: "Nie udało się udostępnić posta" });
    }
  };

  const handleShareStory = async () => {
    showStatus({ type: "loading", message: "Tworzę grafikę do Story…" });
    try {
      const blob = await createBlogStoryBlob(post);
      const filename = `kapusz-tenis-story-${sanitizeFilename(post.slug) || "blog"}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      if (navigator.canShare?.({ files: [file] }) && navigator.share) {
        await navigator.share({ title: post.title, text: "Grafika do Instagram Story", files: [file] });
        setIsOpen(false);
        showStatus({ type: "success", message: "Grafika gotowa" });
        return;
      }

      downloadBlob(blob, filename);
      setIsOpen(false);
      showStatus({ type: "success", message: "Pobieranie grafiki" });
    } catch (error) {
      if (isAbortError(error)) {
        setStatus(null);
        return;
      }
      showStatus({ type: "error", message: "Nie udało się stworzyć grafiki" });
    }
  };

  const isLoading = status?.type === "loading";

  return (
    <div className="share" ref={menuRef}>
      <div className="share-row">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`share-btn${compact ? " share-btn--compact" : ""}`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
          </svg>
          Udostępnij
        </button>
        {status && (
          <span className={`share-status share-status--${status.type}`} aria-live="polite">
            {status.message}
          </span>
        )}
      </div>

      {isOpen && (
        <div className={`share-menu${compact ? " share-menu--right" : ""}`} role="menu" aria-label="Opcje udostępniania wpisu">
          <button type="button" onClick={handleSharePost} disabled={isLoading} className="share-item share-item--mobile" role="menuitem">
            Udostępnij post
          </button>
          <button type="button" onClick={handleCopyLink} disabled={isLoading} className="share-item" role="menuitem">
            Kopiuj link
          </button>
          <button type="button" onClick={handleShareStory} disabled={isLoading} className="share-item share-item--mobile" role="menuitem">
            Grafika na Instagram Story
          </button>
        </div>
      )}
    </div>
  );
}
