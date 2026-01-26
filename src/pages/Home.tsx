import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
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
  Facebook,
  ArrowRight,
  Target,
  Zap,
} from "lucide-react";

function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

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
      <Helmet>
        <title>
          Michał Kapusz - Licencjonowany Trener Tenisa Wrocław | Lekcje Tenisa
        </title>
        <meta
          name="description"
          content="Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu. Trener Michał Kapusz oferuje indywidualne i grupowe treningi tenisa dla dzieci i dorosłych. Wieloletnie doświadczenie i profesjonalne podejście."
        />
        <link rel="canonical" href="https://kapusz-tenis.pl" />
        <meta
          property="og:title"
          content="Michał Kapusz - Licencjonowany Trener Tenisa Wrocław"
        />
        <meta
          property="og:description"
          content="Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu. Indywidualne i grupowe treningi dla dzieci i dorosłych."
        />
        <meta property="og:url" content="https://kapusz-tenis.pl" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] md:min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="coach2.webp"
            alt="Kort tenisowy we Wrocławiu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        {/* Tennis ball decoration */}
        <div className="absolute top-32 right-20 hidden lg:block animate-bounce-soft">
          <img
            src="/tennis-ball.svg"
            alt=""
            className="w-14 h-14 drop-shadow-[0_0_15px_rgba(185,214,19,0.5)]"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="stagger-children mt-12 md:mt-0 flex flex-col min-h-[calc(100svh-5rem)] md:min-h-0">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-6 leading-none">
                MICHAŁ
                <br />
                <span className="text-gradient">KAPUSZ</span>
              </h1>

              <div className="inline-flex items-center gap-3 px-4 py-2 w-fit rounded-full glass text-electric-500 text-sm font-medium mb-6 ">
                <img
                  src="/pzt.png"
                  alt="Polski Związek Tenisowy"
                  className="h-8 w-auto"
                />
                <span className="text-white/40">|</span>
                <img
                  src="/itf.jpg"
                  alt="ITF Coaching"
                  className="h-8 w-auto rounded"
                />
                <span>Licencjonowany Trener</span>
              </div>

              <p className="text-xl text-white/70 mb-8 max-w-lg leading-relaxed">
                Rozwiń swój potencjał tenisowy z profesjonalnym trenerem.
                Indywidualne podejście, sprawdzone metody, widoczne rezultaty.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("kontakt")}
                  className="btn-primary flex items-center gap-2 group"
                >
                  <span>Umów trening</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection("omnie")}
                  className="btn-outline"
                >
                  Poznaj mnie
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mt-auto md:mt-6 pt-6 pb-14 border-t border-white/10">
                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-4xl font-display text-electric-500">
                    8+
                  </p>
                  <p className="text-white/50 text-xs md:text-sm">
                    Lat doświadczenia
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-4xl font-display text-electric-500">
                    5000+
                  </p>
                  <p className="text-white/50 text-xs md:text-sm">Treningów</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-4xl font-display text-electric-500">
                    100%
                  </p>
                  <p className="text-white/50 text-xs md:text-sm">
                    Zadowolonych
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-electric-500/20 blur-3xl rounded-full scale-75" />

                {/* Main image */}
                <img
                  src="/coach2.webp"
                  alt="Trener tenisa Michał Kapusz"
                  className="relative rounded-2xl shadow-2xl shadow-navy-950/50 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
                />

                {/* Floating badge */}
                {/* <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 animate-bounce-soft">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-electric-500 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-navy-950" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Certyfikowany</p>
                      <p className="text-white/60 text-sm">Trener PZT</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden absolute bottom-4 left-1/2 -translate-x-1/2 md:flex flex-col items-center gap-1">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-electric-500 rounded-full animate-bounce" />
          </div>
          <span className="text-white/40 text-sm">Przewiń w dół</span>
        </div>
      </section>

      {/* O Mnie Section */}
      <section id="omnie" className="py-24 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl -translate-y-1/2" />

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="reveal relative order-2 lg:order-1">
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 border-2 border-electric-500/20 rounded-2xl" />
                <div className="absolute -inset-8 border border-electric-500/10 rounded-3xl" />

                <img
                  src="/coach1.webp"
                  alt="Trener Michał Kapusz podczas treningu"
                  className="rounded-xl w-full relative z-10"
                />
              </div>
            </div>

            {/* Content */}
            <div className="reveal order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-electric-500 text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                <span>O mnie</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-display text-white mb-8">
                PASJA DO TENISA
                <br />
                <span className="text-gradient">OD LAT</span>
              </h2>

              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Jestem pasjonatem tenisa z wieloletnim doświadczeniem w
                nauczaniu tej wspaniałej dyscypliny. Specjalizuję się w treningu
                zarówno początkujących, jak i zaawansowanych graczy,
                dostosowując program szkolenia do indywidualnych potrzeb każdego
                ucznia.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-6 card-hover">
                  <Trophy className="text-electric-500 h-10 w-10 mb-4" />
                  <h3 className="text-3xl font-display text-white mb-1">
                    8+ lat
                  </h3>
                  <p className="text-white/60">Doświadczenia</p>
                </div>
                <div className="glass rounded-xl p-6 card-hover">
                  <Calendar className="text-electric-500 h-10 w-10 mb-4" />
                  <h3 className="text-3xl font-display text-white mb-1">
                    5000+
                  </h3>
                  <p className="text-white/60">Treningów</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-900/50" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-electric-500 text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>Oferta</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display text-white mb-4">
              OFERTA <span className="text-gradient">TRENINGOWA</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Wybierz rodzaj treningu dopasowany do Twoich potrzeb i celów
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-electric-500/10 flex items-center justify-center mb-6 group-hover:bg-electric-500/20 transition-colors">
                  <Trophy className="h-8 w-8 text-electric-500" />
                </div>
                <h3 className="text-2xl font-display text-white mb-4">
                  TRENING INDYWIDUALNY
                </h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Spersonalizowany program</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Analiza techniki</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Elastyczne terminy</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2 - Featured */}
            <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden border border-electric-500/30">
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-electric-500 text-navy-950 text-xs font-bold px-4 py-1 rounded-bl-xl">
                POPULARNE
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-electric-500/20 flex items-center justify-center mb-6 group-hover:bg-electric-500/30 transition-colors">
                  <Users className="h-8 w-8 text-electric-500" />
                </div>
                <h3 className="text-2xl font-display text-white mb-4">
                  TRENING GRUPOWY
                </h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Małe grupy (2-4 osoby)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Dostosowany poziom</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Atrakcyjna cena</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-electric-500/10 flex items-center justify-center mb-6 group-hover:bg-electric-500/20 transition-colors">
                  <Baby className="h-8 w-8 text-electric-500" />
                </div>
                <h3 className="text-2xl font-display text-white mb-4">
                  DLA DZIECI
                </h3>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Nauka przez zabawę</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Rozwój koordynacji</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-electric-500" />
                    <span>Bezpieczeństwo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-electric-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-electric-500 text-sm font-medium mb-6">
              <Star className="h-4 w-4 fill-current" />
              <span>Opinie</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display text-white mb-4">
              CO MÓWIĄ <span className="text-gradient">KLIENCI</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Zobacz, co mówią osoby, które już trenują ze mną
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="reveal glass rounded-2xl p-8 card-hover">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-electric-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-white/70 mb-8 leading-relaxed">
                "Trening z Michałem to gwarancja ciągłego rozwoju. Jego
                profesjonalne podejście i szczegółowa analiza techniki
                sprawiają, że każde zajęcia są maksymalnie efektywne."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/client1.webp"
                  alt="Kuba Aniszewski"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-electric-500/30"
                />
                <div>
                  <p className="font-semibold text-white">Kuba Aniszewski</p>
                  <p className="text-sm text-electric-500">Trenuje od 2 lat</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="reveal glass rounded-2xl p-8 card-hover">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-electric-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-white/70 mb-8 leading-relaxed">
                "Michał to nie tylko ekspert w swoim fachu, ale także cierpliwy
                mentor i motywator. Potrafi dostosować treningi do wieku i
                umiejętności, łącząc naukę z zabawą."
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/client2.webp"
                  alt="Justyna Wojczyńska"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-electric-500/30"
                />
                <div>
                  <p className="font-semibold text-white">Justyna Wojczyńska</p>
                  <p className="text-sm text-electric-500">
                    Syn trenuje od roku
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="reveal glass rounded-2xl p-8 card-hover">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-electric-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-white/70 mb-8 leading-relaxed">
                "Michał jest szczegółowy, stara się pokazać i wytrenować każdy
                element gry. Nie daje forów, ale dzięki temu na koniec treningu
                jest poczucie satysfakcji. Polecam!"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="/client3.webp"
                  alt="Jakub Moniak"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-electric-500/30"
                />
                <div>
                  <p className="font-semibold text-white">Jakub Moniak</p>
                  <p className="text-sm text-electric-500">
                    Trenuje od ponad 2 lat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-navy-900/50" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-500/30 to-transparent" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-500/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-electric-500 text-sm font-medium mb-6">
              <Phone className="h-4 w-4" />
              <span>Kontakt</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display text-white mb-4">
              ROZPOCZNIJ <span className="text-gradient">TERAZ</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Wybierz preferowany sposób kontaktu i umów się na pierwszy trening
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="reveal glass rounded-2xl p-8">
              <h3 className="text-2xl font-display text-white mb-8">
                INFORMACJE KONTAKTOWE
              </h3>
              <div className="space-y-6">
                <a
                  href="tel:+48605242945"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-electric-500/10 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-electric-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="text-navy-950 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Telefon</p>
                    <p className="text-white font-semibold text-lg">
                      +48 605 242 945
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/michal_kapusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-electric-500/10 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Instagram className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Instagram</p>
                    <p className="text-white font-semibold text-lg">
                      @michal_kapusz
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                  <div className="w-14 h-14 rounded-xl bg-electric-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-navy-950 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Lokalizacja</p>
                    <p className="text-white font-semibold">
                      Lotnicza 72, 54-155 Wrocław
                    </p>
                    <p className="text-white/50 text-sm mt-1">
                      Możliwość treningów na innych kortach
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:kapusztenis@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-electric-500/10 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-electric-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="text-navy-950 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white font-semibold text-lg">
                      kapusztenis@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="reveal glass rounded-2xl p-8 flex flex-col">
              <h3 className="text-2xl font-display text-white mb-4">
                UMÓW SIĘ NA TRENING
              </h3>
              <p className="text-white/60 mb-8">
                Skontaktuj się ze mną w preferowany sposób i rozpocznij swoją
                przygodę z tenisem
              </p>
              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <a
                  href="https://ig.me/m/michal_kapusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-[1.02] w-full"
                >
                  <Instagram className="h-5 w-5" />
                  Napisz na Instagram
                </a>
                <a
                  href="https://m.me/michal.kapusz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#0084ff] text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-[1.02] w-full"
                >
                  <Facebook className="h-5 w-5" />
                  Napisz na Messenger
                </a>
                <a
                  href="tel:+48605242945"
                  className="btn-primary flex items-center justify-center gap-3 w-full"
                >
                  <Phone className="h-5 w-5" />
                  <span>Zadzwoń teraz</span>
                </a>
                <a
                  href="mailto:kapusztenis@gmail.com"
                  className="flex items-center justify-center gap-3 bg-white/10 text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-[1.02] w-full backdrop-blur-sm"
                >
                  <Mail className="h-5 w-5" />
                  Wyślij email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
