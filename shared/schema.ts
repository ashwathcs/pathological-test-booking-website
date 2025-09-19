import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: text("role").default('customer'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Pincode serviceability table
export const pincodes = pgTable("pincodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pincode: varchar("pincode", { length: 6 }).notNull().unique(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  isServiceable: boolean("is_serviceable").default(true),
  deliveryTime: text("delivery_time").default("24-48 hours"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Test categories table
export const testCategories = pgTable("test_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Tests table (enhanced)
export const tests = pgTable("tests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal("discount_price", { precision: 10, scale: 2 }),
  categoryId: varchar("category_id").references(() => testCategories.id),
  preparationTime: text("preparation_time"),
  sampleType: text("sample_type").notNull(),
  reportDeliveryTime: text("report_delivery_time").default("24-48 hours"),
  fastingRequired: boolean("fasting_required").default(false),
  isActive: boolean("is_active").default(true),
  instructions: text("instructions"),
  normalRange: text("normal_range"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User addresses table
export const addresses = pgTable("addresses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  type: text("type").default("home"), // home, office, other
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  landmark: text("landmark"),
  pincode: varchar("pincode", { length: 6 }).notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Technicians table
export const technicians = pgTable("technicians", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  licenseNumber: text("license_number"),
  experience: integer("experience"), // years
  pincodes: text("pincodes").array(), // serviceable pincodes
  isActive: boolean("is_active").default(true),
  currentOrders: integer("current_orders").default(0),
  maxOrdersPerDay: integer("max_orders_per_day").default(8),
  createdAt: timestamp("created_at").defaultNow(),
});

// Time slots table
export const timeSlots = pgTable("time_slots", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slot: text("slot").notNull(), // "9:00 AM - 10:00 AM"
  startTime: text("start_time").notNull(), // "09:00"
  endTime: text("end_time").notNull(), // "10:00"
  maxCapacity: integer("max_capacity").default(5),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Orders table (enhanced)
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  userId: varchar("user_id").references(() => users.id),
  patientName: text("patient_name").notNull(),
  patientAge: integer("patient_age"),
  patientGender: text("patient_gender"),
  phone: text("phone").notNull(),
  email: text("email"),
  addressId: varchar("address_id").references(() => addresses.id),
  selectedDate: timestamp("selected_date"),
  selectedTimeSlot: text("selected_time_slot"),
  technicianId: varchar("technician_id").references(() => technicians.id),
  specialInstructions: text("special_instructions"),
  status: text("status").default('pending'), // pending, confirmed, collected, processing, completed, cancelled
  trackingId: text("tracking_id"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }).default('0'),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method"), // prepaid, postpaid
  paymentStatus: text("payment_status").default('pending'), // pending, paid, failed, refunded
  collectionDate: timestamp("collection_date"),
  reportDate: timestamp("report_date"),
  estimatedDelivery: timestamp("estimated_delivery"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Order items (many-to-many between orders and tests)
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id),
  testId: varchar("test_id").references(() => tests.id),
  quantity: integer("quantity").default(1),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal("discount_price", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payments table
export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id),
  paymentId: text("payment_id"), // external payment gateway ID
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default('INR'),
  method: text("method"), // card, upi, wallet, netbanking, cash
  status: text("status").default('pending'), // pending, success, failed, refunded
  gatewayResponse: jsonb("gateway_response"),
  transactionId: text("transaction_id"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reports table
export const reports = pgTable("reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").references(() => orders.id),
  testId: varchar("test_id").references(() => tests.id),
  patientName: text("patient_name").notNull(),
  testName: text("test_name").notNull(),
  result: text("result"),
  normalRange: text("normal_range"),
  unit: text("unit"),
  status: text("status").default('pending'), // pending, completed, verified
  remarks: text("remarks"),
  verifiedBy: text("verified_by"),
  reportUrl: text("report_url"), // PDF download link
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  orderId: varchar("order_id").references(() => orders.id),
  type: text("type").notNull(), // order_confirmed, sample_collected, report_ready, reminder
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  sentAt: timestamp("sent_at"),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Export types
export type Test = typeof tests.$inferSelect;
export type InsertTest = typeof tests.$inferInsert;
export type TestCategory = typeof testCategories.$inferSelect;
export type InsertTestCategory = typeof testCategories.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;
export type Address = typeof addresses.$inferSelect;
export type InsertAddress = typeof addresses.$inferInsert;
export type Technician = typeof technicians.$inferSelect;
export type InsertTechnician = typeof technicians.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
export type Pincode = typeof pincodes.$inferSelect;
export type InsertPincode = typeof pincodes.$inferInsert;
export type TimeSlot = typeof timeSlots.$inferSelect;
export type InsertTimeSlot = typeof timeSlots.$inferInsert;

// Zod schemas
export const insertOrderSchema = createInsertSchema(orders);
export const insertTestSchema = createInsertSchema(tests);
export const insertOrderItemSchema = createInsertSchema(orderItems);
export const insertAddressSchema = createInsertSchema(addresses);
export const insertPaymentSchema = createInsertSchema(payments);
export const insertReportSchema = createInsertSchema(reports);
export const insertNotificationSchema = createInsertSchema(notifications);
export const insertPincodeSchema = createInsertSchema(pincodes);
export const insertTimeSlotSchema = createInsertSchema(timeSlots);
export const insertTechnicianSchema = createInsertSchema(technicians);
export const insertTestCategorySchema = createInsertSchema(testCategories);