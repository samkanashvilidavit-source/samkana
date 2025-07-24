import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/lib/constants";

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(184, 65, 42, 0.5), rgba(139, 38, 53, 0.5)), url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {/* Glass box for text content */}
          <div className="glass-box-dark rounded-2xl p-8 md:p-12">
            <h1 className="text-5xl md:text-6xl font-inter font-bold text-white mb-4 leading-tight">
              {HERO_CONTENT.title}<br />
              <span className="text-secondary">{HERO_CONTENT.subtitle}</span>
            </h1>
            
            <div className="w-16 h-1 bg-secondary mb-6"></div>
            
            <p className="text-white/90 text-lg font-medium mb-6 uppercase tracking-wide">
              {HERO_CONTENT.tagline}
            </p>
            
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {HERO_CONTENT.description}
            </p>
            
            <Button
              onClick={scrollToContact}
              className="bg-secondary hover:bg-primary text-white px-8 py-4 rounded-full font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              size="lg"
            >
              {HERO_CONTENT.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
