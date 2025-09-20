// Common domain models and shared interfaces

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  data?: Record<string, any>;
  createdAt: Date;
  readAt?: Date;
}

export type NotificationType = 
  | 'order_confirmed'
  | 'sample_collected'
  | 'report_ready'
  | 'payment_received'
  | 'appointment_reminder'
  | 'system_update'
  | 'promotional';

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  isServiceable: boolean;
  estimatedDelivery?: number; // days
  collectionCharges?: number;
}

export interface ServiceArea {
  pincode: string;
  city: string;
  state: string;
  isActive: boolean;
  collectionCharges: number;
  estimatedDelivery: number;
}

// Utility types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// Error handling
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// State management
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  lastUpdated?: Date;
}

export interface CacheState<T> extends LoadingState {
  data?: T;
  lastFetched?: Date;
  isStale: boolean;
}