import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface ThemeToggleProps {
  variant?: "icon" | "full";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const isDark = theme === "dark";

  if (variant === "full") {
    return (
      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={`justify-start w-full ${className}`}
      >
        {isDark ? (
          <>
            <Sun className="h-4 w-4 mr-2" />
            Tryb jasny
          </>
        ) : (
          <>
            <Moon className="h-4 w-4 mr-2" />
            Tryb ciemny
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      aria-label={isDark ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
