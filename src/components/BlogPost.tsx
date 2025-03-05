import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import { BlogPost as BlogPostType } from "../content/blog/posts";

interface BlogPostProps {
    post: BlogPostType;
}

function BlogPost({ post }: BlogPostProps) {
    const formattedDate = new Date(post.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Remove the first heading (title) from the content
    const contentWithoutTitle = post.content.replace(/^#\s+[^\n]+\n/, '');

    return (
        <>
            <Helmet>
                <title>{post.title} - Blog | Lekcje Tenisa z Michałem Kapuszem</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={`https://kapusz-tenis.pl/blog/${post.slug}`} />
                <meta property="og:title" content={`${post.title} - Blog | Lekcje Tenisa z Michałem Kapuszem`} />
                <meta property="og:description" content={post.description} />
                <meta property="og:url" content={`https://kapusz-tenis.pl/blog/${post.slug}`} />
            </Helmet>
            <div className="container mx-auto px-4 py-20">
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span>{post.author}</span>
                        </div>
                    </header>
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-96 object-cover rounded-lg mb-8"
                        />
                    )}
                    <div className="prose prose-lg max-w-none">
                        <ReactMarkdown>{contentWithoutTitle}</ReactMarkdown>
                    </div>
                </article>
            </div>
        </>
    );
}

export default BlogPost; 