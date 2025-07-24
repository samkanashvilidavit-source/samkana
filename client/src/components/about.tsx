import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SECTIONS } from "@/lib/constants";
import type { CafeInfo } from "@shared/schema";

export default function About() {
  const { data: cafeInfo, isLoading } = useQuery<CafeInfo>({
    queryKey: ['/api/cafe-info'],
  });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cafe" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-accent mb-8">
              {SECTIONS.about.title}
            </h2>
            <div className="w-16 h-1 bg-secondary mb-8"></div>
            
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-10 w-48 mt-8" />
              </div>
            ) : (
              <>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Chococu-ში ჩვენ ვაერთიანებთ ყოველდღიურ კომფორტს და ინდულგენტობის სიამოვნებას. 
                  თბილისის ისტორიულ ცენტრში მდებარე ჩვენი კაფე გთავაზობთ ხელნაკეთი სანდვიჩებისა 
                  და სალათების უნიკალურ არჩევანს.
                </p>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {cafeInfo?.descriptionKa || SECTIONS.about.description}
                </p>
                
                <Button 
                  onClick={scrollToContact}
                  className="bg-primary hover:bg-accent text-primary-foreground px-8 py-4 rounded-full font-inter font-semibold text-lg transition-colors"
                  size="lg"
                >
                  დაგვიკავშირდით დღესვე!
                </Button>
              </>
            )}
          </div>
          
          <div className="grid gap-6">
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="კაფეს ინტერიერი" 
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
            
            <div className="grid grid-cols-2 gap-6">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="შოკოლადის კოლექცია" 
                className="rounded-xl shadow-lg w-full h-40 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="შოკოლადის დამზადება" 
                className="rounded-xl shadow-lg w-full h-40 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
