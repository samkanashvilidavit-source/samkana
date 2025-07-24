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
            <h2 className="text-4xl md:text-5xl font-dm-serif font-bold text-white mb-4">
              {SECTIONS.contact.title}
            </h2>
            <p className="text-neutral text-lg max-w-2xl mx-auto">
              {SECTIONS.contact.description}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="shadow-2xl order-1 lg:order-1">
              <CardContent className="p-8">
                <h3 className="text-2xl font-dm-serif font-bold text-accent mb-6">
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
                      className="w-full bg-primary hover:bg-accent text-primary-foreground py-4 font-dm-serif font-semibold text-lg"
                      size="lg"
                    >
                      {contactMutation.isPending ? "იგზავნება..." : "გაგზავნა"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="order-2 lg:order-2">
              <Card className="bg-accent/90 backdrop-blur-sm border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-dm-serif font-bold text-white mb-8 text-center">
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
                    <div className="space-y-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-dm-serif font-semibold text-white mb-2">მისამართი</h4>
                          <p className="text-neutral leading-relaxed">
                            {cafeInfo?.addressKa || "რუსთაველის გამზირი 123, თბილისი 0108, საქართველო"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-dm-serif font-semibold text-white mb-2">ელ. ფოსტა</h4>
                          <p className="text-neutral">{cafeInfo?.email || "info@chococu.ge"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-dm-serif font-semibold text-white mb-2">ტელეფონი</h4>
                          <p className="text-neutral">{cafeInfo?.phone || "+995 322 12 34 56"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-dm-serif font-semibold text-white mb-2">სამუშაო საათები</h4>
                          <div className="text-neutral space-y-1">
                            {cafeInfo?.hoursKa ? (
                              Object.entries(parseHours(cafeInfo.hoursKa)).map(([day, hours]) => (
                                <p key={day} className="leading-relaxed">{day}: {hours as string}</p>
                              ))
                            ) : (
                              <>
                                <p className="leading-relaxed">ორშაბათი: 8:00 - 22:00</p>
                                <p className="leading-relaxed">სამშაბათი: 8:00 - 22:00</p>
                                <p className="leading-relaxed">ოთხშაბათი: 8:00 - 22:00</p>
                                <p className="leading-relaxed">ხუთშაბათი: 8:00 - 22:00</p>
                                <p className="leading-relaxed">პარასკევი: 8:00 - 22:00</p>
                                <p className="leading-relaxed">შაბათი: 9:00 - 23:00</p>
                                <p className="leading-relaxed">კვირა: 10:00 - 21:00</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="w-full h-96 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.3176777771397!2d44.79886!3d41.69773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61d084ede2576ea3!2sRustaveli%20Avenue%2C%20Tbilisi%2C%20Georgia!5e0!3m2!1sen!2sge!4v1647834567890!5m2!1sen!2sge"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Chococu Location Map"
            className="w-full h-full"
          />
          
          {/* Glass overlay with location info */}
          <div className="absolute top-6 left-6 glass-card rounded-xl p-4 max-w-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="text-white w-4 h-4" />
              </div>
              <h4 className="font-inter font-bold text-accent">Chococu</h4>
            </div>
            <p className="text-muted-foreground text-sm">
              რუსთაველის გამზირი 123<br />
              თბილისი 0108, საქართველო
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
