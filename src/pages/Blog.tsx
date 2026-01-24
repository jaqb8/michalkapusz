import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from "../content/blog/posts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Blog() {
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
      </Helmet>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-6xl font-bold mb-16 tracking-tight text-center">
          Blog
        </h1>
        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="bg-card/80 backdrop-blur-sm border-border hover:shadow-lg transition-all overflow-hidden group">
                {post.image && (
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="secondary">
                      {new Date(post.date).toLocaleDateString("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Badge>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blog;
