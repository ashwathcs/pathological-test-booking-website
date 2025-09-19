import { useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { PincodeChecker } from "@/components/PincodeChecker"
import { TestCatalog } from "@/components/TestCatalog"
import { PageTransition } from "@/components/animations/PageTransition"

export default function Dashboard() {
  const { toast } = useToast()
  const { isAuthenticated, isLoading, user } = useAuth()

  // Handle authentication redirect
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
    return null // Will redirect via useEffect
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <PincodeChecker />
          <TestCatalog />
        </main>
      </div>
    </PageTransition>
  )
}