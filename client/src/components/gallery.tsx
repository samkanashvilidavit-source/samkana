import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SECTIONS, GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white relative">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-dm-serif font-bold text-accent mb-4">
            {SECTIONS.gallery.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {SECTIONS.gallery.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <div className="glass-card rounded-xl overflow-hidden shadow-lg hover-scale">
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      onClick={() => setSelectedImage(image.src)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl glass-card">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
