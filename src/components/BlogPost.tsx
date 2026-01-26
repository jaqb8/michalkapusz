import { Helmet } from "../lib/helmet";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { BlogPost as BlogPostType } from "../content/blog/posts";
import { ArrowLeft, Calendar, User } from "lucide-react";

interface BlogPostProps {
  post: BlogPostType;
}

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
    : "https://kapusz-tenis.pl/logo.webp";
  const postUrl = `https://kapusz-tenis.pl/blog/${post.slug}`;
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
    image: [imageUrl],
    mainEntityOfPage: postUrl,
    publisher: {
      "@type": "Person",
      name: "Michał Kapusz",
    },
  };

  // Remove the first heading (title) from the content
  const contentWithoutTitle = post.content.replace(/^#\s+[^\n]+\n/, "");

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
              to="/blog"
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
              <ReactMarkdown>{contentWithoutTitle}</ReactMarkdown>
            </div>

            {/* Back link bottom */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-electric-500 hover:text-electric-400 transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Powrót do bloga</span>
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default BlogPost;
