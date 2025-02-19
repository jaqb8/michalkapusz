import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Calendar, Mail, MapPin, Phone, Trophy, Menu, X } from "lucide-react";
import Home from "./pages/Home";
import PriceList from "./pages/PriceList";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[url('/tennis-court.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="min-h-screen bg-white/90">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-xl font-bold text-blue-600">
                Michał Kapusz
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-6">
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
            className={`md:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } bg-white/95 backdrop-blur-sm`}
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
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; 2025 Michał Kapusz - Trener Tenisa. Wszelkie prawa
              zastrzeżone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
