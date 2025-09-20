import { QueryClient } from "@tanstack/react-query";

// Note: External API functionality removed - application now uses mock data via services layer
// This query client is configured for potential future external API integration

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
