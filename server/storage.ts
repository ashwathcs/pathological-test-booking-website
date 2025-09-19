import {
  users,
  tests,
  orders,
  pincodes,
  testCategories,
  addresses,
  technicians,
  timeSlots,
  orderItems,
  payments,
  reports,
  notifications,
  type User,
  type UpsertUser,
  type Test,
  type InsertTest,
  type Order,
  type InsertOrder,
  type Pincode,
  type InsertPincode,
  type TestCategory,
  type InsertTestCategory,
  type Address,
  type InsertAddress,
  type Technician,
  type InsertTechnician,
  type TimeSlot,
  type InsertTimeSlot,
  type OrderItem,
  type InsertOrderItem,
  type Payment,
  type InsertPayment,
  type Report,
  type InsertReport,
  type Notification,
  type InsertNotification,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, like, gte, lte, sql, inArray } from "drizzle-orm";
import { randomUUID } from "crypto";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Pincode operations
  getPincode(pincode: string): Promise<Pincode | undefined>;
  checkServiceability(pincode: string): Promise<boolean>;
  getAllPincodes(): Promise<Pincode[]>;
  createPincode(pincode: InsertPincode): Promise<Pincode>;
  
  // Test Category operations
  getAllCategories(): Promise<TestCategory[]>;
  getCategory(id: string): Promise<TestCategory | undefined>;
  createCategory(category: InsertTestCategory): Promise<TestCategory>;
  updateCategory(id: string, updates: Partial<TestCategory>): Promise<TestCategory>;
  
  // Test operations
  getAllTests(): Promise<Test[]>;
  getTest(id: string): Promise<Test | undefined>;
  getTestsByCategory(categoryId: string): Promise<Test[]>;
  searchTests(query: string): Promise<Test[]>;
  createTest(test: InsertTest): Promise<Test>;
  updateTest(id: string, updates: Partial<Test>): Promise<Test>;
  
  // Address operations
  getUserAddresses(userId: string): Promise<Address[]>;
  getAddress(id: string): Promise<Address | undefined>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: string, updates: Partial<Address>): Promise<Address>;
  setDefaultAddress(userId: string, addressId: string): Promise<Address>;
  
  // Technician operations
  getAllTechnicians(): Promise<Technician[]>;
  getTechnician(id: string): Promise<Technician | undefined>;
  getTechniciansByPincode(pincode: string): Promise<Technician[]>;
  getAvailableTechnicians(date: Date, pincode: string): Promise<Technician[]>;
  createTechnician(technician: InsertTechnician): Promise<Technician>;
  updateTechnician(id: string, updates: Partial<Technician>): Promise<Technician>;
  
  // Time slot operations
  getAllTimeSlots(): Promise<TimeSlot[]>;
  getAvailableSlots(date: Date, pincode: string): Promise<TimeSlot[]>;
  createTimeSlot(slot: InsertTimeSlot): Promise<TimeSlot>;
  
  // Order operations
  getAllOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  getUserOrders(userId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order>;
  getOrdersByStatus(status: string): Promise<Order[]>;
  getOrdersByTechnician(technicianId: string): Promise<Order[]>;
  generateOrderNumber(): Promise<string>;
  
  // Order Item operations
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  
  // Payment operations
  getPayment(id: string): Promise<Payment | undefined>;
  getOrderPayments(orderId: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, updates: Partial<Payment>): Promise<Payment>;
  
  // Report operations
  getAllReports(): Promise<Report[]>;
  getReport(id: string): Promise<Report | undefined>;
  getOrderReports(orderId: string): Promise<Report[]>;
  getUserReports(userId: string): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  updateReport(id: string, updates: Partial<Report>): Promise<Report>;
  
  // Notification operations
  getUserNotifications(userId: string): Promise<Notification[]>;
  getUnreadNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: string): Promise<Notification>;
  markAllNotificationsRead(userId: string): Promise<void>;
  
  // Analytics operations
  getDashboardStats(): Promise<any>;
  getOrderAnalytics(startDate: Date, endDate: Date): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Pincode operations
  async getPincode(pincode: string): Promise<Pincode | undefined> {
    try {
      const [result] = await db.select().from(pincodes).where(eq(pincodes.pincode, pincode));
      return result;
    } catch (error) {
      // Return undefined if table doesn't exist yet
      return undefined;
    }
  }

  async checkServiceability(pincode: string): Promise<boolean> {
    try {
      const result = await this.getPincode(pincode);
      return result?.isServiceable ?? false;
    } catch (error) {
      // Default to false if table doesn't exist
      return false;
    }
  }

  async getAllPincodes(): Promise<Pincode[]> {
    try {
      return await db.select().from(pincodes);
    } catch (error) {
      return [];
    }
  }

  async createPincode(pincodeData: InsertPincode): Promise<Pincode> {
    const id = randomUUID();
    const [pincode] = await db
      .insert(pincodes)
      .values({ ...pincodeData, id })
      .returning();
    return pincode;
  }

  // Test Category operations
  async getAllCategories(): Promise<TestCategory[]> {
    try {
      return await db.select().from(testCategories).orderBy(asc(testCategories.sortOrder));
    } catch (error) {
      return [];
    }
  }

  async getCategory(id: string): Promise<TestCategory | undefined> {
    try {
      const [category] = await db.select().from(testCategories).where(eq(testCategories.id, id));
      return category;
    } catch (error) {
      return undefined;
    }
  }

  async createCategory(categoryData: InsertTestCategory): Promise<TestCategory> {
    const id = randomUUID();
    const [category] = await db
      .insert(testCategories)
      .values({ ...categoryData, id })
      .returning();
    return category;
  }

  async updateCategory(id: string, updates: Partial<TestCategory>): Promise<TestCategory> {
    const [category] = await db
      .update(testCategories)
      .set(updates)
      .where(eq(testCategories.id, id))
      .returning();
    return category;
  }

  // Test operations
  async getAllTests(): Promise<Test[]> {
    return await db.select().from(tests);
  }

  async getTest(id: string): Promise<Test | undefined> {
    const [test] = await db.select().from(tests).where(eq(tests.id, id));
    return test;
  }

  async getTestsByCategory(categoryId: string): Promise<Test[]> {
    try {
      return await db.select().from(tests).where(eq(tests.categoryId, categoryId));
    } catch (error) {
      // Fallback for old schema
      return await db.select().from(tests);
    }
  }

  async searchTests(query: string): Promise<Test[]> {
    return await db
      .select()
      .from(tests)
      .where(like(tests.name, `%${query}%`));
  }

  async createTest(testData: InsertTest): Promise<Test> {
    const id = randomUUID();
    const [test] = await db
      .insert(tests)
      .values({ ...testData, id })
      .returning();
    return test;
  }

  async updateTest(id: string, updates: Partial<Test>): Promise<Test> {
    const [test] = await db
      .update(tests)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(tests.id, id))
      .returning();
    return test;
  }

  // Address operations
  async getUserAddresses(userId: string): Promise<Address[]> {
    try {
      return await db.select().from(addresses).where(eq(addresses.userId, userId));
    } catch (error) {
      return [];
    }
  }

  async getAddress(id: string): Promise<Address | undefined> {
    try {
      const [address] = await db.select().from(addresses).where(eq(addresses.id, id));
      return address;
    } catch (error) {
      return undefined;
    }
  }

  async createAddress(addressData: InsertAddress): Promise<Address> {
    const id = randomUUID();
    const [address] = await db
      .insert(addresses)
      .values({ ...addressData, id })
      .returning();
    return address;
  }

  async updateAddress(id: string, updates: Partial<Address>): Promise<Address> {
    const [address] = await db
      .update(addresses)
      .set(updates)
      .where(eq(addresses.id, id))
      .returning();
    return address;
  }

  async setDefaultAddress(userId: string, addressId: string): Promise<Address> {
    // First, unset all default addresses for the user
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(eq(addresses.userId, userId));
    
    // Then set the specified address as default
    const [address] = await db
      .update(addresses)
      .set({ isDefault: true })
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
      .returning();
    return address;
  }

  // Technician operations
  async getAllTechnicians(): Promise<Technician[]> {
    try {
      return await db.select().from(technicians).where(eq(technicians.isActive, true));
    } catch (error) {
      return [];
    }
  }

  async getTechnician(id: string): Promise<Technician | undefined> {
    try {
      const [technician] = await db.select().from(technicians).where(eq(technicians.id, id));
      return technician;
    } catch (error) {
      return undefined;
    }
  }

  async getTechniciansByPincode(pincode: string): Promise<Technician[]> {
    try {
      return await db
        .select()
        .from(technicians)
        .where(
          and(
            eq(technicians.isActive, true),
            sql`${pincode} = ANY(${technicians.pincodes})`
          )
        );
    } catch (error) {
      return [];
    }
  }

  async getAvailableTechnicians(date: Date, pincode: string): Promise<Technician[]> {
    try {
      // Get technicians who service the pincode and are not at capacity
      return await db
        .select()
        .from(technicians)
        .where(
          and(
            eq(technicians.isActive, true),
            sql`${pincode} = ANY(${technicians.pincodes})`,
            sql`${technicians.currentOrders} < ${technicians.maxOrdersPerDay}`
          )
        );
    } catch (error) {
      return [];
    }
  }

  async createTechnician(technicianData: InsertTechnician): Promise<Technician> {
    const id = randomUUID();
    const [technician] = await db
      .insert(technicians)
      .values({ ...technicianData, id })
      .returning();
    return technician;
  }

  async updateTechnician(id: string, updates: Partial<Technician>): Promise<Technician> {
    const [technician] = await db
      .update(technicians)
      .set(updates)
      .where(eq(technicians.id, id))
      .returning();
    return technician;
  }

  // Time slot operations
  async getAllTimeSlots(): Promise<TimeSlot[]> {
    try {
      return await db.select().from(timeSlots).where(eq(timeSlots.isActive, true));
    } catch (error) {
      return [];
    }
  }

  async getAvailableSlots(date: Date, pincode: string): Promise<TimeSlot[]> {
    try {
      // For now, return all active slots
      // In a real implementation, you'd check availability based on existing bookings
      return await this.getAllTimeSlots();
    } catch (error) {
      return [];
    }
  }

  async createTimeSlot(slotData: InsertTimeSlot): Promise<TimeSlot> {
    const id = randomUUID();
    const [slot] = await db
      .insert(timeSlots)
      .values({ ...slotData, id })
      .returning();
    return slot;
  }

  // Order operations
  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    try {
      const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
      return order;
    } catch (error) {
      return undefined;
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async createOrder(orderData: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderNumber = await this.generateOrderNumber();
    const [order] = await db
      .insert(orders)
      .values({ 
        ...orderData, 
        id,
        orderNumber: orderNumber || `ORD${Date.now()}` // Fallback if new field doesn't exist
      })
      .returning();
    return order;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const [order] = await db
      .update(orders)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return order;
  }

  async getOrdersByStatus(status: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.status, status)).orderBy(desc(orders.createdAt));
  }

  async getOrdersByTechnician(technicianId: string): Promise<Order[]> {
    try {
      return await db.select().from(orders).where(eq(orders.technicianId, technicianId)).orderBy(desc(orders.createdAt));
    } catch (error) {
      return [];
    }
  }

  async generateOrderNumber(): Promise<string> {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `ORD${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${timestamp}`;
  }

  // Order Item operations
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    try {
      return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
    } catch (error) {
      return [];
    }
  }

  async createOrderItem(itemData: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const [item] = await db
      .insert(orderItems)
      .values({ ...itemData, id })
      .returning();
    return item;
  }

  // Payment operations
  async getPayment(id: string): Promise<Payment | undefined> {
    try {
      const [payment] = await db.select().from(payments).where(eq(payments.id, id));
      return payment;
    } catch (error) {
      return undefined;
    }
  }

  async getOrderPayments(orderId: string): Promise<Payment[]> {
    try {
      return await db.select().from(payments).where(eq(payments.orderId, orderId));
    } catch (error) {
      return [];
    }
  }

  async createPayment(paymentData: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const [payment] = await db
      .insert(payments)
      .values({ ...paymentData, id })
      .returning();
    return payment;
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
    const [payment] = await db
      .update(payments)
      .set(updates)
      .where(eq(payments.id, id))
      .returning();
    return payment;
  }

  // Report operations
  async getAllReports(): Promise<Report[]> {
    try {
      return await db.select().from(reports).orderBy(desc(reports.createdAt));
    } catch (error) {
      return [];
    }
  }

  async getReport(id: string): Promise<Report | undefined> {
    try {
      const [report] = await db.select().from(reports).where(eq(reports.id, id));
      return report;
    } catch (error) {
      return undefined;
    }
  }

  async getOrderReports(orderId: string): Promise<Report[]> {
    try {
      return await db.select().from(reports).where(eq(reports.orderId, orderId));
    } catch (error) {
      return [];
    }
  }

  async getUserReports(userId: string): Promise<Report[]> {
    try {
      // Join with orders to get user reports
      return await db
        .select({ 
          id: reports.id,
          orderId: reports.orderId,
          testId: reports.testId,
          patientName: reports.patientName,
          testName: reports.testName,
          result: reports.result,
          normalRange: reports.normalRange,
          unit: reports.unit,
          status: reports.status,
          remarks: reports.remarks,
          verifiedBy: reports.verifiedBy,
          reportUrl: reports.reportUrl,
          verifiedAt: reports.verifiedAt,
          createdAt: reports.createdAt
        })
        .from(reports)
        .innerJoin(orders, eq(reports.orderId, orders.id))
        .where(eq(orders.userId, userId))
        .orderBy(desc(reports.createdAt));
    } catch (error) {
      return [];
    }
  }

  async createReport(reportData: InsertReport): Promise<Report> {
    const id = randomUUID();
    const [report] = await db
      .insert(reports)
      .values({ ...reportData, id })
      .returning();
    return report;
  }

  async updateReport(id: string, updates: Partial<Report>): Promise<Report> {
    const [report] = await db
      .update(reports)
      .set(updates)
      .where(eq(reports.id, id))
      .returning();
    return report;
  }

  // Notification operations
  async getUserNotifications(userId: string): Promise<Notification[]> {
    try {
      return await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, userId))
        .orderBy(desc(notifications.createdAt));
    } catch (error) {
      return [];
    }
  }

  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    try {
      return await db
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.userId, userId),
            eq(notifications.isRead, false)
          )
        )
        .orderBy(desc(notifications.createdAt));
    } catch (error) {
      return [];
    }
  }

  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const [notification] = await db
      .insert(notifications)
      .values({ ...notificationData, id })
      .returning();
    return notification;
  }

  async markNotificationRead(id: string): Promise<Notification> {
    const [notification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return notification;
  }

  async markAllNotificationsRead(userId: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, userId));
  }

  // Analytics operations
  async getDashboardStats(): Promise<any> {
    try {
      // Get basic stats from existing tables
      const [orderCount] = await db.select({ count: sql<number>`count(*)` }).from(orders);
      const [testCount] = await db.select({ count: sql<number>`count(*)` }).from(tests);
      const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);

      return {
        totalOrders: orderCount?.count || 0,
        totalTests: testCount?.count || 0,
        totalUsers: userCount?.count || 0,
        todayOrders: 0, // Calculate based on today's date
        revenue: 0, // Calculate from payments table when available
        activeTechnicians: 0, // Calculate from technicians table when available
      };
    } catch (error) {
      // Return mock stats if database queries fail
      return {
        totalOrders: 0,
        totalTests: 0,
        totalUsers: 0,
        todayOrders: 0,
        revenue: 0,
        activeTechnicians: 0,
      };
    }
  }

  async getOrderAnalytics(startDate: Date, endDate: Date): Promise<any> {
    try {
      const ordersInRange = await db
        .select()
        .from(orders)
        .where(
          and(
            gte(orders.createdAt, startDate),
            lte(orders.createdAt, endDate)
          )
        );

      return {
        totalOrders: ordersInRange.length,
        ordersByStatus: {}, // Group by status
        dailyOrders: [], // Group by day
        revenue: 0, // Calculate total revenue
      };
    } catch (error) {
      return {
        totalOrders: 0,
        ordersByStatus: {},
        dailyOrders: [],
        revenue: 0,
      };
    }
  }
}

export const storage = new DatabaseStorage();