import { contact, social } from "@kapusz/brand/contact";

/** Dane strukturalne (JSON-LD) wspólne dla całej strony, przeniesione 1:1 z poprzedniej wersji. */

export const SITE = "https://kapusz-tenis.pl";
export const DEFAULT_OG_IMAGE = `${SITE}/og-logo-v2.jpg`;

const address = {
  "@type": "PostalAddress",
  addressLocality: contact.address.city,
  addressRegion: contact.address.region,
  addressCountry: contact.address.country,
};

const geo = { "@type": "GeoCoordinates", ...contact.geo };

export const siteSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Michał Kapusz - Trener Tenisa",
    description: "Profesjonalne lekcje tenisa we Wrocławiu",
    address,
    geo,
    offers: { "@type": "Offer", description: "Lekcje tenisa indywidualne i grupowe" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: contact.person,
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
    url: `${SITE}/`,
    telephone: contact.phone,
    email: contact.email,
    image: DEFAULT_OG_IMAGE,
    sameAs: [social.facebook, social.instagram],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Treningi tenisa",
    provider: { "@type": "Person", name: contact.person },
    serviceType: "Trening sportowy",
    areaServed: [contact.address.city],
    offers: [
      {
        "@type": "Offer",
        name: "Trening Indywidualny",
        description: "Spersonalizowany program treningowy z analizą techniki",
      },
      { "@type": "Offer", name: "Trening Grupowy", description: "Treningi w małych grupach 2-4 osobowych" },
      {
        "@type": "Offer",
        name: "Trening dla Dzieci",
        description: "Nauka tenisa przez zabawę z naciskiem na rozwój koordynacji",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Lotnicza Tennis Club",
    description:
      "Kryte korty tenisowe we Wrocławiu. Profesjonalny obiekt sportowy z pełnowymiarowymi kortami do tenisa. Dostępne zajęcia indywidualne i grupowe pod okiem licencjonowanego trenera.",
    address: {
      ...address,
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
    },
    geo,
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Michał Kapusz - Trener Tenisa",
    url: `${SITE}/`,
    inLanguage: "pl-PL",
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Cennik",
        description: "Cennik zajęć tenisowych dla dorosłych i dzieci",
        url: `${SITE}/cennik/`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Blog",
        description: "Blog o tenisie i treningach",
        url: `${SITE}/blog/`,
      },
    ],
  },
];

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Strona główna", path: "/" }, ...crumbs].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE}${crumb.path}`,
    })),
  };
}

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);
