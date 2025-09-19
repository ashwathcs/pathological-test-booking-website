import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/Header"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function StaffDashboard() {
  const { toast } = useToast()
  const { isAuthenticated, isLoading, user } = useAuth()

  // Handle authentication and role-based access
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      })
      setTimeout(() => {
        window.location.href = "/api/login"
      }, 500)
      return
    }

    if (!isLoading && isAuthenticated && (user as any)?.role !== 'staff' && (user as any)?.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the staff dashboard.",
        variant: "destructive",
      })
      setTimeout(() => {
        window.location.href = "/"
      }, 1000)
      return
    }
  }, [isAuthenticated, isLoading, user, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || ((user as any)?.role !== 'staff' && (user as any)?.role !== 'admin')) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AdminDashboard />
      </main>
    </div>
  )
}