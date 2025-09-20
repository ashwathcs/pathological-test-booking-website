// Order management controller hook
import { useState, useEffect, useCallback } from 'react';
import { Order, CreateOrderRequest, OrderStatus, TimeSlot } from '@/models';
import { orderService } from '@/services';
import { useAuth } from './useAuth';

export const useOrders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const ordersData = await orderService.getUserOrders();
      setOrders(ordersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    isLoading,
    error,
    refetch: loadOrders,
  };
};

export const useOrder = (orderId: string | null) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const orderData = await orderService.getOrder(id);
      setOrder(orderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    } else {
      setOrder(null);
    }
  }, [orderId, loadOrder]);

  return {
    order,
    isLoading,
    error,
    refetch: orderId ? () => loadOrder(orderId) : undefined,
  };
};

export const useOrderTracking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackOrder = useCallback(async (trackingId: string): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const order = await orderService.trackOrder(trackingId);
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track order');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trackOrder,
    isLoading,
    error,
  };
};

export const useCreateOrder = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (orderRequest: CreateOrderRequest) => {
    setIsCreating(true);
    setError(null);
    try {
      const result = await orderService.createOrder(orderRequest);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      return { success: false, error: 'Failed to create order' };
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {
    createOrder,
    isCreating,
    error,
  };
};

export const useTimeSlots = (date: Date | null, pincode: string) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTimeSlots = useCallback(async (selectedDate: Date, selectedPincode: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const slots = await orderService.getAvailableTimeSlots(selectedDate, selectedPincode);
      setTimeSlots(slots);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load time slots');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (date && pincode) {
      loadTimeSlots(date, pincode);
    } else {
      setTimeSlots([]);
    }
  }, [date, pincode, loadTimeSlots]);

  return {
    timeSlots,
    isLoading,
    error,
  };
};

// Hook for order management (staff/admin)
export const useOrderManagement = () => {
  const { hasAnyRole } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  } | null>(null);

  const canManageOrders = hasAnyRole(['admin', 'staff']);

  const loadOrders = useCallback(async () => {
    if (!canManageOrders) return;

    setIsLoading(true);
    setError(null);
    try {
      const [ordersData, statsData] = await Promise.all([
        orderService.getUserOrders(), // In real app, this would be getAllOrders for admin
        orderService.getOrderStats()
      ]);
      setOrders(ordersData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  }, [canManageOrders]);

  const updateOrderStatus = useCallback(async (orderId: string, status: OrderStatus) => {
    if (!canManageOrders) {
      throw new Error('Unauthorized');
    }

    try {
      const result = await orderService.updateOrderStatus(orderId, status);
      if (result.success) {
        await loadOrders(); // Refresh orders
      }
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update order status');
    }
  }, [canManageOrders, loadOrders]);

  const assignTechnician = useCallback(async (
    orderId: string, 
    technicianId: string, 
    technicianName: string, 
    technicianPhone: string
  ) => {
    if (!canManageOrders) {
      throw new Error('Unauthorized');
    }

    try {
      const result = await orderService.assignTechnician(orderId, technicianId, technicianName, technicianPhone);
      if (result.success) {
        await loadOrders(); // Refresh orders
      }
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to assign technician');
    }
  }, [canManageOrders, loadOrders]);

  useEffect(() => {
    if (canManageOrders) {
      loadOrders();
    }
  }, [canManageOrders, loadOrders]);

  return {
    orders,
    stats,
    isLoading,
    error,
    canManageOrders,
    refetch: loadOrders,
    updateOrderStatus,
    assignTechnician,
  };
};

// Hook for order utilities
export const useOrderUtils = () => {
  return {
    getStatusDisplay: orderService.getOrderStatusDisplay,
    getStatusColor: orderService.getOrderStatusColor,
    canCancelOrder: orderService.canCancelOrder,
  };
};