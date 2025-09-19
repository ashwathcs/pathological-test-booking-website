// API client for external backend services
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText || response.statusText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return response.text() as unknown as T;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`Unable to connect to backend service at ${this.baseUrl}. Please ensure the backend is running.`);
      }
      throw error;
    }
  }

  // Authentication
  async getCurrentUser() {
    return this.request('/api/auth/user');
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  // Pincode services
  async checkPincodeServiceability(pincode: string) {
    return this.request(`/api/pincodes/${pincode}/serviceability`);
  }

  async getAllPincodes() {
    return this.request('/api/pincodes');
  }

  // Test services
  async getAllTests() {
    return this.request('/api/tests');
  }

  async getTest(id: string) {
    return this.request(`/api/tests/${id}`);
  }

  async getTestCategories() {
    return this.request('/api/test-categories');
  }

  async searchTests(query: string) {
    return this.request(`/api/tests/search?q=${encodeURIComponent(query)}`);
  }

  // Order services
  async getUserOrders() {
    return this.request('/api/orders');
  }

  async getOrder(id: string) {
    return this.request(`/api/orders/${id}`);
  }

  async createOrder(orderData: any) {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/api/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async trackOrder(trackingId: string) {
    return this.request(`/api/orders/track/${trackingId}`);
  }

  // Address services
  async getUserAddresses() {
    return this.request('/api/addresses');
  }

  async createAddress(addressData: any) {
    return this.request('/api/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async updateAddress(id: string, addressData: any) {
    return this.request(`/api/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  }

  async setDefaultAddress(id: string) {
    return this.request(`/api/addresses/${id}/default`, {
      method: 'PATCH',
    });
  }

  // Payment services
  async createPayment(paymentData: any) {
    return this.request('/api/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPaymentStatus(paymentId: string) {
    return this.request(`/api/payments/${paymentId}/status`);
  }

  // Report services
  async getUserReports() {
    return this.request('/api/reports');
  }

  async getReport(id: string) {
    return this.request(`/api/reports/${id}`);
  }

  async downloadReport(id: string) {
    const response = await fetch(`${this.baseUrl}/api/reports/${id}/download`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download report: ${response.statusText}`);
    }
    
    return response.blob();
  }

  // Notification services
  async getUserNotifications() {
    return this.request('/api/notifications');
  }

  async markNotificationRead(id: string) {
    return this.request(`/api/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsRead() {
    return this.request('/api/notifications/read-all', {
      method: 'PATCH',
    });
  }

  // Time slot services
  async getAvailableTimeSlots(date: string, pincode: string) {
    return this.request(`/api/time-slots/available?date=${date}&pincode=${pincode}`);
  }

  // Admin services
  async getAdminStats() {
    return this.request('/api/admin/stats');
  }

  async getTechnicians() {
    return this.request('/api/technicians');
  }

  async updateTechnicianAssignment(orderId: string, technicianId: string) {
    return this.request(`/api/orders/${orderId}/technician`, {
      method: 'PATCH',
      body: JSON.stringify({ technicianId }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing or custom instances
export { ApiClient };