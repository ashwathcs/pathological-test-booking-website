import { useState } from "react"
import { Activity, User, Bell, Menu, X } from "lucide-react"
import pathocare360Logo from "@assets/generated_images/Pathocare360_medical_logo_design_86d559b5.png"
import { Link, useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "@/controllers"
import { NotificationCenter } from "./NotificationCenter"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [location] = useLocation()
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={pathocare360Logo} 
            alt="Pathocare360 Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold text-foreground">Pathocare360</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button 
            variant={location === '/' ? 'default' : 'ghost'} 
            asChild 
            data-testid="nav-dashboard"
          >
            <Link href="/">Dashboard</Link>
          </Button>
          <Button 
            variant={location === '/book-test' ? 'default' : 'ghost'} 
            asChild 
            data-testid="nav-book"
          >
            <Link href="/book-test">Book Test</Link>
          </Button>
          <Button 
            variant={location === '/track-order' ? 'default' : 'ghost'} 
            asChild 
            data-testid="nav-track"
          >
            <Link href="/track-order">Track Order</Link>
          </Button>
          <Button 
            variant={location === '/reports' ? 'default' : 'ghost'} 
            asChild 
            data-testid="nav-reports"
          >
            <Link href="/reports">Reports</Link>
          </Button>
          {((user as any)?.role === 'admin' || (user as any)?.role === 'staff') && (
            <Button 
              variant={location === '/admin' || location === '/staff' ? 'default' : 'ghost'} 
              asChild 
              data-testid="nav-admin"
            >
              <Link href={(user as any)?.role === 'admin' ? '/admin' : '/staff'}>
                {(user as any)?.role === 'admin' ? 'Admin' : 'Staff'}
              </Link>
            </Button>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <NotificationCenter />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-user-menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel data-testid="text-user-name">
                {(user as any)?.firstName && (user as any)?.lastName 
                  ? `${(user as any).firstName} ${(user as any).lastName}` 
                  : (user as any)?.email || 'User'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild data-testid="menu-profile">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild data-testid="menu-track">
                <Link href="/track-order">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild data-testid="menu-reports">
                <Link href="/reports">My Reports</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => {
                await logout();
              }} data-testid="menu-logout">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-2 p-4">
            <Button 
              variant={location === '/' ? 'default' : 'ghost'} 
              className="justify-start" 
              asChild 
              data-testid="mobile-nav-dashboard"
            >
              <Link href="/">Dashboard</Link>
            </Button>
            <Button 
              variant={location === '/book-test' ? 'default' : 'ghost'} 
              className="justify-start" 
              asChild 
              data-testid="mobile-nav-book"
            >
              <Link href="/book-test">Book Test</Link>
            </Button>
            <Button 
              variant={location === '/track-order' ? 'default' : 'ghost'} 
              className="justify-start" 
              asChild 
              data-testid="mobile-nav-track"
            >
              <Link href="/track-order">Track Order</Link>
            </Button>
            <Button 
              variant={location === '/reports' ? 'default' : 'ghost'} 
              className="justify-start" 
              asChild 
              data-testid="mobile-nav-reports"
            >
              <Link href="/reports">Reports</Link>
            </Button>
            {((user as any)?.role === 'admin' || (user as any)?.role === 'staff') && (
              <Button 
                variant={location === '/admin' || location === '/staff' ? 'default' : 'ghost'} 
                className="justify-start" 
                asChild 
                data-testid="mobile-nav-admin"
              >
                <Link href={(user as any)?.role === 'admin' ? '/admin' : '/staff'}>
                  {(user as any)?.role === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}