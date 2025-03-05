export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  content: string;
  image?: string;
  author: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "3",
    title: "Profesjonalne lekcje tenisa we Wrocławiu - kompleksowy przewodnik",
    description: "Poznaj najlepsze miejsca do gry w tenisa we Wrocławiu, dowiedz się o profesjonalnych treningach i znajdź idealnego trenera tenisa dla siebie.",
    date: "2024-03-25",
    image: "/post-wroclaw-tennis.webp",
    content: `# Profesjonalne lekcje tenisa we Wrocławiu - kompleksowy przewodnik

Wrocław to miasto z bogatą tradycją tenisową i doskonałą infrastrukturą do uprawiania tego sportu. Jako doświadczony trener tenisa we Wrocławiu, chciałbym podzielić się z Wami kompleksowym przewodnikiem po świecie tenisa w stolicy Dolnego Śląska.

## Dlaczego warto grać w tenisa we Wrocławiu?

Wrocław oferuje:
- Liczne korty tenisowe w różnych lokalizacjach
- Profesjonalną kadrę trenerską
- Sprzyjające warunki klimatyczne
- Bogatą ofertę zajęć dla wszystkich poziomów zaawansowania

## Najlepsze miejsca do gry w tenisa we Wrocławiu

### 1. Centra tenisowe
- Centrum Tenisowe Wrocław
- Tennis Club Wrocław
- Akademia Tenisa Wrocław

### 2. Korty miejskie
- Park Południowy
- Park Zachodni
- Park Szczytnicki

## Jak wybrać dobrego trenera tenisa we Wrocławiu?

Przy wyborze trenera zwróć uwagę na:
- Certyfikaty i uprawnienia
- Doświadczenie w pracy z różnymi grupami wiekowymi
- Indywidualne podejście do ucznia
- Lokalizację i dostępność

## Programy treningowe

### Dla początkujących
- Nauka podstawowych uderzeń
- Praca nad postawą i poruszaniem się
- Zrozumienie zasad gry

### Dla zaawansowanych
- Doskonalenie techniki
- Taktyka gry
- Przygotowanie kondycyjne

## Korzyści z regularnych treningów

1. Poprawa kondycji fizycznej
2. Rozwój koordynacji ruchowej
3. Redukcja stresu
4. Budowa pewności siebie
5. Integracja społeczna

## Jak zacząć przygodę z tenisem we Wrocławiu?

1. Wybierz odpowiednie miejsce do treningów
2. Znajdź doświadczonego trenera
3. Zaopatrz się w podstawowy sprzęt
4. Ustal regularny harmonogram treningów
5. Dołącz do lokalnej społeczności tenisowej

Pamiętaj, że regularne treningi pod okiem profesjonalnego trenera to klucz do szybkiego rozwoju i czerpania przyjemności z gry w tenisa.`,
    author: "Michał Kapusz",
    slug: "profesjonalne-lekcje-tenisa-we-wroclawiu"
  },
  {
    id: "1",
    title: "Jak zacząć przygodę z tenisem?",
    description: "Praktyczny przewodnik dla początkujących graczy - od wyboru sprzętu po pierwsze kroki na korcie.",
    date: "2024-03-20",
    image: "/post-tennis.webp",
    content: `# Jak zacząć przygodę z tenisem?

Tenis to wspaniała dyscyplina sportowa, która łączy w sobie elementy kondycyjne, techniczne i taktyczne. Jeśli właśnie rozpoczynasz swoją przygodę z tenisem, ten artykuł pomoże Ci stawić pierwsze kroki.

## Wybór sprzętu

### Rakieta
Dla początkujących najlepszym wyborem będzie rakieta o wadze 260-280g z główką o powierzchni 100-105 cali kwadratowych. Taka rakieta zapewni dobry balans między kontrolą a siłą uderzenia.

### Buty
Ważne, aby buty były stabilne i miały dobrą przyczepność do podłoża. Dla początkujących polecam buty z gumową podeszwą.

### Piłki
Na początek wystarczy zestaw 3-4 piłek tenisowych. Pamiętaj, że piłki tenisowe tracą swoje właściwości po kilku godzinach gry.

## Pierwsze kroki na korcie

1. Zacznij od podstawowych ćwiczeń bez rakiety
2. Naucz się prawidłowego chwytu rakiety
3. Trenuj podstawowe uderzenia: forhend i bekhend
4. Pracuj nad prawidłową postawą i poruszaniem się

## Znajdź dobrego trenera

Profesjonalny trener pomoże Ci:
- Poprawnie opanować technikę
- Uniknąć kontuzji
- Rozwinąć się w odpowiednim tempie
- Zrozumieć taktykę gry

Pamiętaj, że każdy profesjonalny tenisista zaczynał od podstaw. Najważniejsze to cierpliwość i regularne treningi.`,
    author: "Michał Kapusz",
    slug: "jak-zaczac-przygode-z-tenisem"
  },
  {
    id: "2",
    title: "Technika serwisu w tenisie",
    description: "Poznaj tajniki prawidłowego serwisu - od podstawowych elementów po zaawansowane warianty.",
    date: "2024-03-15",
    image: "/post-serve.webp",
    content: `# Technika serwisu w tenisie

Serwis to jedno z najważniejszych uderzeń w tenisie. To jedyne uderzenie, nad którym masz pełną kontrolę i możesz je trenować samodzielnie.

## Podstawowe elementy serwisu

### Przygotowanie
1. Stań w pozycji wyjściowej
2. Ustaw stopy pod odpowiednim kątem
3. Przyjmij prawidłową postawę

### Ruch ramienia
- Prowadź rakietę płynnym ruchem
- Utrzymuj prawidłowy timing
- Zwróć uwagę na punkt uderzenia

### Punkt uderzenia
Idealny punkt uderzenia to:
- Wysokość około 2.5-3m
- Przed ciałem
- W linii prostej

## Typowe błędy

1. Nieprawidłowa postawa
2. Zbyt szybki ruch ramienia
3. Nieodpowiedni timing
4. Nieprawidłowy chwyt rakiety

## Ćwiczenia doskonalące

1. Trening bez piłki
2. Serwisy z pozycji kolan
3. Serwisy z bliskiej odległości
4. Serwisy z pełnego kortu

Pamiętaj, że opanowanie serwisu wymaga czasu i cierpliwości. Regularne treningi i analiza techniki są kluczem do sukcesu.`,
    author: "Michał Kapusz",
    slug: "technika-serwisu-w-tenisie"
  }
]; 