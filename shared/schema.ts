import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameKa: text("name_ka").notNull(),
  description: text("description").notNull(),
  descriptionKa: text("description_ka").notNull(),
  price: integer("price").notNull(), // price in tetri (Georgian currency subunit)
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // 'bouquets', 'custom', 'palettes', 'coffee', 'pastries', 'classes'
  available: boolean("available").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  type: text("type").notNull().default('general'), // 'general', 'order', 'event'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cafeInfo = pgTable("cafe_info", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameKa: text("name_ka").notNull(),
  address: text("address").notNull(),
  addressKa: text("address_ka").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  hours: text("hours").notNull(), // JSON string of operating hours
  hoursKa: text("hours_ka").notNull(),
  description: text("description").notNull(),
  descriptionKa: text("description_ka").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertContactInquirySchema = createInsertSchema(contactInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertCafeInfoSchema = createInsertSchema(cafeInfo).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertContactInquiry = z.infer<typeof insertContactInquirySchema>;
export type ContactInquiry = typeof contactInquiries.$inferSelect;

export type InsertCafeInfo = z.infer<typeof insertCafeInfoSchema>;
export type CafeInfo = typeof cafeInfo.$inferSelect;
