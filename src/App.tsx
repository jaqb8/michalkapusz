import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  MapPin,
  Phone,
  Menu,
  Instagram,
  Facebook,
} from "lucide-react";
import { AppRouter, ScrollToTop } from "./router";
import { BreadcrumbNavigation } from "./components/BreadcrumbNavigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <div className="min-h-screen bg-[url('/tennis-court.jpg')] bg-cover bg-center bg-no-repeat">
      <Helmet>
        <title>
          Michał Kapusz - Licencjonowany Trener Tenisa Wrocław | Lekcje Tenisa
        </title>
        <meta
          name="description"
          content="Profesjonalne lekcje tenisa we Wrocławiu i Bolesławcu. Trener z licencją PZT. Zajęcia indywidualne i grupowe dla dzieci i dorosłych."
        />
      </Helmet>
      {/* Overlay */}
      <div className="min-h-screen bg-gradient-to-br from-background/95 via-accent/50 to-background/95 dark:from-background/98 dark:via-background/95 dark:to-background/98">
        <ScrollToTop />
        {/* Navigation */}
        <nav className="bg-background/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/logo.webp"
                  alt="Logo Michał Kapusz - Licencjonowany Trener Tenisa Wrocław i Bolesławiec"
                  className="h-12 mix-blend-darken dark:mix-blend-normal dark:brightness-150"
                />
                <span className="text-2xl font-bold text-primary">
                  Michał Kapusz
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                <Button variant="ghost" asChild>
                  <Link to="/">Strona Główna</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/cennik">Cennik</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/blog">Blog</Link>
                </Button>
                <ThemeToggle />
              </div>

              {/* Mobile Menu */}
              <div className="flex items-center gap-2 md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Otwórz menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px]">
                    <SheetHeader>
                      <SheetTitle className="text-left text-primary">
                        Menu
                      </SheetTitle>
                    </SheetHeader>
                    <Separator className="my-4" />
                    <nav className="flex flex-col gap-2">
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/">Strona Główna</Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/cennik">Cennik</Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/blog">Blog</Link>
                      </Button>
                    </nav>
                    <Separator className="my-4" />
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <a
                        href="tel:+48605242945"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>+48 605 242 945</span>
                      </a>
                      <a
                        href="mailto:kapusztenis@gmail.com"
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>kapusztenis@gmail.com</span>
                      </a>
                    </div>
                    <Separator className="my-4" />
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">Motyw</p>
                      <ThemeToggle variant="full" />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumbs */}
        <BreadcrumbNavigation />

        {/* Routes */}
        <AppRouter />

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground pt-12 pb-4">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Left Column - About */}
              <div className="text-left">
                <Link
                  to="/"
                  className="text-2xl font-bold mb-6 block text-primary"
                >
                  Michał Kapusz
                </Link>
                <p className="text-muted-foreground mb-8">
                  Chcesz nauczyć się grać w tenisa lub poprawić swoje
                  umiejętności? Zapraszam na profesjonalne treningi dostosowane
                  do Twoich potrzeb.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <a
                      href="https://www.facebook.com/michal.kapusz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Odwiedź profil na Facebooku"
                    >
                      <Facebook className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="rounded-full"
                    asChild
                  >
                    <a
                      href="https://instagram.com/michal_kapusz"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Odwiedź profil na Instagramie"
                    >
                      <Instagram className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right Column - Links & Info */}
              <div className="text-left">
                <h3 className="text-primary font-bold mb-6 text-lg">
                  INFORMACJE
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      O mnie
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cennik"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Cennik
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Lotnicza 72, 54-155 Wrocław</span>
                    </div>
                  </li>
                  <li>
                    <a
                      href="tel:+48605242945"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 text-primary" />
                      <span>+48 605 242 945</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:kapusztenis@gmail.com"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <span>kapusztenis@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-base mt-12 pt-4 border-t border-border text-center text-muted-foreground">
              powered by{" "}
              <a
                href="https://aniszewski.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-bold hover:text-primary/80 transition-colors"
              >
                Jakub Aniszewski IT Solutions
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
