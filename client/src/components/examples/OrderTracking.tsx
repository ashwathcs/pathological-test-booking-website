import { OrderTracking } from '../OrderTracking'
import { ThemeProvider } from '../ThemeProvider'

export default function OrderTrackingExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <OrderTracking />
      </div>
    </ThemeProvider>
  )
}