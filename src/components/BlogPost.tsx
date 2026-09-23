import { Helmet } from "../lib/helmet";
import ReactMarkdown from "react-markdown";
import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { BlogPost as BlogPostType } from "../content/blog/posts";
import BlogGallery from "./BlogGallery";
import BlogSponsors from "./BlogSponsors";
import BlogShareActions from "./BlogShareActions";
import { ArrowLeft, ArrowUpRight, Calendar, User } from "lucide-react";

interface BlogPostProps {
  post: BlogPostType;
}

const articleMarkdownComponents = {
  a: ({ children, href, title }: ComponentPropsWithoutRef<"a">) => {
    const isAdvantageResults = href?.startsWith("https://advantage-app.pl/");

    if (isAdvantageResults) {
      return (
        <a
          href={href}
          title={title}
          target="_blank"
          rel="noopener noreferrer"
          className="not-prose my-6 flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-white shadow-lg shadow-navy-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-electric-500/50 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-electric-400"
        >
          <img
            src="/advantage-favicon.svg"
            alt=""
            className="h-9 w-9 shrink-0 rounded-lg"
          />
          <span className="min-w-0 flex-1 truncate text-sm font-semibold sm:text-base">
            {children}
          </span>
          <span className="hidden text-sm text-white/45 sm:inline">
            Advantage
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-electric-400" />
        </a>
      );
    }

    return (
      <a
        href={href}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  },
};

function BlogPost({ post }: BlogPostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `https://kapusz-tenis.pl${post.image}`
    : "https://kapusz-tenis.pl/og-logo-v2.jpg";
  const postUrl = `https://kapusz-tenis.pl/blog/${post.slug}/`;
  const schemaImages = [
    imageUrl,
    ...(post.gallery?.map((image) =>
      image.src.startsWith("http")
        ? image.src
        : `https://kapusz-tenis.pl${image.src}`,
    ) ?? []),
  ];
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: schemaImages,
    mainEntityOfPage: postUrl,
    publisher: {
      "@type": "Person",
      name: "Michał Kapusz",
    },
  };

  // Remove the first heading (title) from the content
  const sponsorsPlaceholder =
    "**[TUTAJ WSTAW LOGOTYPY SPONSORÓW I PARTNERÓW]**";
  const galleryPlaceholder = "**[MIEJSCE NA GALERIĘ]**";
  const contentWithoutTitle = post.content.replace(/^#\s+[^\n]+\n/, "");
  const [contentBeforeSponsors, contentAfterSponsors] =
    post.sponsors && contentWithoutTitle.includes(sponsorsPlaceholder)
      ? contentWithoutTitle.split(sponsorsPlaceholder)
      : [contentWithoutTitle, ""];
  const [contentBeforeGallery, contentAfterGallery] =
    post.gallery && contentAfterSponsors.includes(galleryPlaceholder)
      ? contentAfterSponsors.split(galleryPlaceholder)
      : [contentAfterSponsors, ""];

  return (
    <>
      <Helmet>
        <title>
          {post.title} - Blog | Lekcje Tenisa z Michałem Kapuszem
        </title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={postUrl} />
        <meta
          property="og:title"
          content={`${post.title} - Blog | Lekcje Tenisa z Michałem Kapuszem`}
        />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
      </Helmet>

      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              to="/blog/"
              className="inline-flex items-center gap-2 text-electric-500 hover:text-electric-400 transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Powrót do bloga</span>
            </Link>

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display text-white mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/60">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-electric-500" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-electric-500" />
                  {post.author}
                </span>
              </div>
              <div className="mt-6">
                <BlogShareActions post={post} />
              </div>
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="relative rounded-2xl overflow-hidden mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-white/70 prose-a:text-electric-500 prose-a:no-underline hover:prose-a:text-electric-400 prose-strong:text-white prose-ul:text-white/70 prose-ol:text-white/70 prose-li:marker:text-electric-500">
              <ReactMarkdown components={articleMarkdownComponents}>
                {contentBeforeSponsors}
              </ReactMarkdown>
              {post.sponsors && <BlogSponsors sponsors={post.sponsors} />}
              {contentBeforeGallery && (
                <ReactMarkdown components={articleMarkdownComponents}>
                  {contentBeforeGallery}
                </ReactMarkdown>
              )}
              {post.gallery && <BlogGallery images={post.gallery} />}
              {contentAfterGallery && (
                <ReactMarkdown components={articleMarkdownComponents}>
                  {contentAfterGallery}
                </ReactMarkdown>
              )}
            </div>

            {/* Back link bottom */}
            <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/blog/"
                className="inline-flex items-center gap-2 text-electric-500 hover:text-electric-400 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Powrót do bloga</span>
              </Link>
              <BlogShareActions post={post} compact />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default BlogPost;
