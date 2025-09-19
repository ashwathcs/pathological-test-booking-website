import { PincodeChecker } from '../PincodeChecker'
import { ThemeProvider } from '../ThemeProvider'

export default function PincodeCheckerExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <PincodeChecker />
      </div>
    </ThemeProvider>
  )
}