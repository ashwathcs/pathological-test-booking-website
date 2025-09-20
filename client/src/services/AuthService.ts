// Authentication service with mock data
import { User, LoginCredentials, RegisterData, AuthState } from '@/models';
import { mockUsers } from './mockData';

class AuthService {
  private currentUser: User | null = null;
  private isAuthenticated = false;
  private authStateListeners: ((state: AuthState) => void)[] = [];

  constructor() {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        this.isAuthenticated = true;
      } catch {
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Subscribe to auth state changes
  subscribe(listener: (state: AuthState) => void) {
    this.authStateListeners.push(listener);
    return () => {
      this.authStateListeners = this.authStateListeners.filter(l => l !== listener);
    };
  }

  private notifyStateChange() {
    const state: AuthState = {
      user: this.currentUser,
      isAuthenticated: this.isAuthenticated,
      isLoading: false
    };
    this.authStateListeners.forEach(listener => listener(state));
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user by email
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Simple password validation (in real app, this would be hashed)
    if (credentials.password !== 'password123') {
      return { success: false, error: 'Invalid password' };
    }

    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated' };
    }

    this.currentUser = user;
    this.isAuthenticated = true;
    
    // Persist to localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    this.notifyStateChange();
    
    return { success: true };
  }

  async logout(): Promise<{ success: boolean }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    this.currentUser = null;
    this.isAuthenticated = false;
    
    // Clear from localStorage
    localStorage.removeItem('currentUser');
    
    this.notifyStateChange();
    
    return { success: true };
  }

  async register(data: RegisterData): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      return { success: false, error: 'User already exists with this email' };
    }

    // Create new user (in real app, this would be saved to database)
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: 'customer',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to mock users array
    mockUsers.push(newUser);

    this.currentUser = newUser;
    this.isAuthenticated = true;
    
    // Persist to localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    this.notifyStateChange();
    
    return { success: true };
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getAuthState(): AuthState {
    return {
      user: this.currentUser,
      isAuthenticated: this.isAuthenticated,
      isLoading: false
    };
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  hasRole(role: 'customer' | 'staff' | 'admin'): boolean {
    return this.currentUser?.role === role;
  }

  hasAnyRole(roles: ('customer' | 'staff' | 'admin')[]): boolean {
    return this.currentUser ? roles.includes(this.currentUser.role) : false;
  }

  async refreshUser(): Promise<User | null> {
    // In real app, this would fetch latest user data from server
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (this.currentUser) {
      // Update user data (simulate getting fresh data)
      this.currentUser.updatedAt = new Date();
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.notifyStateChange();
    }
    
    return this.currentUser;
  }
}

// Export singleton instance
export const authService = new AuthService();
export { AuthService };