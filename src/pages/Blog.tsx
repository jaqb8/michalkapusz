import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { blogPosts } from "../content/blog/posts";

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
                <meta property="og:title" content="Blog - Lekcje Tenisa z Michałem Kapuszem | Wrocław" />
                <meta property="og:description" content="Blog o tenisie - porady, wskazówki i ciekawostki dla graczy na każdym poziomie zaawansowania." />
                <meta property="og:url" content="https://kapusz-tenis.pl/blog" />
            </Helmet>
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-6xl font-bold mb-16 tracking-tight text-center">
                    Blog
                </h1>
                <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.slug}`}
                            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
                        >
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-2xl font-bold mb-2 text-gray-900">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{post.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>
                                    {new Date(post.date).toLocaleDateString("pl-PL", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                <span>•</span>
                                <span>{post.author}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Blog; 