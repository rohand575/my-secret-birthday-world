import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import { config } from "@/data/config";

/**
 * Navigation Component
 * 
 * Sticky header with smooth scroll navigation
 */
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Timeline", href: "#timeline" },
    { label: "Gallery", href: "#gallery" },
    { label: "Quiz", href: "#quiz" },
    // { label: "Notes", href: "#notes" },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group"
          >
            <Heart className="w-6 h-6 text-primary group-hover:scale-110 transition-smooth" />
            <span className="font-bold text-lg text-shimmer hidden sm:inline">
              Birthday World
            </span>
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className="hover:bg-primary/10 transition-smooth"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-card border-t border-primary/10 animate-[fadeIn_0.2s_ease-in]">
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="justify-start hover:bg-primary/10 transition-smooth"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-primary/10 to-transparent py-8 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary animate-pulse" /> by {config.madeBy}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            For the most amazing person in the world 💝
          </p>
        </div>
      </footer>
    </>
  );
};
