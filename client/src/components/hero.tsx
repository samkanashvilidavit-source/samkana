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
          backgroundImage: `linear-gradient(rgba(184, 65, 42, 0.7), rgba(139, 38, 53, 0.7)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <p className="text-neutral text-lg font-light mb-4 font-inter">
            {HERO_CONTENT.welcome}
          </p>
          <h1 className="text-6xl md:text-7xl font-inter font-bold text-white mb-6 leading-tight">
            {HERO_CONTENT.title}<br />
            <span className="text-secondary">შოკოლადის</span><br />
            <span className="text-neutral">კაფე</span>
          </h1>
          <div className="w-1 h-16 bg-secondary mb-6"></div>
          <p className="text-neutral text-lg leading-relaxed mb-8 max-w-lg">
            {HERO_CONTENT.description}
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-secondary hover:bg-primary text-white px-8 py-4 rounded-full font-inter font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            {HERO_CONTENT.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
