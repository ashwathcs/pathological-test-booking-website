// Order service with mock data
import { Order, CreateOrderRequest, OrderStatus, TimeSlot } from '@/models';
import { mockOrders, mockTimeSlots } from './mockData';
import { testService } from './TestService';
import { authService } from './AuthService';

class OrderService {
  private orders: Order[] = [...mockOrders];
  private timeSlots: TimeSlot[] = [...mockTimeSlots];

  async createOrder(orderRequest: CreateOrderRequest): Promise<{ success: boolean; order?: Order; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    // Validate tests exist
    const tests = await testService.getTestsByIds(orderRequest.tests.map(t => t.testId));
    if (tests.length !== orderRequest.tests.length) {
      return { success: false, error: 'Some tests are not available' };
    }

    // Calculate pricing
    const testsTotal = testService.calculateTotalPrice(orderRequest.tests.map(t => t.testId));
    const collectionCharges = testService.getCollectionCharges(orderRequest.tests.map(t => t.testId), testsTotal);
    
    // Find selected time slot
    const selectedTimeSlot = this.timeSlots.find(slot => slot.id === orderRequest.appointment.timeSlotId);
    if (!selectedTimeSlot) {
      return { success: false, error: 'Invalid time slot selected' };
    }

    // Create new order
    const newOrder: Order = {
      id: (this.orders.length + 1).toString(),
      userId: currentUser.id,
      trackingId: `MT${new Date().getFullYear()}${String(this.orders.length + 1).padStart(3, '0')}`,
      status: 'pending',
      tests: tests.map(test => ({
        testId: test.id,
        testName: test.name,
        price: test.price,
        discountedPrice: test.discountedPrice
      })),
      patient: orderRequest.patient,
      address: orderRequest.address,
      appointment: {
        date: orderRequest.appointment.date,
        timeSlot: selectedTimeSlot
      },
      payment: {
        method: orderRequest.paymentMethod,
        status: orderRequest.paymentMethod === 'online' ? 'pending' : 'pending',
        amount: testsTotal + collectionCharges
      },
      pricing: {
        testsTotal,
        discount: testService.calculateTotalSavings(orderRequest.tests.map(t => t.testId)),
        collectionCharges,
        total: testsTotal + collectionCharges
      },
      specialInstructions: orderRequest.specialInstructions,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add to orders array
    this.orders.push(newOrder);

    return { success: true, order: newOrder };
  }

  async getUserOrders(userId?: string): Promise<Order[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];

    const targetUserId = userId || currentUser.id;

    return this.orders
      .filter(order => order.userId === targetUserId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getOrder(orderId: string): Promise<Order | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const currentUser = authService.getCurrentUser();
    if (!currentUser) return null;

    const order = this.orders.find(order => order.id === orderId);
    
    // Check if user owns this order or is admin/staff
    if (order && (order.userId === currentUser.id || currentUser.role === 'admin' || currentUser.role === 'staff')) {
      return order;
    }

    return null;
  }

  async trackOrder(trackingId: string): Promise<Order | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return this.orders.find(order => order.trackingId === trackingId) || null;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentUser = authService.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      return { success: false, error: 'Unauthorized to update order status' };
    }

    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return { success: false, error: 'Order not found' };
    }

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      status,
      updatedAt: new Date()
    };

    return { success: true };
  }

  async assignTechnician(orderId: string, technicianId: string, technicianName: string, technicianPhone: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentUser = authService.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      return { success: false, error: 'Unauthorized to assign technician' };
    }

    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return { success: false, error: 'Order not found' };
    }

    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      appointment: {
        ...this.orders[orderIndex].appointment,
        technicianId,
        technicianName,
        technicianPhone
      },
      updatedAt: new Date()
    };

    return { success: true };
  }

  async getAvailableTimeSlots(date: Date, pincode: string): Promise<TimeSlot[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // In a real app, this would check technician availability for the given date and location
    // For mock data, we'll return all slots except those already booked for the date
    
    const dateString = date.toDateString();
    const bookedSlots = this.orders
      .filter(order => 
        order.appointment.date.toDateString() === dateString &&
        order.address.pincode === pincode &&
        ['confirmed', 'sample_collected'].includes(order.status)
      )
      .map(order => order.appointment.timeSlot.id);

    return this.timeSlots.filter(slot => !bookedSlots.includes(slot.id));
  }

  // Analytics and reporting methods
  async getOrderStats(): Promise<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const currentUser = authService.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      throw new Error('Unauthorized access');
    }

    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter(order => 
      ['pending', 'confirmed', 'sample_collected', 'processing'].includes(order.status)
    ).length;
    const completedOrders = this.orders.filter(order => order.status === 'completed').length;
    const totalRevenue = this.orders
      .filter(order => order.payment.status === 'completed')
      .reduce((sum, order) => sum + order.payment.amount, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      averageOrderValue
    };
  }

  // Helper methods for business logic
  getOrderStatusDisplay(status: OrderStatus): string {
    const statusMap = {
      'pending': 'Order Placed',
      'confirmed': 'Order Confirmed',
      'sample_collected': 'Sample Collected',
      'processing': 'Processing',
      'completed': 'Completed',
      'cancelled': 'Cancelled'
    };
    return statusMap[status];
  }

  getOrderStatusColor(status: OrderStatus): string {
    const colorMap = {
      'pending': 'orange',
      'confirmed': 'blue',
      'sample_collected': 'purple',
      'processing': 'yellow',
      'completed': 'green',
      'cancelled': 'red'
    };
    return colorMap[status];
  }

  canCancelOrder(order: Order): boolean {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return false;
    
    // Only customer can cancel their own order, and only if it's pending or confirmed
    if (order.userId !== currentUser.id) return false;
    if (!['pending', 'confirmed'].includes(order.status)) return false;
    
    // Can't cancel if appointment is within 4 hours
    const appointmentTime = new Date(order.appointment.date);
    const currentTime = new Date();
    const timeDiff = appointmentTime.getTime() - currentTime.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    return hoursDiff > 4;
  }
}

// Export singleton instance
export const orderService = new OrderService();
export { OrderService };