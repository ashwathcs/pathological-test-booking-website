import { Calendar, Home, FileText, User, Settings, Activity, Bell, LogOut, Users, BarChart3 } from "lucide-react"
import { Link, useLocation } from "wouter"
import { useAuth } from "@/controllers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./ThemeToggle"
import { NotificationCenter } from "./NotificationCenter"

export function AppSidebar() {
  const [location] = useLocation()
  const { user, logout, hasRole } = useAuth()

  // Main navigation items
  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      badge: null,
    },
    {
      title: "Book Test",
      url: "/book-test",
      icon: Calendar,
      badge: null,
    },
    {
      title: "Track Order",
      url: "/track-order",
      icon: Activity,
      badge: "2", // Mock badge count
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileText,
      badge: null,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
      badge: null,
    },
  ]

  // Admin/Staff navigation items
  const adminNavItems = [
    {
      title: "Admin Dashboard",
      url: "/admin",
      icon: BarChart3,
      badge: null,
      role: 'admin' as const,
    },
    {
      title: "Staff Panel",
      url: "/staff",
      icon: Users,
      badge: null,
      role: 'staff' as const,
    },
  ]

  const handleLogout = async () => {
    await logout()
  }

  const getInitials = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    if (email) {
      return email[0].toUpperCase()
    }
    return 'U'
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-3 px-4 py-4">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            Pathocare360
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin/Staff Navigation */}
        {(hasRole('admin') || hasRole('staff')) && (
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNavItems
                  .filter(item => hasRole(item.role))
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location === item.url}>
                        <Link href={item.url} data-testid={`nav-${item.title.toLowerCase().replace(' ', '-')}`}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        {/* User Profile Section */}
        <div className="p-4 border-t bg-sidebar-accent/50">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="User Avatar" />
              <AvatarFallback>
                {getInitials(
                  (user as any)?.firstName, 
                  (user as any)?.lastName, 
                  (user as any)?.email
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate" data-testid="text-user-name">
                {(user as any)?.firstName && (user as any)?.lastName 
                  ? `${(user as any).firstName} ${(user as any).lastName}` 
                  : (user as any)?.email || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {(user as any)?.email}
              </p>
              {(user as any)?.role && (
                <Badge variant="outline" className="text-xs mt-1">
                  {(user as any).role}
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <NotificationCenter />
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              data-testid="button-logout"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}