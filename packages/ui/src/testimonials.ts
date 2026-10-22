export interface Testimonial {
  name: string;
  meta: string;
  initials: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Kuba Aniszewski",
    meta: "Trenuje od 2 lat",
    initials: "KA",
    text: "Trening z Michałem to gwarancja ciągłego rozwoju. Jego profesjonalne podejście i szczegółowa analiza techniki sprawiają, że każde zajęcia są maksymalnie efektywne.",
  },
  {
    name: "Justyna Wojczyńska",
    meta: "Syn trenuje od roku",
    initials: "JW",
    text: "Michał to nie tylko ekspert w swoim fachu, ale także cierpliwy mentor i motywator. Potrafi dostosować treningi do wieku i umiejętności, łącząc naukę z zabawą.",
  },
  {
    name: "Jakub Moniak",
    meta: "Trenuje od ponad 2 lat",
    initials: "JM",
    text: "Michał jest szczegółowy, stara się pokazać i wytrenować każdy element gry. Nie daje forów, ale dzięki temu na koniec treningu jest poczucie satysfakcji. Polecam!",
  },
];
