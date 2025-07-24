import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Mail, Phone, Clock, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactInquirySchema } from "@shared/schema";
import { SECTIONS } from "@/lib/constants";
import type { CafeInfo } from "@shared/schema";

const contactFormSchema = insertContactInquirySchema.extend({
  type: z.string().default('general')
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const { data: cafeInfo, isLoading: cafeInfoLoading } = useQuery<CafeInfo>({
    queryKey: ['/api/cafe-info'],
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      type: "general"
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "შეტყობინება გაგზავნილია",
        description: "მადლობთ! ჩვენ მალე დაგიკავშირდებით.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "შეცდომა",
        description: "შეტყობინების გაგზავნა ვერ მოხერხდა. გთხოვთ სცადოთ თავიდან.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const parseHours = (hoursJson: string) => {
    try {
      return JSON.parse(hoursJson);
    } catch {
      return {};
    }
  };

  return (
    <>
      <section id="contact" className="py-20 bg-gradient-choco">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-inter font-bold text-white mb-4">
              {SECTIONS.contact.title}
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              {SECTIONS.contact.description}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-inter font-bold text-accent mb-6">
                  შეკითხვები და შეკვეთები
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>სახელი *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="თქვენი სახელი" 
                              {...field} 
                              className="focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ელ. ფოსტა *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="example@email.ge" 
                              {...field} 
                              className="focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ტელეფონი</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel"
                              placeholder="+995 XXX XXX XXX" 
                              {...field} 
                              className="focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>შეტყობინება *</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={5}
                              placeholder="მოგვწერეთ თქვენი შეკითხვა ან შეკვეთის დეტალები" 
                              {...field} 
                              className="focus:ring-2 focus:ring-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-primary hover:bg-accent text-primary-foreground py-4 font-inter font-semibold text-lg"
                      size="lg"
                    >
                      {contactMutation.isPending ? "იგზავნება..." : "გაგზავნა"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-inter font-bold text-white mb-6">
                    ჩვენი მისამართი
                  </h3>
                  
                  {cafeInfoLoading ? (
                    <div className="space-y-6">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-inter font-semibold text-white mb-1">მისამართი</h4>
                          <p className="text-neutral">
                            {cafeInfo?.addressKa || "რუსთაველის გამზირი 123\nთბილისი 0108, საქართველო"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-inter font-semibold text-white mb-1">ელ. ფოსტა</h4>
                          <p className="text-neutral">{cafeInfo?.email || "info@chococu.ge"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-inter font-semibold text-white mb-1">ტელეფონი</h4>
                          <p className="text-neutral">{cafeInfo?.phone || "+995 322 12 34 56"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-inter font-semibold text-white mb-1">სამუშაო საათები</h4>
                          <div className="text-neutral space-y-1">
                            {cafeInfo?.hoursKa ? (
                              Object.entries(parseHours(cafeInfo.hoursKa)).map(([day, hours]) => (
                                <p key={day}>{day}: {hours as string}</p>
                              ))
                            ) : (
                              <>
                                <p>ორშ - ხუთ: 8:00 - 22:00</p>
                                <p>შაბ: 9:00 - 23:00</p>
                                <p>კვი: 10:00 - 21:00</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Social Media Links */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-inter font-bold text-white mb-6">
                    გამოგვყევით
                  </h3>
                  <div className="flex space-x-4">
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-secondary hover:bg-white hover:text-primary rounded-full flex items-center justify-center transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-12 h-12 bg-secondary hover:bg-white hover:text-primary rounded-full flex items-center justify-center transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="w-full h-96 bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground font-inter">რუკა ითვირთება...</p>
              <p className="text-sm text-muted-foreground mt-2">Google Maps ინტეგრაცია</p>
            </div>
          </div>
          {/* Google Maps integration would go here */}
        </div>
      </section>
    </>
  );
}
