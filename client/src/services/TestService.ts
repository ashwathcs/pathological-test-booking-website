// Test service with mock data
import { Test, TestCategory, TestSearchFilters, TestSearchResult } from '@/models';
import { mockTests, mockTestCategories } from './mockData';

class TestService {
  private tests: Test[] = [...mockTests];
  private categories: TestCategory[] = [...mockTestCategories];

  async getAllTests(): Promise<Test[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.tests.filter(test => test.isActive);
  }

  async getTest(id: string): Promise<Test | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.tests.find(test => test.id === id && test.isActive) || null;
  }

  async getTestCategories(): Promise<TestCategory[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.categories.filter(category => category.isActive);
  }

  async searchTests(filters: TestSearchFilters): Promise<TestSearchResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    let filteredTests = this.tests.filter(test => test.isActive);

    // Apply search query filter
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredTests = filteredTests.filter(test => 
        test.name.toLowerCase().includes(query) ||
        test.description.toLowerCase().includes(query) ||
        test.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.categoryId && filters.categoryId !== 'all') {
      filteredTests = filteredTests.filter(test => test.categoryId === filters.categoryId);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filteredTests = filteredTests.filter(test => {
        const price = test.discountedPrice || test.price;
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
      });
    }

    // Apply sample type filter
    if (filters.sampleTypes && filters.sampleTypes.length > 0) {
      filteredTests = filteredTests.filter(test => 
        filters.sampleTypes!.includes(test.sampleType)
      );
    }

    // Apply fasting filter
    if (filters.fasting !== undefined) {
      filteredTests = filteredTests.filter(test => test.fasting === filters.fasting);
    }

    // Apply home collection filter
    if (filters.homeCollection !== undefined) {
      filteredTests = filteredTests.filter(test => test.homeCollection === filters.homeCollection);
    }

    // Apply sorting
    if (filters.sortBy) {
      filteredTests.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_low':
            return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
          case 'price_high':
            return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
          case 'name':
            return a.name.localeCompare(b.name);
          case 'duration':
            return a.duration.localeCompare(b.duration);
          case 'popularity':
          default:
            return b.popularity - a.popularity;
        }
      });
    }

    return {
      tests: filteredTests,
      total: filteredTests.length,
      page: 1,
      pageSize: filteredTests.length,
      filters
    };
  }

  async getPopularTests(limit: number = 6): Promise<Test[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.tests
      .filter(test => test.isActive)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }

  async getTestsByCategory(categoryId: string): Promise<Test[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return this.tests.filter(test => 
      test.isActive && test.categoryId === categoryId
    );
  }

  async getTestsByIds(testIds: string[]): Promise<Test[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.tests.filter(test => 
      test.isActive && testIds.includes(test.id)
    );
  }

  // Helper methods for business logic
  calculateDiscountPercentage(test: Test): number {
    if (!test.discountedPrice) return 0;
    return Math.round(((test.price - test.discountedPrice) / test.price) * 100);
  }

  calculateTotalPrice(testIds: string[]): number {
    const tests = this.tests.filter(test => testIds.includes(test.id));
    return tests.reduce((total, test) => {
      return total + (test.discountedPrice || test.price);
    }, 0);
  }

  calculateTotalSavings(testIds: string[]): number {
    const tests = this.tests.filter(test => testIds.includes(test.id));
    return tests.reduce((savings, test) => {
      if (test.discountedPrice) {
        return savings + (test.price - test.discountedPrice);
      }
      return savings;
    }, 0);
  }

  isHomeCollectionAvailable(testIds: string[]): boolean {
    const tests = this.tests.filter(test => testIds.includes(test.id));
    return tests.every(test => test.homeCollection);
  }

  requiresFasting(testIds: string[]): boolean {
    const tests = this.tests.filter(test => testIds.includes(test.id));
    return tests.some(test => test.fasting);
  }

  getCollectionCharges(testIds: string[], totalAmount: number): number {
    // Free collection for orders above ₹500
    if (totalAmount >= 500) return 0;
    
    // Check if all tests support home collection
    if (!this.isHomeCollectionAvailable(testIds)) return 0;
    
    return 100; // ₹100 collection charges for orders below ₹500
  }
}

// Export singleton instance
export const testService = new TestService();
export { TestService };