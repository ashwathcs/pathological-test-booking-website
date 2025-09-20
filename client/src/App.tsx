import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthenticatedLayout } from "@/components/AuthenticatedLayout";
import { useAuth } from "@/controllers";
import { useLenis } from "@/hooks/useLenis";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import BookTest from "@/pages/BookTest";
import Payment from "@/pages/Payment";
import TrackOrder from "@/pages/TrackOrder";
import Reports from "@/pages/Reports";
import Profile from "@/pages/Profile";
import AdminDashboardPage from "@/pages/AdminDashboard";
import StaffDashboard from "@/pages/StaffDashboard";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();
  useLenis(); // Add smooth scrolling

  return (
    <AnimatePresence mode="wait">
      <Switch>
        {isLoading || !isAuthenticated ? (
          <Route path="/" component={Landing} />
        ) : (
          <AuthenticatedLayout>
            <Route path="/" component={Dashboard} />
            <Route path="/book-test" component={BookTest} />
            <Route path="/payment" component={Payment} />
            <Route path="/track-order" component={TrackOrder} />
            <Route path="/reports" component={Reports} />
            <Route path="/profile" component={Profile} />
            {(user as any)?.role === 'admin' && (
              <Route path="/admin" component={AdminDashboardPage} />
            )}
            {((user as any)?.role === 'staff' || (user as any)?.role === 'admin') && (
              <Route path="/staff" component={StaffDashboard} />
            )}
          </AuthenticatedLayout>
        )}
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Router />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;