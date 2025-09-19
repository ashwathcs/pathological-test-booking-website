import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { PincodeChecker } from "@/components/PincodeChecker"
import { TestCatalog } from "@/components/TestCatalog"
import { BookingForm } from "@/components/BookingForm"
import { PaymentOptions } from "@/components/PaymentOptions"
import { OrderTracking } from "@/components/OrderTracking"
import { ReportsAccess } from "@/components/ReportsAccess"
import { UserProfile } from "@/components/UserProfile"
import { AdminDashboard } from "@/components/AdminDashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PincodeChecker />
        <TestCatalog />
        <BookingForm />
        <PaymentOptions />
        <OrderTracking />
        <ReportsAccess />
        <UserProfile />
        <AdminDashboard />
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">MedTest Pro</h3>
              <p className="text-sm text-muted-foreground">
                Professional pathological testing services with home sample collection and digital reports.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Home Sample Collection</li>
                <li>Digital Reports</li>
                <li>Online Booking</li>
                <li>Order Tracking</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Track Order</li>
                <li>Download Reports</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Phone: +91-1800-123-4567</p>
                <p>Email: support@medtestpro.com</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MedTest Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}