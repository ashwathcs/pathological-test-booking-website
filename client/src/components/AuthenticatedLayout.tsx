import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  // Custom sidebar width for better content space
  const style = {
    "--sidebar-width": "18rem",       // 288px for good navigation
    "--sidebar-width-icon": "4rem",   // default icon width
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center space-x-2">
              {/* Additional header actions can go here */}
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}