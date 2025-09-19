import { BookingForm } from '../BookingForm'
import { ThemeProvider } from '../ThemeProvider'

export default function BookingFormExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <BookingForm />
      </div>
    </ThemeProvider>
  )
}