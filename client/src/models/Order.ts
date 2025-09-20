// Order domain models and interfaces

export interface Order {
  id: string;
  userId: string;
  trackingId: string;
  status: OrderStatus;
  tests: OrderTest[];
  patient: PatientInfo;
  address: OrderAddress;
  appointment: AppointmentInfo;
  payment: PaymentInfo;
  pricing: OrderPricing;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderTest {
  testId: string;
  testName: string;
  price: number;
  discountedPrice?: number;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email?: string;
}

export interface OrderAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface AppointmentInfo {
  date: Date;
  timeSlot: TimeSlot;
  technicianId?: string;
  technicianName?: string;
  technicianPhone?: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  displayText: string; // e.g., "07:00 - 09:00 AM"
}

export interface PaymentInfo {
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  transactionId?: string;
  gateway?: string;
  paidAt?: Date;
}

export interface OrderPricing {
  testsTotal: number;
  discount: number;
  collectionCharges: number;
  total: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'sample_collected'
  | 'processing'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'online' | 'cash_on_collection';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
  message?: string;
  updatedBy?: string;
  timestamp: Date;
}

export interface CreateOrderRequest {
  tests: { testId: string }[];
  patient: PatientInfo;
  address: OrderAddress;
  appointment: {
    date: Date;
    timeSlotId: string;
  };
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
}