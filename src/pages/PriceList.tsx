import { Helmet } from "react-helmet-async";

const shimmerAnimation = `
  @keyframes pulse {
    0% {
      border-color: rgb(191, 219, 254);
    }
    50% {
      border-color: rgb(59, 130, 246);
    }
    100% {
      border-color: rgb(191, 219, 254);
    }
  }
`;

function PriceList() {
  const getTwoWeeksFromNow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toLocaleDateString("pl-PL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
      <style>{shimmerAnimation}</style>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-6xl font-bold mb-16 tracking-tight text-center">
          CENNIK
        </h1>

        <div className="mb-12 text-center text-gray-600">
          <p className="mb-2">Możliwość płatności gotówką lub kartą.</p>
          <p>
            Z kartą <span className="font-semibold">Multisport</span> 15 zł
            mniej od każdego treningu.
          </p>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Pojedyncza sesja */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-blue-200 hover:border-blue-200 hover:shadow-lg">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Trening indywidualny</h3>
              <p className="text-gray-600 mb-1">1 sesja treningowa</p>
              <p className="text-gray-600">Czas trwania: 1 godzina</p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8">
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-3xl font-bold">100 zł</p>
                <p className="text-sm text-gray-500">1 sesja</p>
                <p className="text-sm text-gray-500">+ cena kortu</p>
              </div>
            </div>
          </div>

          {/* Pakiet 5 sesji oferta specjalna */}
          {/* <div className="bg-gradient-to-br from-blue-50 to-white backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border-2 border-blue-200 hover:border-blue-200 hover:shadow-lg scale-105 shadow-md relative animate-[pulse_2s_ease-in-out_infinite]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-base font-semibold whitespace-nowrap">
              Oferta specjalna
            </div>
            <div className="flex-1 mt-6">
              <h3 className="text-2xl font-bold mb-2">Pakiet 5 treningów</h3>
              <p className="text-gray-600 mb-1">5 sesji treningowych</p>
              <p className="text-gray-600">Czas trwania: 1 godzina</p>
              <p className="text-blue-600 font-semibold mt-2">
                Nie zwlekaj! Oferta ważna tylko do {getTwoWeeksFromNow()}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="text-center md:text-right">
                <p className="text-lg text-gray-500 line-through mb-1">
                  500 zł
                </p>
                <p className="text-4xl text-blue-600 font-bold">450 zł</p>
                <p className="text-lg text-blue-600">5 sesji</p>
              </div>
            </div>
          </div> */}

          {/* Pakiet 10 sesji */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-blue-200 hover:border-blue-200 hover:shadow-lg">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Pakiet 10 treningów</h3>
              <p className="text-gray-600 mb-1">10 sesji treningowych</p>
              <p className="text-gray-600">Czas trwania: 1 godzina</p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8">
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-3xl font-bold">900 zł</p>
                <p className="text-sm text-gray-500">10 sesji</p>
                <p className="text-sm text-gray-500">+ cena kortu</p>
              </div>
            </div>
          </div>

          {/* Trening dwuosobowy   */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-blue-200 hover:border-blue-200 hover:shadow-lg">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Trening dwuosobowy</h3>
              <p className="text-gray-600 mb-1">Zajęcia w grupie 2-osobowej</p>
              <p className="text-gray-600">Czas trwania: 1 godzina</p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8">
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-3xl font-bold">60 zł</p>
                <p className="text-sm text-gray-500">za osobę</p>
                <p className="text-sm text-gray-500">+ 1/2 ceny kortu</p>
              </div>
            </div>
          </div>

          {/* Trening grupowy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-blue-200 hover:border-blue-200 hover:shadow-lg">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Trening grupowy</h3>
              <p className="text-gray-600 mb-1">Zajęcia w grupie 4-osobowej</p>
              <p className="text-gray-600">Czas trwania: 1 godzina</p>
            </div>
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4 md:gap-8">
              <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-3xl font-bold">50 zł</p>
                <p className="text-sm text-gray-500">za osobę</p>
                <p className="text-sm text-gray-500">+ 1/4 ceny kortu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PriceList;
