import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function PriceList() {
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
      </Helmet>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-6xl font-bold mb-16 tracking-tight text-center">
          CENNIK
        </h1>

        <div className="mb-12 text-center text-muted-foreground">
          <p className="mb-2">Możliwość płatności gotówką lub kartą.</p>
          <p>
            Z kartą <span className="font-semibold">Multisport</span> 15 zł
            mniej od każdego treningu.
          </p>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Pojedyncza sesja */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6">
              <CardHeader className="p-0 flex-1 text-center md:text-left">
                <CardTitle className="text-2xl mb-2">
                  Trening indywidualny
                </CardTitle>
                <CardDescription className="text-base">
                  1 sesja treningowa • Czas trwania: 1 godzina
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center md:items-end">
                <p className="text-3xl font-bold">100 zł</p>
                <p className="text-sm text-muted-foreground">1 sesja</p>
                <Badge variant="outline" className="mt-2">
                  + cena kortu
                </Badge>
              </CardContent>
            </div>
          </Card>

          {/* Pakiet 10 sesji */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6">
              <CardHeader className="p-0 flex-1 text-center md:text-left">
                <CardTitle className="text-2xl mb-2">
                  Pakiet 10 treningów
                </CardTitle>
                <CardDescription className="text-base">
                  10 sesji treningowych • Czas trwania: 1 godzina
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center md:items-end">
                <p className="text-3xl font-bold">900 zł</p>
                <p className="text-sm text-muted-foreground">10 sesji</p>
                <Badge variant="outline" className="mt-2">
                  + cena kortu
                </Badge>
              </CardContent>
            </div>
          </Card>

          {/* Trening dwuosobowy */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6">
              <CardHeader className="p-0 flex-1 text-center md:text-left">
                <CardTitle className="text-2xl mb-2">
                  Trening dwuosobowy
                </CardTitle>
                <CardDescription className="text-base">
                  Zajęcia w grupie 2-osobowej • Czas trwania: 1 godzina
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center md:items-end">
                <p className="text-3xl font-bold">60 zł</p>
                <p className="text-sm text-muted-foreground">za osobę</p>
                <Badge variant="outline" className="mt-2">
                  + 1/2 ceny kortu
                </Badge>
              </CardContent>
            </div>
          </Card>

          {/* Trening grupowy */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-8 gap-6">
              <CardHeader className="p-0 flex-1 text-center md:text-left">
                <CardTitle className="text-2xl mb-2">Trening grupowy</CardTitle>
                <CardDescription className="text-base">
                  Zajęcia w grupie 4-osobowej • Czas trwania: 1 godzina
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col items-center md:items-end">
                <p className="text-3xl font-bold">50 zł</p>
                <p className="text-sm text-muted-foreground">za osobę</p>
                <Badge variant="outline" className="mt-2">
                  + 1/4 ceny kortu
                </Badge>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default PriceList;
