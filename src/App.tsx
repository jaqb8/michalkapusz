import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "./lib/helmet";
import {
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
  Instagram,
  Facebook,
  ChevronUp,
} from "lucide-react";
import { AppRouter, ScrollToTop } from "./router";
import { GlobalHead } from "./components/GlobalHead.tsx";
import { BreadcrumbNavigation } from "./components/BreadcrumbNavigation";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen font-body bg-animated-gradient noise-overlay">
      <GlobalHead />
      <Helmet>
        <title>
          Michał Kapusz - Licencjonowany Trener Tenisa Wrocław | Lekcje Tenisa
        </title>
        <meta
          name="description"
          content="Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu. Trener z licencją PZT. Zajęcia indywidualne i grupowe dla dzieci i dorosłych."
        />
      </Helmet>

      {/* Background Pattern */}
      <div className="fixed inset-0 bg-diagonal-lines pointer-events-none z-0" />

      <ScrollToTop />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-navy-950/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo.webp"
                  alt="Logo Michał Kapusz - Licencjonowany Trener Tenisa Wrocław"
                  className="h-12 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-display tracking-wide text-white group-hover:text-electric-500 transition-colors">
                MICHAŁ KAPUSZ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className={`relative font-medium transition-colors ${
                  isActive("/")
                    ? "text-electric-500"
                    : "text-white/80 hover:text-electric-500"
                } animated-underline`}
              >
                Strona Główna
              </Link>
              <Link
                to="/cennik"
                className={`relative font-medium transition-colors ${
                  isActive("/cennik")
                    ? "text-electric-500"
                    : "text-white/80 hover:text-electric-500"
                } animated-underline`}
              >
                Cennik
              </Link>
              <Link
                to="/blog"
                className={`relative font-medium transition-colors ${
                  isActive("/blog")
                    ? "text-electric-500"
                    : "text-white/80 hover:text-electric-500"
                } animated-underline`}
              >
                Blog
              </Link>
              <a
                href="tel:+48605242945"
                className="btn-primary flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                <span>Umów trening</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white hover:text-electric-500 transition-colors p-2"
              aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 bg-navy-900 z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
        aria-label="Menu mobilne"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-electric-500/20">
          <span className="text-xl font-display text-electric-500 tracking-wide">MENU</span>
          <button
            onClick={closeMobileMenu}
            className="text-white/60 hover:text-electric-500 transition-colors p-1"
            aria-label="Zamknij menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col p-6 space-y-2">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className={`block px-4 py-3 rounded-lg transition-all duration-200 text-lg font-medium ${
              isActive("/")
                ? "bg-electric-500/20 text-electric-500"
                : "text-white/80 hover:bg-white/5 hover:text-electric-500"
            }`}
          >
            Strona Główna
          </Link>
          <Link
            to="/cennik"
            onClick={closeMobileMenu}
            className={`block px-4 py-3 rounded-lg transition-all duration-200 text-lg font-medium ${
              isActive("/cennik")
                ? "bg-electric-500/20 text-electric-500"
                : "text-white/80 hover:bg-white/5 hover:text-electric-500"
            }`}
          >
            Cennik
          </Link>
          <Link
            to="/blog"
            onClick={closeMobileMenu}
            className={`block px-4 py-3 rounded-lg transition-all duration-200 text-lg font-medium ${
              isActive("/blog")
                ? "bg-electric-500/20 text-electric-500"
                : "text-white/80 hover:bg-white/5 hover:text-electric-500"
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-electric-500/20">
          <a
            href="tel:+48605242945"
            onClick={closeMobileMenu}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            <span>Zadzwoń teraz</span>
          </a>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://www.facebook.com/michal.kapusz/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-electric-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/michal_kapusz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-electric-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <BreadcrumbNavigation />

      {/* Routes */}
      <AppRouter />

      {/* Footer */}
      <footer className="relative bg-navy-950 pt-20 pb-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-500 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-electric-500/5 rounded-full blur-3xl translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
            {/* Brand Column */}
            <div>
              <Link to="/" className="inline-block mb-6 group">
                <span className="text-4xl font-display text-white group-hover:text-electric-500 transition-colors">
                  MICHAŁ KAPUSZ
                </span>
              </Link>
              <p className="text-white/60 mb-8 leading-relaxed">
                Profesjonalne treningi tenisowe we Wrocławiu. Rozwijaj swoje
                umiejętności z doświadczonym trenerem.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/michal.kapusz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-electric-500 hover:text-navy-950 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/michal_kapusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-electric-500 hover:text-navy-950 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-xl font-display text-electric-500 mb-6 tracking-wide">
                NAWIGACJA
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/"
                    className="text-white/60 hover:text-electric-500 transition-colors"
                  >
                    Strona główna
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cennik"
                    className="text-white/60 hover:text-electric-500 transition-colors"
                  >
                    Cennik
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-white/60 hover:text-electric-500 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-display text-electric-500 mb-6 tracking-wide">
                KONTAKT
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-electric-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white/60">
                    Lotnicza 72, 54-155 Wrocław
                  </span>
                </li>
                <li>
                  <a
                    href="tel:+48605242945"
                    className="flex items-center gap-3 text-white/60 hover:text-electric-500 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-electric-500" />
                    +48 605 242 945
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kapusztenis@gmail.com"
                    className="flex items-center gap-3 text-white/60 hover:text-electric-500 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-electric-500" />
                    kapusztenis@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2026 Michał Kapusz. Wszystkie prawa
              zastrzeżone.
            </p>
            <p className="text-sm text-white/40">
              powered by{" "}
              <a
                href="https://aniszewski.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-500 font-semibold hover:text-electric-400 transition-colors"
              >
                Jakub Aniszewski IT Solutions
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-electric-500 text-navy-950 flex items-center justify-center shadow-lg shadow-electric-500/30 transition-all duration-300 hover:scale-110 hover:shadow-electric-500/50 z-50 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Przewiń do góry"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  );
}

export default App;
