import { useLocation } from 'react-router-dom';
import { blogPosts } from '../content/blog/posts';

interface BreadcrumbItem {
    name: string;
    url: string;
}

const getBlogPostTitle = (slug: string): string => {
    const post = blogPosts.find(p => p.slug === slug);
    return post?.title || slug;
};

export const BreadcrumbNavigation = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: 'Strona główna', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        
        let name: string;
        if (segment === 'cennik') {
            name = 'Cennik';
        } else if (segment === 'blog') {
            name = 'Blog';
        } else if (pathSegments[index - 1] === 'blog') {
            // This is a blog post slug - get the actual title
            name = getBlogPostTitle(segment);
        } else {
            name = segment;
        }
        
        breadcrumbs.push({ name, url: currentPath });
    });

    return (
        <>
            <nav aria-label="breadcrumb" className="hidden">
                <ol>
                    {breadcrumbs.map((item, index) => (
                        <li key={index}>
                            <a href={item.url}>{item.name}</a>
                        </li>
                    ))}
                </ol>
            </nav>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": breadcrumbs.map((item, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "name": item.name,
                        "item": `https://kapusz-tenis.pl${item.url}`
                    }))
                })}
            </script>
        </>
    );
}; 