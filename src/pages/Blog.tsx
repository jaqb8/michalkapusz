import { useEffect, useRef } from "react";
import { Helmet } from "../lib/helmet";
import { Link } from "react-router-dom";
import { blogPosts } from "../content/blog/posts";
import { BookOpen, ArrowRight, Calendar, User } from "lucide-react";

function Blog() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog - Lekcje Tenisa z Michałem Kapuszem | Wrocław</title>
        <meta
          name="description"
          content="Blog o tenisie - porady, wskazówki i ciekawostki dla graczy na każdym poziomie zaawansowania. Dowiedz się więcej o technice, taktyce i sprzęcie tenisowym."
        />
        <link rel="canonical" href="https://kapusz-tenis.pl/blog" />
        <meta
          property="og:title"
          content="Blog - Lekcje Tenisa z Michałem Kapuszem | Wrocław"
        />
        <meta
          property="og:description"
          content="Blog o tenisie - porady, wskazówki i ciekawostki dla graczy na każdym poziomie zaawansowania."
        />
        <meta property="og:url" content="https://kapusz-tenis.pl/blog" />
        <meta property="og:image" content="https://kapusz-tenis.pl/logo.webp" />
      </Helmet>

      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-electric-500 text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Blog</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-white mb-6">
              BLOG <span className="text-gradient">TENISOWY</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Porady, wskazówki i ciekawostki dla graczy na każdym poziomie
              zaawansowania
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="reveal glass rounded-2xl overflow-hidden card-hover group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                {post.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-display text-white mb-3 group-hover:text-electric-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                  </div>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-electric-500 text-sm font-medium group-hover:gap-3 transition-all">
                    <span>Czytaj więcej</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {blogPosts.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">
                Wkrótce pojawią się nowe artykuły!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Blog;
