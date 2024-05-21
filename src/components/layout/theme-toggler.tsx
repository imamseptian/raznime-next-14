"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Renders a theme toggler component that allows the user to switch between light and dark themes.
 *
 * @return {JSX.Element} The rendered theme toggler component.
 */
export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="aspect-square border-0"
      onClick={ toggleTheme }
    >
      <Sun
        size={ 20 }
        className="dark:hidden"
      />
      <Moon
        size={ 20 }
        className="hidden dark:block"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
