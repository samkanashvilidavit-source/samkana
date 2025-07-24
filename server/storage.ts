import { products, contactInquiries, cafeInfo, type Product, type InsertProduct, type ContactInquiry, type InsertContactInquiry, type CafeInfo, type InsertCafeInfo } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Contact Inquiries
  getContactInquiries(): Promise<ContactInquiry[]>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  
  // Cafe Info
  getCafeInfo(): Promise<CafeInfo | undefined>;
  createCafeInfo(info: InsertCafeInfo): Promise<CafeInfo>;
  updateCafeInfo(id: number, info: Partial<InsertCafeInfo>): Promise<CafeInfo | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private contactInquiries: Map<number, ContactInquiry>;
  private cafeInfo: CafeInfo | undefined;
  private currentProductId: number;
  private currentInquiryId: number;

  constructor() {
    this.products = new Map();
    this.contactInquiries = new Map();
    this.currentProductId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize products
    const initialProducts: InsertProduct[] = [
      {
        name: "Chocolate Bouquets",
        nameKa: "შოკოლადის ბუკეტები",
        description: "Handcrafted chocolate bouquets for special moments",
        descriptionKa: "განსაკუთრებული წამებისთვის შექმნილი ხელნაკეთი შოკოლადის ბუკეტები",
        price: 4500, // 45 GEL
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "bouquets"
      },
      {
        name: "Custom Chocolate",
        nameKa: "პერსონალიზებული შოკოლადი", 
        description: "Personalized chocolate with custom text engraving",
        descriptionKa: "თქვენი სურვილისამებრ შექმნილი უნიკალური შოკოლადი ინდივიდუალური წარწერით",
        price: 2500, // 25 GEL
        imageUrl: "https://images.unsplash.com/photo-1511381939415-e44015466834?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "custom"
      },
      {
        name: "Chocolate Palettes",
        nameKa: "შოკოლადის პალეტები",
        description: "Tasting collections of various chocolate flavors and textures",
        descriptionKa: "სხვადასხვა გემოვნების და ტექსტურის შოკოლადების დეგუსტაციური ნაკრები",
        price: 6000, // 60 GEL
        imageUrl: "https://images.unsplash.com/photo-1511081692775-05d0f180a065?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "palettes"
      },
      {
        name: "Georgian Coffee",
        nameKa: "ქართული ყავა",
        description: "Unique coffee from Georgian highland beans",
        descriptionKa: "ქართული მთიანეთის უნიკალური ყავის მარცვლისგან მომზადებული ზღვისპირული ყავა",
        price: 800, // 8 GEL
        imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "coffee"
      },
      {
        name: "Traditional Pastries",
        nameKa: "ტრადიციული ნამცხვრები",
        description: "Georgian traditional sweets and pastries",
        descriptionKa: "ძველი ქართული რეცეპტების მიხედვით გამომცხვარი ნამცხვრები და ტკბილეული",
        price: 1200, // 12 GEL
        imageUrl: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "pastries"
      },
      {
        name: "Chocolate Making Classes",
        nameKa: "ოსტატობის კლასები",
        description: "Learn the art of chocolate making with experienced masters",
        descriptionKa: "ისწავლეთ შოკოლადის დამზადების ხელოვნება ჩვენი გამოცდილი ოსტატებთან ერთად",
        price: 12000, // 120 GEL
        imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        category: "classes"
      }
    ];

    initialProducts.forEach(product => {
      this.createProduct(product);
    });

    // Initialize cafe info
    this.cafeInfo = {
      id: 1,
      name: "Chococu",
      nameKa: "ჩოკოკუ",
      address: "123 Rustaveli Avenue, Tbilisi 0108, Georgia",
      addressKa: "რუსთაველის გამზირი 123, თბილისი 0108, საქართველო",
      phone: "+995 322 12 34 56",
      email: "info@chococu.ge",
      hours: JSON.stringify({
        "Monday": "8:00 - 22:00",
        "Tuesday": "8:00 - 22:00", 
        "Wednesday": "8:00 - 22:00",
        "Thursday": "8:00 - 22:00",
        "Friday": "8:00 - 22:00",
        "Saturday": "9:00 - 23:00",
        "Sunday": "10:00 - 21:00"
      }),
      hoursKa: JSON.stringify({
        "ორშაბათი": "8:00 - 22:00",
        "სამშაბათი": "8:00 - 22:00",
        "ოთხშაბათი": "8:00 - 22:00", 
        "ხუთშაბათი": "8:00 - 22:00",
        "პარასკევი": "8:00 - 22:00",
        "შაბათი": "9:00 - 23:00",
        "კვირა": "10:00 - 21:00"
      }),
      description: "A perfect blend of Georgian traditions and European chocolate excellence in the heart of Tbilisi.",
      descriptionKa: "ქართული ტრადიციებისა და ევროპული შოკოლადის სრულყოფილი ნაზავი თბილისის გულში.",
      latitude: "41.6977",
      longitude: "44.8014"
    };
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: ContactInquiry = {
      ...insertInquiry,
      id,
      createdAt: new Date()
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async getCafeInfo(): Promise<CafeInfo | undefined> {
    return this.cafeInfo;
  }

  async createCafeInfo(info: InsertCafeInfo): Promise<CafeInfo> {
    const cafeInfo: CafeInfo = {
      ...info,
      id: 1
    };
    this.cafeInfo = cafeInfo;
    return cafeInfo;
  }

  async updateCafeInfo(id: number, info: Partial<InsertCafeInfo>): Promise<CafeInfo | undefined> {
    if (this.cafeInfo && this.cafeInfo.id === id) {
      this.cafeInfo = { ...this.cafeInfo, ...info };
      return this.cafeInfo;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
