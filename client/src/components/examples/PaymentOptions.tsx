import { PaymentOptions } from '../PaymentOptions'
import { ThemeProvider } from '../ThemeProvider'

export default function PaymentOptionsExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <PaymentOptions />
      </div>
    </ThemeProvider>
  )
}