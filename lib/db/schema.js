import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 30 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  body: text("body"),
  content: text("content").notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  stat: varchar("stat", { length: 255 }).notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const supporters = pgTable("supporters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  image: text("image").notNull(),
  active: boolean("active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workGallery = pgTable("work_gallery", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  location: varchar("location", { length: 255 }),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const impactStats = pgTable("impact_stats", {
  id: serial("id").primaryKey(),
  value: varchar("value", { length: 100 }).notNull(),
  label: varchar("label", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 100 }).notNull().unique(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  frequency: varchar("frequency", { length: 20 }).default("once").notNull(),
  donorFirstName: varchar("donor_first_name", { length: 100 }).notNull(),
  donorLastName: varchar("donor_last_name", { length: 100 }).notNull(),
  donorEmail: varchar("donor_email", { length: 255 }).notNull(),
  donorPhone: varchar("donor_phone", { length: 30 }),
  status: varchar("status", { length: 30 }).default("initialized").notNull(),
  gatewayResponse: text("gateway_response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
