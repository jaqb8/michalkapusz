import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
    name: string;
    url: string;
}

export const BreadcrumbNavigation = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
        { name: 'Strona główna', url: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach(segment => {
        currentPath += `/${segment}`;
        const name = segment === 'cennik' ? 'Cennik' :
            segment === 'blog' ? 'Blog' :
                segment;
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