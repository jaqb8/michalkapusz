import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import PriceList from "./pages/PriceList";
import Blog from "./pages/Blog";
import BlogPost from "./components/BlogPost";
import NotFound from "./pages/NotFound";
import { blogPosts } from "./content/blog/posts";

function BlogPostRoute() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((entry) => entry.slug === slug);
  return post ? <BlogPost post={post} /> : <NotFound />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cennik" element={<PriceList />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostRoute />} />
      <Route path="*" element={<NotFound />} />
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
