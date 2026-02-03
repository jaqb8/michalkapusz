import { Helmet } from "../lib/helmet";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Strona nie znaleziona | Michał Kapusz</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Ta strona nie istnieje. Wróć na stronę główną i znajdź potrzebne informacje."
        />
        <meta
          property="og:title"
          content="404 - Strona nie znaleziona | Michał Kapusz"
        />
        <meta
          property="og:description"
          content="Ta strona nie istnieje. Wróć na stronę główną i znajdź potrzebne informacje."
        />
        <meta property="og:url" content="https://kapusz-tenis.pl/404" />
        <meta property="og:image" content="https://kapusz-tenis.pl/logo.webp" />
      </Helmet>

      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <p className="text-electric-500 text-sm font-semibold tracking-wide mb-2">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-display text-white mb-4">
            Strona nie znaleziona
          </h1>
          <p className="text-white/60 mb-8">
            Wygląda na to, że ten adres nie istnieje. Wróć na stronę główną lub
            przejdź do bloga.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              Strona główna
            </Link>
            <Link to="/blog" className="btn-outline">
              Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
