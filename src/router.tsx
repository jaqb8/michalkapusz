import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import PriceList from "./pages/PriceList";
import Blog from "./pages/Blog";
import BlogPost from "./components/BlogPost";
import { blogPosts } from "./content/blog/posts";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cennik" element={<PriceList />} />
            <Route path="/blog" element={<Blog />} />
            <Route
                path="/blog/:slug"
                element={
                    <BlogPost
                        post={blogPosts.find((post) => post.slug === useLocation().pathname.split("/").pop())!}
                    />
                }
            />
        </Routes>
    );
}

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
} 