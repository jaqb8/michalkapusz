import type { ImageMetadata } from "astro";
import coach01 from "../assets/team/coach-01.jpg";
import michal from "../assets/team/michal-kapusz.jpg";
import coach03 from "../assets/team/coach-03.jpg";

export interface Coach {
  name: string;
  role: string;
  /** Krótki opis w scenie hero. */
  focus: string;
  photo: ImageMetadata;
  photoAlt: string;
  headCoach?: boolean;
  details: [label: string, value: string][];
}

// TODO: uzupełnić dane trenerów (imiona, specjalizacje, licencje). Kolejność = kolejność na zdjęciu w hero.
export const coaches: [Coach, Coach, Coach] = [
  {
    name: "[Imię Nazwisko]",
    role: "Trener",
    focus: "[Specjalizacja, np. juniorzy i gra turniejowa]",
    photo: coach01,
    photoAlt: "Trener Kapusz Tennis Academy",
    details: [
      ["Specjalizacja", "[np. juniorzy]"],
      ["Licencja", "[PZT / ITF]"],
      ["Na korcie od", "[rok]"],
    ],
  },
  {
    name: "Michał Kapusz",
    role: "Head coach",
    focus: "Założyciel akademii i autor jej metodyki. Licencja PZT i ITF.",
    photo: michal,
    photoAlt: "Michał Kapusz, head coach Kapusz Tennis Academy",
    headCoach: true,
    details: [
      ["Rola", "Założyciel, autor metodyki"],
      ["Licencja", "PZT · ITF"],
      ["Doświadczenie", "8+ lat · 5000+ treningów"],
    ],
  },
  {
    name: "[Imię Nazwisko]",
    role: "Trener",
    focus: "[Specjalizacja, np. dorośli i grupy]",
    photo: coach03,
    photoAlt: "Trener Kapusz Tennis Academy",
    details: [
      ["Specjalizacja", "[np. dorośli i grupy]"],
      ["Licencja", "[PZT / ITF]"],
      ["Na korcie od", "[rok]"],
    ],
  },
];
