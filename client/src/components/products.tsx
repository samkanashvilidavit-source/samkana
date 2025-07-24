import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SECTIONS } from "@/lib/constants";
import type { Product } from "@shared/schema";

export default function Products() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatPrice = (price: number) => {
    return `₾${(price / 100).toFixed(0)}-დან`;
  };

  if (error) {
    return (
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-500 text-lg">პროდუქტების ჩატვირთვა ვერ მოხერხდა</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-inter font-bold text-accent mb-4">
            {SECTIONS.products.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {SECTIONS.products.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-64" />
                <CardContent className="p-8">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-10 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            products?.map((product) => (
              <Card 
                key={product.id} 
                className="bg-gradient-warm rounded-2xl shadow-lg overflow-hidden hover-scale group"
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.nameKa}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <CardContent className="p-8">
                  <h3 className="text-2xl font-inter font-bold text-accent mb-3">
                    {product.nameKa}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {product.descriptionKa}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-xl">
                      {formatPrice(product.price)}
                    </span>
                    <Button 
                      onClick={scrollToContact}
                      className="bg-primary text-primary-foreground hover:bg-accent transition-colors"
                    >
                      შეკვეთა
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
