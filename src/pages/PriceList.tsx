import { useEffect, useRef } from "react";
import { Helmet } from "../lib/helmet";
import { Check, Zap, Users, User, CreditCard } from "lucide-react";

function PriceList() {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cennik - Lekcje Tenisa z Michałem Kapuszem | Wrocław</title>
        <meta
          name="description"
          content="Sprawdź cennik lekcji tenisa we Wrocławiu. Oferujemy treningi indywidualne i grupowe w atrakcyjnych cenach. Rabaty dla posiadaczy karty Multisport."
        />
        <link rel="canonical" href="https://kapusz-tenis.pl/cennik" />
        <meta
          property="og:title"
          content="Cennik - Lekcje Tenisa z Michałem Kapuszem | Wrocław"
        />
        <meta
          property="og:description"
          content="Sprawdź cennik lekcji tenisa we Wrocławiu. Oferujemy treningi indywidualne i grupowe w atrakcyjnych cenach."
        />
        <meta property="og:url" content="https://kapusz-tenis.pl/cennik" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://kapusz-tenis.pl/logo.webp" />
      </Helmet>

      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-electric-500 text-sm font-medium mb-6">
              <CreditCard className="h-4 w-4" />
              <span>Cennik</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display text-white mb-6">
              CENNIK <span className="text-gradient">TRENINGÓW</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-white/60">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-electric-500" />
                Płatność gotówką lub kartą
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-electric-500" />
                Multisport: 15 zł rabatu
              </span>
            </div>
          </div>

           {/* Pricing Cards */}
           <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto md:max-w-5xl">
            {/* Individual Training */}
            <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-electric-500/10 flex items-center justify-center mb-6 group-hover:bg-electric-500/20 transition-colors">
                  <User className="h-7 w-7 text-electric-500" />
                </div>
                
                <h3 className="text-2xl font-display text-white mb-2">
                  TRENING INDYWIDUALNY
                </h3>
                <p className="text-white/50 mb-6">1 sesja treningowa • 1 godzina</p>
                
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-5xl font-display text-electric-500">120</span>
                   <span className="text-white/60">zł / sesja</span>
                 </div>
                
                <p className="text-white/40 text-sm">+ cena kortu</p>
              </div>
            </div>

            {/* Package 10 */}
            <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden border border-electric-500/30">
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-electric-500 text-navy-950 text-xs font-bold px-4 py-1 rounded-bl-xl">
                OSZCZĘDZASZ 100 zł
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-electric-500/20 flex items-center justify-center mb-6 group-hover:bg-electric-500/30 transition-colors">
                  <Zap className="h-7 w-7 text-electric-500" />
                </div>
                
                <h3 className="text-2xl font-display text-white mb-2">
                  PAKIET 10 TRENINGÓW
                </h3>
                <p className="text-white/50 mb-6">10 sesji treningowych • 1 godzina</p>
                
                <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-5xl font-display text-electric-500">1100</span>
                   <span className="text-white/60">zł / pakiet</span>
                 </div>
                 <p className="text-electric-400 text-sm mb-4">110 zł za sesję</p>
                
                <p className="text-white/40 text-sm">+ cena kortu</p>
              </div>
            </div>

             {/* Duo Training */}
             <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-xl bg-electric-500/10 flex items-center justify-center mb-6 group-hover:bg-electric-500/20 transition-colors">
                   <Users className="h-7 w-7 text-electric-500" />
                 </div>
                 
                 <h3 className="text-2xl font-display text-white mb-2">
                   TRENING DWUOSOBOWY
                 </h3>
                 <p className="text-white/50 mb-6">Grupa 2-osobowa • 1 godzina</p>
                 
                 <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-display text-electric-500">75</span>
                    <span className="text-white/60">zł / osoba</span>
                  </div>
                 
                 <p className="text-white/40 text-sm">+ 1/2 ceny kortu</p>
               </div>
             </div>

             {/* Package 10 Duo */}
             <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden border border-electric-500/30">
               {/* Popular badge */}
               <div className="absolute top-0 right-0 bg-electric-500 text-navy-950 text-xs font-bold px-4 py-1 rounded-bl-xl">
                 OSZCZĘDZASZ 100 zł
               </div>
               
               <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-xl bg-electric-500/20 flex items-center justify-center mb-6 group-hover:bg-electric-500/30 transition-colors">
                   <Zap className="h-7 w-7 text-electric-500" />
                 </div>
                 
                 <h3 className="text-2xl font-display text-white mb-2">
                   PAKIET 10 TRENINGÓW DWUOSOBOWYCH
                 </h3>
                 <p className="text-white/50 mb-6">10 sesji • 2 osoby • 1 godzina</p>
                 
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-display text-electric-500">650</span>
                    <span className="text-white/60">zł / osoba</span>
                  </div>
                  <p className="text-electric-400 text-sm mb-4">65 zł za sesję</p>
                  
                  <p className="text-white/40 text-sm">+ 1/2 ceny kortu</p>
               </div>
             </div>

             {/* Group Training */}
             <div className="reveal glass rounded-2xl p-8 card-hover group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-electric-500/0 to-electric-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="relative z-10">
                 <div className="w-14 h-14 rounded-xl bg-electric-500/10 flex items-center justify-center mb-6 group-hover:bg-electric-500/20 transition-colors">
                   <Users className="h-7 w-7 text-electric-500" />
                 </div>
                 
                 <h3 className="text-2xl font-display text-white mb-2">
                   TRENING GRUPOWY
                 </h3>
                 <p className="text-white/50 mb-6">Grupa 4-osobowa • 1 godzina</p>
                 
                 <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-5xl font-display text-electric-500">50</span>
                   <span className="text-white/60">zł / osoba</span>
                 </div>
                 
                 <p className="text-white/40 text-sm">+ 1/4 ceny kortu</p>
               </div>
             </div>
           </div>

          {/* CTA */}
          <div className="reveal text-center mt-16">
            <p className="text-white/60 mb-6">
              Masz pytania? Skontaktuj się ze mną!
            </p>
            <a
              href="tel:+48605242945"
              className="btn-primary inline-flex items-center gap-2"
            >
              <span>Zadzwoń teraz</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default PriceList;
