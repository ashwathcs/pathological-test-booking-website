// User domain models and interfaces

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImageUrl?: string;
  role: 'customer' | 'staff' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  addresses: Address[];
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy: {
    shareData: boolean;
    marketingEmails: boolean;
  };
  theme: 'light' | 'dark' | 'system';
}

export interface Address {
  id: string;
  userId: string;
  type: 'home' | 'work' | 'other';
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  phone?: string;
}