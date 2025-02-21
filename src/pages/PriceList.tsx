import React from "react";

function PriceList() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-6xl font-bold mb-16 tracking-tight text-center">
        CENNIK
      </h1>

      <div className="mb-12 text-center text-gray-600">
        <p className="mb-2">Możliwość płatności gotówką lub kartą.</p>
        <p>
          Z kartą <span className="font-semibold">Multisport</span> 15 zł mniej
          od każdego treningu.
        </p>
      </div>

      <div className="space-y-4 max-w-5xl mx-auto">
        {/* Pojedyncza sesja */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-gray-200/50 hover:border-blue-200 hover:shadow-lg">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Trening indywidualny</h3>
            <p className="text-gray-600 mb-1">1 sesja treningowa</p>
            <p className="text-gray-600">Czas trwania: 1 godzina</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold">100 zł</p>
              <p className="text-sm text-gray-500">1 sesja</p>
            </div>
          </div>
        </div>

        {/* Pakiet 5 sesji */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-gray-200/50 hover:border-blue-200 hover:shadow-lg">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Pakiet 5 treningów</h3>
            <p className="text-gray-600 mb-1">5 sesji treningowych</p>
            <p className="text-gray-600">Czas trwania: 1 godzina</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold">450 zł</p>
              <p className="text-sm text-gray-500">5 sesji</p>
            </div>
          </div>
        </div>

        {/* Pakiet 10 sesji */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-gray-200/50 hover:border-blue-200 hover:shadow-lg">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Pakiet 10 treningów</h3>
            <p className="text-gray-600 mb-1">10 sesji treningowych</p>
            <p className="text-gray-600">Czas trwania: 1 godzina</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold">800 zł</p>
              <p className="text-sm text-gray-500">10 sesji</p>
            </div>
          </div>
        </div>

        {/* Trening grupowy */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white transition-all border border-gray-200/50 hover:border-blue-200 hover:shadow-lg">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">Trening grupowy</h3>
            <p className="text-gray-600 mb-1">Zajęcia w grupie 4-osobowej</p>
            <p className="text-gray-600">Czas trwania: 1 godzina</p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold">300 zł</p>
              <p className="text-sm text-gray-500">miesięcznie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceList;
