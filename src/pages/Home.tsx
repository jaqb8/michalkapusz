import React from "react";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Trophy,
  Instagram,
  Star,
  Users,
  Baby,
} from "lucide-react";

function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-blue-600 -mt-[73px]">
        <div className="absolute inset-0">
          <img
            src="coach2.jpg"
            alt="Kort tenisowy"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center pt-[73px]">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full max-w-7xl">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Michał Kapusz
              </h1>
              <p className="text-xl text-white mb-6">
                Licencjonowany Trener Tenisa
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Umów Trening
                </button>
                <button
                  onClick={() => scrollToSection("omnie")}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Poznaj Mnie
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end items-center h-full">
              <img
                src="/coach2.jpg"
                alt="Michał Kapusz"
                className="rounded-lg shadow-xl max-h-[50vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* O Mnie Section */}
      <section id="omnie" className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <img
            src="/coach1.jpg"
            alt="Trener Michał Kapusz"
            className="rounded-lg shadow-xl w-full max-w-lg mx-auto"
          />
          <div>
            <h2 className="text-4xl font-bold mb-8">O Mnie</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Jestem pasjonatem tenisa z wieloletnim doświadczeniem w nauczaniu
              tej wspaniałej dyscypliny. Specjalizuję się w treningu zarówno
              początkujących, jak i zaawansowanych graczy, dostosowując program
              szkolenia do indywidualnych potrzeb każdego ucznia.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
                <Trophy className="text-blue-600 h-10 w-10 mb-4" />
                <h3 className="text-2xl font-bold mb-2">8+ lat</h3>
                <p className="text-gray-600">Doświadczenia</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
                <Calendar className="text-blue-600 h-10 w-10 mb-4" />
                <h3 className="text-2xl font-bold mb-2">5000+</h3>
                <p className="text-gray-600">Przeprowadzonych treningów</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Oferta Treningowa
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-200 hover:bg-white/90 transition-all h-full flex flex-col">
              <div className="text-blue-600 mb-6">
                <Trophy className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-4">Trening Indywidualny</h3>
              <ul className="space-y-3 text-gray-600 flex-grow">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Spersonalizowany program</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Analiza techniki</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Elastyczne terminy</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-200 hover:bg-white/90 transition-all h-full flex flex-col">
              <div className="text-blue-600 mb-6">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-4">Trening Grupowy</h3>
              <ul className="space-y-3 text-gray-600 flex-grow">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Małe grupy (2-4 osoby)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Dostosowany poziom</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Atrakcyjna cena</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-200 hover:bg-white/90 transition-all h-full flex flex-col">
              <div className="text-blue-600 mb-6">
                <Baby className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-4">Dla Dzieci</h3>
              <ul className="space-y-3 text-gray-600 flex-grow">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Nauka przez zabawę</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Rozwój koordynacji</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Bezpieczeństwo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Opinie moich klientów</h2>
            <p className="text-gray-600">
              Zobacz, co mówią osoby, które już trenują ze mną
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex gap-1 mb-4 text-blue-600">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-6">
                "Świetny trener z indywidualnym podejściem do ucznia. Treningi
                są zawsze dobrze zaplanowane i dostosowane do mojego poziomu.
                Polecam każdemu, kto chce zacząć przygodę z tenisem!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-semibold">Anna Kowalska</p>
                  <p className="text-sm text-gray-500">Trenuje od 6 miesięcy</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex gap-1 mb-4 text-blue-600">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-6">
                "Profesjonalne podejście i świetna atmosfera na treningach.
                Dzięki zajęciom z Michałem znacznie poprawiłem swoją technikę i
                pewność na korcie. Zdecydowanie polecam!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-semibold">Piotr Nowak</p>
                  <p className="text-sm text-gray-500">Trenuje od roku</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Call to Action Section */}
      <section id="kontakt" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Rozpocznij swoją tenisową przygodę już dziś!
            </h2>
            <p className="text-gray-600">
              Wybierz preferowany sposób kontaktu i umów się na pierwszy trening
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-200 h-full">
                <h3 className="text-xl font-bold mb-6">
                  Informacje kontaktowe
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                      <Phone className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Telefon</h4>
                      <p className="text-gray-600">+48 605 242 945</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                      <Instagram className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Instagram</h4>
                      <a
                        href="https://instagram.com/michal_kapusz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        @michal_kapusz
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                      <MapPin className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Lokalizacja</h4>
                      <p className="text-gray-600">
                        Korty tenisowe, Lotnicza 72
                        <br />
                        54-155 Wrocław
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Możliwość prowadzenia treningów na innych kortach we
                        Wrocławiu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 p-3 rounded-lg flex-shrink-0">
                      <Mail className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">michalkapusz5@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
                <h3 className="text-xl font-bold mb-6">Umów się na trening</h3>
                <p className="text-gray-600 mb-8">
                  Skontaktuj się ze mną w preferowany sposób i rozpocznij swoją
                  przygodę z tenisem
                </p>
                <div className="space-y-4 flex-grow flex flex-col justify-center">
                  <a
                    href="https://ig.me/m/michal_kapusz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
                  >
                    <Instagram className="h-5 w-5" />
                    Napisz na Instagram
                  </a>
                  <a
                    href="tel:+48605242945"
                    className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors w-full"
                  >
                    <Phone className="h-5 w-5" />
                    Zadzwoń teraz
                  </a>
                  <a
                    href="mailto:michalkapusz5@gmail.com"
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors w-full"
                  >
                    <Mail className="h-5 w-5" />
                    Wyślij email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
