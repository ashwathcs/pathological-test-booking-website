import { useState } from "react"
import { Activity, User, Bell, Menu, X } from "lucide-react"
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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [notifications] = useState(3) //todo: remove mock functionality

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">MedTest Pro</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" data-testid="nav-tests">Tests</Button>
          <Button variant="ghost" data-testid="nav-book">Book Now</Button>
          <Button variant="ghost" data-testid="nav-track">Track Order</Button>
          <Button variant="ghost" data-testid="nav-reports">Reports</Button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                data-testid="badge-notification-count"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-user-menu">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel data-testid="text-user-name">Dr. Sarah Johnson</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-profile">Profile</DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-orders">My Orders</DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-reports">My Reports</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem data-testid="menu-logout">Logout</DropdownMenuItem>
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
            <Button variant="ghost" className="justify-start" data-testid="mobile-nav-tests">Tests</Button>
            <Button variant="ghost" className="justify-start" data-testid="mobile-nav-book">Book Now</Button>
            <Button variant="ghost" className="justify-start" data-testid="mobile-nav-track">Track Order</Button>
            <Button variant="ghost" className="justify-start" data-testid="mobile-nav-reports">Reports</Button>
          </nav>
        </div>
      )}
    </header>
  )
}