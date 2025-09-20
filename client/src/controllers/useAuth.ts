// Authentication controller hook
import { useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthState } from '@/models';
import { authService } from '@/services';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => authService.getAuthState());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const result = await authService.login(credentials);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const result = await authService.register(data);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const result = await authService.logout();
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const user = await authService.refreshUser();
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: isLoading || authState.isLoading,
    
    // Actions
    login,
    register,
    logout,
    refreshUser,
    
    // Utilities
    hasRole: (role: User['role']) => authService.hasRole(role),
    hasAnyRole: (roles: User['role'][]) => authService.hasAnyRole(roles),
  };
};

// Hook for protecting routes
export const useRequireAuth = (redirectTo?: string) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirectTo) {
      // In a real app, you'd use your router to redirect
      // For now, we'll just log the intended redirect
      console.log(`Redirecting to ${redirectTo} - user not authenticated`);
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  return { isAuthenticated, isLoading };
};

// Hook for role-based access control
export const useRequireRole = (requiredRoles: User['role'][] | User['role']) => {
  const { user, isAuthenticated, hasAnyRole } = useAuth();

  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  const hasAccess = isAuthenticated && user && hasAnyRole(roles);

  return {
    hasAccess,
    isAuthenticated,
    user,
    requiredRoles: roles,
  };
};