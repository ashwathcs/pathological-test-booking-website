import { useState } from "react"
import { TestCatalog } from "@/components/TestCatalog"
import { BookingForm } from "@/components/BookingForm"

// Types for selected tests
export interface SelectedTest {
  id: string
  name: string
  price: number
  sampleType: string
  fasting: boolean
  homeCollection: boolean
}

export default function BookTest() {
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>([])
  const [showBookingForm, setShowBookingForm] = useState(false)

  const handleTestSelection = (tests: SelectedTest[]) => {
    setSelectedTests(tests)
  }

  const handleProceedToBooking = () => {
    if (selectedTests.length > 0) {
      setShowBookingForm(true)
    }
  }

  const handleBackToCatalog = () => {
    setShowBookingForm(false)
  }

  return (
    <div className="p-6">
      {!showBookingForm ? (
        <TestCatalog 
          selectedTests={selectedTests}
          onTestSelection={handleTestSelection}
          onProceedToBooking={handleProceedToBooking}
        />
      ) : (
        <BookingForm 
          selectedTests={selectedTests}
          onBackToCatalog={handleBackToCatalog}
        />
      )}
    </div>
  )
}