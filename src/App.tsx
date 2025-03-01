import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Trophy,
  Menu,
  X,
  Instagram,
  Facebook,
  Star,
} from "lucide-react";
import Home from "./pages/Home";
import PriceList from "./pages/PriceList";

// Import Poppins font
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen font-roboto bg-[url('/tennis-court.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="min-h-screen bg-gradient-to-br from-white/95 via-blue-50/95 to-white/95">
        <ScrollToTop />
        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/logo.webp"
                  alt="Logo Michał Kapusz - Licencjonowany Trener Tenisa Wrocław i Bolesławiec"
                  className="h-12 mix-blend-darken"
                />
                <span className="text-2xl font-bold text-blue-600">
                  Michał Kapusz
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Strona Główna
                </Link>
                <Link
                  to="/cennik"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Cennik
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"
              } bg-white/80 backdrop-blur-sm border-t border-gray-200`}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className="block text-lg text-gray-600 hover:text-blue-600 transition-colors"
              >
                Strona Główna
              </Link>
              <Link
                to="/cennik"
                onClick={toggleMobileMenu}
                className="block text-lg text-gray-600 hover:text-blue-600 transition-colors"
              >
                Cennik
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cennik" element={<PriceList />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Left Column - About */}
              <div className="text-left">
                <Link
                  to="/"
                  className="text-2xl font-bold mb-6 block text-blue-400"
                >
                  Michał Kapusz
                </Link>
                <p className="text-gray-300 mb-8">
                  Chcesz nauczyć się grać w tenisa lub poprawić swoje
                  umiejętności? Zapraszam na profesjonalne treningi dostosowane
                  do Twoich potrzeb.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/michal.kapusz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/michal_kapusz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Right Column - Links & Info */}
              <div className="text-left">
                <h3 className="text-blue-400 font-bold mb-6 text-lg">
                  INFORMACJE
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      O mnie
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cennik"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Cennik
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <span>Lotnicza 72, 54-155 Wrocław</span>
                    </div>
                  </li>
                  <li>
                    <a
                      href="tel:+48605242945"
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <Phone className="h-5 w-5 text-blue-400" />
                      <span>+48 605 242 945</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:michalkapusz5@gmail.com"
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-blue-400" />
                      <span>michalkapusz5@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
