import { Helmet } from "../lib/helmet";

const gtmScript = `window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.defer = true;
    gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-WBXGDTVL09";
    document.head.appendChild(gtmScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-WBXGDTVL09", {
      transport_type: "beacon",
      page_load_time_ms: performance.now(),
    });
  }, 2000);
});`;

const trainerSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Michał Kapusz - Trener Tenisa",
  description: "Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Wrocław",
    addressRegion: "Dolnośląskie",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.131637714012406",
    longitude: "16.959897082124968",
  },
  offers: {
    "@type": "Offer",
    description: "Lekcje tenisa indywidualne i grupowe",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michał Kapusz",
  jobTitle: "Licencjonowany Trener Tenisa",
  description:
    "Jestem pasjonatem tenisa z wieloletnim doświadczeniem w nauczaniu tej wspaniałej dyscypliny. Specjalizuję się w treningu zarówno początkujących, jak i zaawansowanych graczy.",
  knowsAbout: ["Tenis", "Trening sportowy", "Coaching"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Trener Tenisa",
    experienceInYears: "8",
    skills: ["Trening indywidualny", "Trening grupowy", "Trening dzieci"],
  },
  url: "https://kapusz-tenis.pl",
  telephone: "+48605242945",
  email: "michalkapusz5@gmail.com",
  image: "https://kapusz-tenis.pl/logo.webp",
  sameAs: [
    "https://www.facebook.com/michal.kapusz/",
    "https://instagram.com/michal_kapusz",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Treningi tenisa",
  provider: {
    "@type": "Person",
    name: "Michał Kapusz",
  },
  serviceType: "Trening sportowy",
  areaServed: ["Wrocław", "Bolesławiec"],
  offers: [
    {
      "@type": "Offer",
      name: "Trening Indywidualny",
      description: "Spersonalizowany program treningowy z analizą techniki",
    },
    {
      "@type": "Offer",
      name: "Trening Grupowy",
      description: "Treningi w małych grupach 2-4 osobowych",
    },
    {
      "@type": "Offer",
      name: "Trening dla Dzieci",
      description: "Nauka tenisa przez zabawę z naciskiem na rozwój koordynacji",
    },
  ],
};

const clubSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Lotnicza Tennis Club",
  description:
    "Kryte korty tenisowe we Wrocławiu. Profesjonalny obiekt sportowy z pełnowymiarowymi kortami do tenisa. Dostępne zajęcia indywidualne i grupowe pod okiem licencjonowanego trenera.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lotnicza 72",
    addressLocality: "Wrocław",
    postalCode: "54-155",
    addressRegion: "Dolnośląskie",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.131637714012406",
    longitude: "16.959897082124968",
  },
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Kryte korty tenisowe",
      value: true,
      description: "Pełnowymiarowe korty do tenisa z profesjonalną nawierzchnią",
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Parking",
      value: true,
      description: "Bezpłatny parking dla klientów",
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Oświetlenie",
      value: true,
      description: "Profesjonalne oświetlenie kortów",
    },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "07:00",
    closes: "22:00",
  },
  telephone: "+48604105500",
  url: "https://www.lotniczatennisclub.pl/",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100044144873553",
    "https://www.instagram.com/lotniczatennisclub/",
  ],
  priceRange: "$$",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Michał Kapusz - Trener Tenisa",
  url: "https://kapusz-tenis.pl/",
};

const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      position: 1,
      name: "Cennik",
      description: "Cennik zajęć tenisowych dla dorosłych i dzieci",
      url: "https://kapusz-tenis.pl/cennik",
    },
    {
      "@type": "SiteNavigationElement",
      position: 2,
      name: "Blog",
      description: "Blog o tenisie i treningach",
      url: "https://kapusz-tenis.pl/blog",
    },
  ],
};

export function GlobalHead() {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="google-site-verification"
        content="o4HZIEXA6QPcO8ZkBwRKw8fu00byyaIYqRa-j03hzWg"
      />
      <meta name="author" content="Michał Kapusz" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta property="og:image" content="https://kapusz-tenis.pl/logo.webp" />
      <link rel="icon" type="image/webp" href="/logo.webp" />
      <link rel="apple-touch-icon" href="/logo.webp" />
      <link rel="preload" as="image" href="/coach2.webp" fetchPriority="high" />
      <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
      <script type="application/ld+json">
        {JSON.stringify(trainerSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(clubSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(navigationSchema)}
      </script>
    </Helmet>
  );
}
