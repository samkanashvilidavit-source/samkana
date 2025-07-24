import { useQuery } from "@tanstack/react-query";
import { Cookie, MapPin, Phone, Mail } from "lucide-react";
import { SITE_NAME, SITE_TAGLINE, NAVIGATION_ITEMS } from "@/lib/constants";
import type { CafeInfo } from "@shared/schema";

export default function Footer() {
  const { data: cafeInfo } = useQuery<CafeInfo>({
    queryKey: ['/api/cafe-info'],
  });

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-accent text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                <Cookie className="text-white text-xl" />
              </div>
              <div>
                <h3 className="font-dm-serif font-bold text-2xl">{SITE_NAME}</h3>
                <p className="text-sm text-neutral font-light">{SITE_TAGLINE}</p>
              </div>
            </div>
            <p className="text-neutral leading-relaxed">
              ქართული ტრადიციებისა და ევროპული შოკოლადის სრულყოფილი ნაზავი 
              თბილისის გულში.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-dm-serif font-semibold text-lg mb-6">სწრაფი ლინკები</h4>
            <ul className="space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-neutral hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="font-dm-serif font-semibold text-lg mb-6">პროდუქტები</h4>
            <ul className="space-y-3">
              <li><button className="text-neutral hover:text-secondary transition-colors">შოკოლადის ბუკეტები</button></li>
              <li><button className="text-neutral hover:text-secondary transition-colors">პერსონალიზებული შოკოლადი</button></li>
              <li><button className="text-neutral hover:text-secondary transition-colors">შოკოლადის პალეტები</button></li>
              <li><button className="text-neutral hover:text-secondary transition-colors">ოსტატობის კლასები</button></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-dm-serif font-semibold text-lg mb-6">საკონტაქტო ინფორმაცია</h4>
            <div className="space-y-3">
              <p className="text-neutral flex items-center">
                <MapPin className="mr-2 text-secondary w-4 h-4" />
                {cafeInfo?.addressKa || "რუსთაველის გამზირი 123"}
              </p>
              <p className="text-neutral flex items-center">
                <Phone className="mr-2 text-secondary w-4 h-4" />
                {cafeInfo?.phone || "+995 322 12 34 56"}
              </p>
              <p className="text-neutral flex items-center">
                <Mail className="mr-2 text-secondary w-4 h-4" />
                {cafeInfo?.email || "info@chococu.ge"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-neutral text-sm mb-4 md:mb-0">
            © 2024 Chococu. ყველა უფლება დაცულია.
          </p>
          <div className="flex space-x-6">
            <button className="text-neutral hover:text-secondary text-sm transition-colors">
              კონფიდენციალობის პოლიტიკა
            </button>
            <button className="text-neutral hover:text-secondary text-sm transition-colors">
              მომსახურების პირობები
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
