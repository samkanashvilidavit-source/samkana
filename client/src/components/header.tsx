import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Cookie } from "lucide-react";
import { SITE_NAME, SITE_NAME_KA, SITE_TAGLINE, NAVIGATION_ITEMS } from "@/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-choco rounded-full flex items-center justify-center">
              <Cookie className="text-white text-xl" />
            </div>
            <div>
              <h1 className="font-dm-serif font-bold text-2xl text-accent">{SITE_NAME}</h1>
              <p className="text-sm text-muted-foreground font-light">{SITE_TAGLINE}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className="font-dm-serif font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button 
              className="bg-primary text-primary-foreground hover:bg-accent font-dm-serif font-medium"
              onClick={() => scrollToSection('#contact')}
            >
              შეკვეთა
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {NAVIGATION_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.href)}
                      className="font-dm-serif font-medium text-lg text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-accent font-dm-serif font-medium w-full mt-4"
                    onClick={() => scrollToSection('#contact')}
                  >
                    შეკვეთა
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
