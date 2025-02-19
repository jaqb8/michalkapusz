import React from "react";
import { Calendar, Mail, MapPin, Phone, Trophy } from "lucide-react";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-blue-600">
        <div className="absolute inset-0">
          <img
            src="coach2.jpg"
            alt="Kort tenisowy"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Michał Kapusz
              </h1>
              <p className="text-xl text-white mb-6">
                Profesjonalny Trener Tenisa
              </p>
              <div className="flex gap-4">
                <a
                  href="#kontakt"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Umów Trening
                </a>
                <a
                  href="#omnie"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Poznaj Mnie
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/coach2.jpg"
                alt="Michał Kapusz"
                className="rounded-lg shadow-xl max-w-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* O Mnie Section */}
      <section id="omnie" className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/coach1.jpg"
            alt="Trener Michał Kapusz"
            className="rounded-lg shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-bold mb-6">O Mnie</h2>
            <p className="text-gray-600 mb-6">
              Jestem pasjonatem tenisa z wieloletnim doświadczeniem w nauczaniu
              tej wspaniałej dyscypliny. Specjalizuję się w treningu zarówno
              początkujących, jak i zaawansowanych graczy, dostosowując program
              szkolenia do indywidualnych potrzeb każdego ucznia.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <Trophy className="text-blue-600 mb-2" />
                <h3 className="font-semibold mb-1">8+ lat</h3>
                <p className="text-sm text-gray-600">Doświadczenia</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <Calendar className="text-blue-600 mb-2" />
                <h3 className="font-semibold mb-1">5000+</h3>
                <p className="text-sm text-gray-600">
                  Przeprowadzonych treningów
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Oferta Treningowa
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Trening Indywidualny
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Spersonalizowany program</li>
                <li>• Analiza techniki</li>
                <li>• Elastyczne terminy</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Trening Grupowy</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Małe grupy (2-4 osoby)</li>
                <li>• Dostosowany poziom</li>
                <li>• Atrakcyjna cena</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Dla Dzieci</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Nauka przez zabawę</li>
                <li>• Rozwój koordynacji</li>
                <li>• Bezpieczeństwo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Kontakt</h2>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600 h-6 w-6" />
              <div>
                <h3 className="font-semibold">Telefon</h3>
                <p className="text-gray-600">+48 605 242 945</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600 h-6 w-6" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">michalkapusz5@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600 h-6 w-6" />
              <div>
                <h3 className="font-semibold">Lokalizacja</h3>
                <p className="text-gray-600">
                  Korty tenisowe, Lotnicza 72, 54-155 Wrocław
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Istnieje możliwość prowadzenia treningów na innych kortach na
                  terenie Wrocławia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
