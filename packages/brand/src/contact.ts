/** Dane kontaktowe i adresy wspólne dla obu stron marki. */

export const contact = {
  person: "Michał Kapusz",
  phone: "+48605242945",
  phoneDisplay: "+48 605 242 945",
  phoneShort: "605 242 945",
  email: "kapusztenis@gmail.com",
  address: {
    street: "Lotnicza 72",
    postalCode: "54-155",
    city: "Wrocław",
    region: "Dolnośląskie",
    country: "PL",
  },
  geo: {
    latitude: "51.131637714012406",
    longitude: "16.959897082124968",
  },
} as const;

export const social = {
  instagram: "https://instagram.com/michal_kapusz",
  instagramHandle: "@michal_kapusz",
  instagramDm: "https://ig.me/m/michal_kapusz",
  facebook: "https://www.facebook.com/michal.kapusz/",
  messenger: "https://m.me/michal.kapusz",
} as const;

export const addressLine = `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`;

export const sites = {
  tenis: "https://kapusz-tenis.pl",
  // TODO: docelowa domena akademii (ustawiana też przez SITE_URL w apps/academy).
  academy: "https://akademia.kapusz-tenis.pl",
} as const;
