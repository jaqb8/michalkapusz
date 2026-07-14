import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Link2,
  Share2,
  XCircle,
} from "lucide-react";
import { BlogPost } from "../content/blog/posts";

interface BlogShareActionsProps {
  post: BlogPost;
  compact?: boolean;
}

type ShareStatus = {
  type: "success" | "error";
  message: string;
};

const SITE_ORIGIN = "https://kapusz-tenis.pl";

function getShareUrl(slug: string) {
  return `${SITE_ORIGIN}/blog/${slug}/`;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
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
    const copied = document.execCommand("copy");
    if (!copied) {
      throw new Error("Copy command failed");
    }
  } finally {
    document.body.removeChild(textarea);
  }
}

function BlogShareActions({ post, compact = false }: BlogShareActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ShareStatus | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const statusTimeoutRef = useRef<number | null>(null);
  const postUrl = getShareUrl(post.slug);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        window.clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const showStatus = (nextStatus: ShareStatus) => {
    setStatus(nextStatus);

    if (statusTimeoutRef.current) {
      window.clearTimeout(statusTimeoutRef.current);
    }

    statusTimeoutRef.current = window.setTimeout(() => {
      setStatus(null);
    }, 3200);
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
    const shareData: ShareData = {
      title: post.title,
      text: post.description,
      url: postUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setIsOpen(false);
        showStatus({ type: "success", message: "Post udostępniony" });
        return;
      }

      await copyText(postUrl);
      setIsOpen(false);
      showStatus({ type: "success", message: "Link skopiowany" });
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }

      showStatus({ type: "error", message: "Nie udało się udostępnić posta" });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`inline-flex items-center gap-2 rounded-lg border border-electric-500/30 bg-electric-500/10 text-electric-300 transition-all duration-300 hover:border-electric-500/70 hover:bg-electric-500 hover:text-navy-950 ${
            compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm font-semibold"
          }`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <Share2 className="h-4 w-4" />
          <span>Udostępnij</span>
        </button>

        {status && (
          <span
            className={`inline-flex items-center gap-2 text-sm ${
              status.type === "error" ? "text-red-300" : "text-white/60"
            }`}
            aria-live="polite"
          >
            {status.type === "success" && <Check className="h-4 w-4 text-court-400" />}
            {status.type === "error" && <XCircle className="h-4 w-4" />}
            {status.message}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute top-full z-30 mt-3 w-72 overflow-hidden rounded-xl border border-electric-500/20 bg-navy-900/95 shadow-2xl shadow-navy-950/70 backdrop-blur-xl ${
            compact ? "right-0" : "left-0"
          }`}
          role="menu"
          aria-label="Opcje udostępniania wpisu"
        >
          <button
            type="button"
            onClick={handleSharePost}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/5 md:hidden"
            role="menuitem"
          >
            <Link2 className="h-5 w-5 text-electric-500" />
            <span className="font-semibold text-white">Udostępnij post</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex w-full items-center gap-3 border-t border-white/10 px-4 py-3 text-left transition-colors hover:bg-white/5 md:border-t-0"
            role="menuitem"
          >
            <Copy className="h-5 w-5 text-electric-500" />
            <span className="font-semibold text-white">Kopiuj link</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogShareActions;
