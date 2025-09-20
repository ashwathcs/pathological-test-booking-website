import { useEffect } from "react"
import { useAuth } from "@/controllers"
import { useToast } from "@/hooks/use-toast"
import { OrderTracking } from "@/components/OrderTracking"

export default function TrackOrder() {
  const { toast } = useToast()
  const { isAuthenticated, isLoading } = useAuth()

  // Handle authentication redirect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      })
      // User will be redirected to landing page by App.tsx routing logic
      return
    }
  }, [isAuthenticated, isLoading, toast])

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

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="p-6">
      <OrderTracking />
    </div>
  )
}