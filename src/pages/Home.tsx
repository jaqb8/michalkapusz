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
  Check,
  ArrowRight,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Kuba Aniszewski",
      role: "Trenuje od 2 lat",
      image: "/client1.webp",
      alt: "Kuba Aniszewski - zadowolony klient",
      fallback: "KA",
      text: "Trening z Michałem to gwarancja ciągłego rozwoju. Jego profesjonalne podejście i szczegółowa analiza techniki sprawiają, że każde zajęcia są maksymalnie efektywne. Widać prawdziwą pasję do tenisa, którą skutecznie przekazuje swoim podopiecznym.",
    },
    {
      id: 2,
      name: "Justyna Wojczyńska",
      role: "Syn trenuje od roku",
      image: "/client2.webp",
      alt: "Justyna Wójczyńska - zadowolony klient",
      fallback: "JW",
      text: "Michał to nie tylko ekspert w swoim fachu, ale także cierpliwy mentor i motywator. Potrafi dostosować treningi do wieku i umiejętności, łącząc naukę z zabawą. Jego pasja, zaangażowanie i umiejętność budowania pewności siebie sprawiają, że młodzi zawodnicy rozwijają się sportowo i czerpią radość z gry. To prawdziwa inspiracja dla dzieci!",
    },
    {
      id: 3,
      name: "Jakub Moniak",
      role: "Trenuje od ponad 2 lat",
      image: "/client3.webp",
      alt: "Jakub Moniak - zadowolony klient",
      fallback: "JM",
      text: "Michał jest szczegółowy, stara się pokazać, nauczyć oraz wytrenować każdy element gry, czy to serwisu, poruszania się czy uderzenia. Nie daje forów, ale dzięki temu na koniec treningu jest w człowieku poczucie satysfakcji. Każdy trening wnosi progress, wzrost formy, ale również pozostawia miejsce na analizę błędów i sposobu ich eliminacji. Swoją przygodę z tenisem rozpocząłem pod okiem Michała i dzisiaj po ponad 2 latach mogę śmiało powiedzieć że było warto, dlatego z całego serca polecam!",
    },
  ];

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

      {/* Hero Section - Full Width */}
      <section className="relative w-full bg-background py-20 md:py-32 -mt-[73px] pt-[93px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/coach2.webp"
            alt="Trener tenisa Michał Kapusz podczas treningu"
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-background/60 dark:bg-background/80"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                Profesjonalne Treningi Tenisa&nbsp;z Licencjonowanym Trenerem
              </h1>
              <div className="flex items-center gap-6 mb-6">
                <img
                  src="/pzt.jpg"
                  alt="Logo Polskiego Związku Tenisowego"
                  className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity border-2 rounded-full"
                />
                <img
                  src="/itf.jpg"
                  alt="Logo International Tennis Federation"
                  className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity border-2 rounded-full"
                />
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Ekspert w nauczaniu tenisa. Indywidualne podejście i nowoczesne metody treningowe dla każdego poziomu zaawansowania.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={() => scrollToSection("kontakt")}
                  size="lg"
                  className="text-lg px-8 py-6 font-semibold"
                >
                  Umów Trening
                </Button>
                <Button
                  onClick={() => scrollToSection("omnie")}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 font-semibold"
                >
                  Poznaj Mnie
                </Button>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-semibold text-foreground ml-2">5.0</span>
                <span className="ml-2">z 80+ opinii</span>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center relative z-20">
              <img
                src="/coach2.webp"
                alt="Trener tenisa Michał Kapusz podczas treningu"
                className="rounded-2xl shadow-2xl max-h-[600px] w-auto object-cover"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mt-16">
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                <p className="text-sm opacity-90">Zadowolonych Klientów</p>
              </CardContent>
            </Card>
            <Card className="bg-accent border-0">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <span className="text-4xl md:text-5xl font-bold text-foreground">5000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Przeprowadzonych Treningów</p>
                <p className="text-xs text-muted-foreground mt-1">Wzrost o 120 w tym miesiącu</p>
              </CardContent>
            </Card>
            <Card className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">8+ lat</div>
                <p className="text-sm opacity-90">Doświadczenia</p>
              </CardContent>
            </Card>
            <Card className="bg-accent border-0">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-semibold text-foreground">Optymalna Efektywność</p>
                <p className="text-xs text-muted-foreground mt-1">Zwiększ produktywność</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section - Full Width Primary Background */}
      <section className="relative w-full bg-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-100"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Profesjonalne Usługi Treningowe
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Uprość swój rozwój dzięki naszym efektywnym, skupionym na jakości usługom
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Trophy className="h-10 w-10 text-primary-foreground mb-4" />
                  <ArrowRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-primary-foreground">Trening Indywidualny</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80 text-sm">
                  Spersonalizowany program treningowy z analizą techniki i elastycznymi terminami dostosowanymi do Twoich potrzeb.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Users className="h-10 w-10 text-primary-foreground mb-4" />
                  <ArrowRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-primary-foreground">Trening Grupowy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80 text-sm">
                  Małe grupy 2-4 osobowe z dostosowanym poziomem zaawansowania i atrakcyjną ceną.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Baby className="h-10 w-10 text-primary-foreground mb-4" />
                  <ArrowRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-primary-foreground">Trening dla Dzieci</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80 text-sm">
                  Nauka przez zabawę z naciskiem na rozwój koordynacji i bezpieczeństwo najmłodszych.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Zap className="h-10 w-10 text-primary-foreground mb-4" />
                  <ArrowRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-primary-foreground">Analiza Techniki</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80 text-sm">
                  Szczegółowa analiza każdego elementu gry z profesjonalnym feedbackiem i planem poprawy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Target className="h-10 w-10 text-primary-foreground mb-4" />
                  <ArrowRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-primary-foreground">Program Spersonalizowany</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80 text-sm">
                  Indywidualnie dopasowany program treningowy do Twojego poziomu i celów.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all group shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <TrendingUp className="h-10 w-10 text-primary-foreground mb-4" />
                  <ArrowRight className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-primary-foreground">Monitoring Postępów</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/80 text-sm">
                  Regularna ocena postępów i dostosowanie programu treningowego do osiąganych rezultatów.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section - Full Width Background */}
      <section id="omnie" className="w-full bg-muted/50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <img
                src="/coach1.webp"
                alt="Trener Michał Kapusz - licencjonowany instruktor tenisa we Wrocławiu i Bolesławcu"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">O Mnie</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Jestem pasjonatem tenisa z wieloletnim doświadczeniem w nauczaniu
                tej wspaniałej dyscypliny. Specjalizuję się w treningu zarówno
                początkujących, jak i zaawansowanych graczy, dostosowując program
                szkolenia do indywidualnych potrzeb każdego ucznia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-background border-border">
                  <CardContent className="p-6">
                    <Trophy className="text-primary h-10 w-10 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">8+ lat</h3>
                    <p className="text-muted-foreground text-sm">
                      Doświadczenia
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-background border-border">
                  <CardContent className="p-6">
                    <Calendar className="text-primary h-10 w-10 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">5000+</h3>
                    <p className="text-muted-foreground text-sm">
                      Przeprowadzonych treningów
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Full Width Background */}
      <section className="relative w-full bg-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-100"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                Kluczowe Korzyści z Naszego Systemu Treningowego
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Nasze metody zwiększają produktywność, redukują błędy techniczne i napędzają rozwój sportowy.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Podnoszenie Jakości z Technologią</h3>
                    <p className="text-primary-foreground/80">
                      Wykorzystujemy zaawansowane metody analizy techniki i nowoczesne narzędzia treningowe do poprawy jakości gry.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Optymalizacja Procesu Treningowego</h3>
                    <p className="text-primary-foreground/80">
                      Zwiększamy efektywność treningów poprzez indywidualne podejście i dostosowanie metod do Twoich potrzeb.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-primary-foreground">Analiza Danych Treningowych</h3>
                    <p className="text-primary-foreground/80">
                      Wykorzystujemy analizę postępów i danych treningowych do ciągłego doskonalenia programu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 aspect-square flex items-center justify-center border border-primary-foreground/20">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary-foreground mb-2">5000+</div>
                  <p className="text-xl text-primary-foreground/80 mb-4">Treningów</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary-foreground/80">
                    <TrendingUp className="h-4 w-4 text-primary-foreground" />
                    <span>Wzrost o 120 w tym miesiącu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Grid Layout */}
      <section className="w-full bg-muted/50 py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Opinie moich klientów</h2>
            <p className="text-xl text-muted-foreground">
              Zobacz, co mówią osoby, które już trenują ze mną
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-6">
                  <AvatarImage
                    src={testimonial.image}
                    alt={testimonial.alt}
                  />
                  <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                </Avatar>
                <p className="text-foreground mb-6 text-base leading-relaxed flex-grow">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Full Width Primary Background */}
      <section id="kontakt" className="relative w-full bg-primary text-primary-foreground py-20 md:py-32 overflow-hidden">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-100"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Umów się na trening</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Wybierz preferowany sposób kontaktu i rozpocznij swoją przygodę z tenisem
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location - First, spans 2 rows on desktop */}
              <div className="group relative overflow-hidden rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all shadow-lg lg:row-span-2">
                <div className="relative rounded-xl p-5 transition-all duration-300 h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Lokalizacja</h4>
                    <p className="text-sm text-primary-foreground/80 leading-relaxed mb-2">
                      Korty tenisowe, Lotnicza 72
                      <br />
                      <span className="text-primary-foreground font-medium">54-155 Wrocław</span>
                    </p>
                    <p className="text-xs text-primary-foreground/70">
                      Możliwość prowadzenia treningów na innych kortach we Wrocławiu
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <a
                href="tel:+48605242945"
                className="group relative overflow-hidden rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all shadow-lg"
              >
                <div className="relative rounded-xl p-5 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Zadzwoń</h4>
                    <p className="text-sm text-primary-foreground font-medium mb-2">+48 605 242 945</p>
                    <div className="mt-auto">
                      <span className="text-xs font-medium text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Połącz teraz →
                      </span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://ig.me/m/michal_kapusz"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all shadow-lg"
              >
                <div className="relative rounded-xl p-5 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Instagram className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Instagram</h4>
                    <p className="text-sm text-primary-foreground font-medium mb-2">@michal_kapusz</p>
                    <div className="mt-auto">
                      <span className="text-xs font-medium text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Napisz teraz →
                      </span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Messenger */}
              <a
                href="https://m.me/michal.kapusz"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all shadow-lg"
              >
                <div className="relative rounded-xl p-5 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Facebook className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Messenger</h4>
                    <p className="text-sm text-primary-foreground/80 mb-2">Szybka odpowiedź</p>
                    <div className="mt-auto">
                      <span className="text-xs font-medium text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Napisz teraz →
                      </span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:kapusztenis@gmail.com"
                className="group relative overflow-hidden rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-all shadow-lg"
              >
                <div className="relative rounded-xl p-5 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-primary-foreground mb-1">Email</h4>
                    <p className="text-sm text-primary-foreground font-medium mb-2 break-all">kapusztenis@gmail.com</p>
                    <div className="mt-auto">
                      <span className="text-xs font-medium text-primary-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Wyślij email →
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
