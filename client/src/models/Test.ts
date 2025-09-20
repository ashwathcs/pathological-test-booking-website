// Test domain models and interfaces

export interface Test {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  sampleType: SampleType;
  category: string;
  categoryId: string;
  duration: string; // e.g., "4-6 hours", "24-48 hours"
  parameters: number;
  fasting: boolean;
  homeCollection: boolean;
  popularity: number; // 0-100 score
  instructions?: string[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  testsCount: number;
  sortOrder: number;
  isActive: boolean;
}

export interface TestPackage {
  id: string;
  name: string;
  description: string;
  tests: Test[];
  originalPrice: number;
  packagePrice: number;
  savings: number;
  category: string;
  duration: string;
  fasting: boolean;
  homeCollection: boolean;
  popularity: number;
  isActive: boolean;
}

export type SampleType = 'blood' | 'urine' | 'stool' | 'saliva' | 'tissue' | 'swab';

export interface TestSearchFilters {
  query?: string;
  categoryId?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  sampleTypes?: SampleType[];
  fasting?: boolean;
  homeCollection?: boolean;
  sortBy?: 'popularity' | 'price_low' | 'price_high' | 'name' | 'duration';
}

export interface TestSearchResult {
  tests: Test[];
  total: number;
  page: number;
  pageSize: number;
  filters: TestSearchFilters;
}