import { useState } from "react"
import { Search, Filter, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import bloodTestIcon from "@assets/generated_images/Blood_test_category_icon_690b88ed.png"
import urineTestIcon from "@assets/generated_images/Urine_test_category_icon_a343c40b.png"

type Test = {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  preparationTime: string
  sampleType: "Blood" | "Urine" | "Stool" | "Saliva"
  rating: number
  reviews: number
  tags: string[]
  popular?: boolean
}

export function TestCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popular")

  // Mock data //todo: remove mock functionality
  const tests: Test[] = [
    {
      id: "1",
      name: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis including RBC, WBC, hemoglobin, and platelet count",
      price: 299,
      originalPrice: 499,
      category: "Blood Tests",
      preparationTime: "8-12 hours fasting",
      sampleType: "Blood",
      rating: 4.8,
      reviews: 1250,
      tags: ["Popular", "Routine"],
      popular: true
    },
    {
      id: "2", 
      name: "Lipid Profile",
      description: "Cholesterol and triglyceride levels assessment for cardiovascular health",
      price: 599,
      originalPrice: 799,
      category: "Blood Tests",
      preparationTime: "12 hours fasting",
      sampleType: "Blood",
      rating: 4.7,
      reviews: 890,
      tags: ["Heart Health", "Preventive"]
    },
    {
      id: "3",
      name: "Liver Function Test (LFT)",
      description: "Comprehensive liver health assessment including enzymes and proteins",
      price: 699,
      category: "Blood Tests", 
      preparationTime: "8 hours fasting",
      sampleType: "Blood",
      rating: 4.6,
      reviews: 567,
      tags: ["Liver Health"]
    },
    {
      id: "4",
      name: "Urine Routine Analysis",
      description: "Complete urine examination for kidney health and urinary tract infections",
      price: 199,
      category: "Urine Tests",
      preparationTime: "No fasting required",
      sampleType: "Urine",
      rating: 4.5,
      reviews: 432,
      tags: ["Kidney Health", "UTI"]
    }
  ]

  const categories = ["all", "Blood Tests", "Urine Tests", "Stool Tests", "Packages"]

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedTests = [...filteredTests].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0)
    }
  })

  const getSampleIcon = (sampleType: string) => {
    switch (sampleType) {
      case "Blood":
        return bloodTestIcon
      case "Urine":
        return urineTestIcon
      default:
        return bloodTestIcon
    }
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">Diagnostic Tests</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of pathological tests with accurate results and fast reporting
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-tests"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]" data-testid="select-category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Test Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTests.map((test) => (
            <Card key={test.id} className="hover-elevate" data-testid={`card-test-${test.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={getSampleIcon(test.sampleType)}
                      alt={`${test.sampleType} test`}
                      className="h-10 w-10 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground" data-testid={`text-test-name-${test.id}`}>
                        {test.name}
                      </h3>
                      {test.popular && (
                        <Badge variant="secondary" className="mt-1">
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground" data-testid={`text-test-description-${test.id}`}>
                  {test.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sample Type:</span>
                    <span className="text-foreground">{test.sampleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Preparation:</span>
                    <span className="text-foreground">{test.preparationTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium" data-testid={`text-test-rating-${test.id}`}>
                      {test.rating}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({test.reviews} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {test.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-foreground" data-testid={`text-test-price-${test.id}`}>
                      ₹{test.price}
                    </span>
                    {test.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{test.originalPrice}
                      </span>
                    )}
                  </div>
                  {test.originalPrice && (
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(((test.originalPrice - test.price) / test.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <Button data-testid={`button-book-test-${test.id}`}>
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tests found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}