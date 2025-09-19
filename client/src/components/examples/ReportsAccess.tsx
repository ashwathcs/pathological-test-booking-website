import { ReportsAccess } from '../ReportsAccess'
import { ThemeProvider } from '../ThemeProvider'

export default function ReportsAccessExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <ReportsAccess />
      </div>
    </ThemeProvider>
  )
}