import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SECTIONS, GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-inter font-bold text-accent mb-4">
            {SECTIONS.gallery.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {SECTIONS.gallery.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="rounded-xl shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    onClick={() => setSelectedImage(image.src)}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
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
