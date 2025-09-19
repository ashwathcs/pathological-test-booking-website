import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  role: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // Query current user from external backend
  const {
    data: user,
    isLoading,
    error: userError,
  } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      try {
        return await apiClient.getCurrentUser();
      } catch (error: any) {
        // If unauthorized or backend unavailable, return null
        if (error.message.includes('401') || error.message.includes('Unable to connect')) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      return await apiClient.login(credentials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiClient.logout();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/user"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  // Login function
  const login = async (credentials: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(credentials);
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || "Login failed" 
      };
    }
  };

  // Logout function  
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      return { success: true };
    } catch (error: any) {
      queryClient.setQueryData(["/api/auth/user"], null);
      return { 
        success: false, 
        error: error.message || "Logout failed" 
      };
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error?.message,
    logoutError: logoutMutation.error?.message,
  };
}