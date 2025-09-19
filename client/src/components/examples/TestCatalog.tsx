import { TestCatalog } from '../TestCatalog'
import { ThemeProvider } from '../ThemeProvider'

export default function TestCatalogExample() {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen">
        <TestCatalog />
      </div>
    </ThemeProvider>
  )
}