// Test management controller hook
import { useState, useEffect, useCallback } from 'react';
import { Test, TestCategory, TestSearchFilters, TestSearchResult } from '@/models';
import { testService } from '@/services';

export const useTests = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [categories, setCategories] = useState<TestCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  const loadTests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [testsData, categoriesData] = await Promise.all([
        testService.getAllTests(),
        testService.getTestCategories()
      ]);
      setTests(testsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  return {
    tests,
    categories,
    isLoading,
    error,
    refetch: loadTests,
  };
};

export const useTest = (testId: string | null) => {
  const [test, setTest] = useState<Test | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTest = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const testData = await testService.getTest(id);
      setTest(testData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load test');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (testId) {
      loadTest(testId);
    } else {
      setTest(null);
    }
  }, [testId, loadTest]);

  return {
    test,
    isLoading,
    error,
    refetch: testId ? () => loadTest(testId) : undefined,
  };
};

export const useTestSearch = (initialFilters?: TestSearchFilters) => {
  const [searchResult, setSearchResult] = useState<TestSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TestSearchFilters>(initialFilters || {});

  const search = useCallback(async (searchFilters: TestSearchFilters) => {
    setIsLoading(true);
    setError(null);
    setFilters(searchFilters);
    
    try {
      const result = await testService.searchTests(searchFilters);
      setSearchResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<TestSearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    search(updatedFilters);
  }, [filters, search]);

  const clearFilters = useCallback(() => {
    search({});
  }, [search]);

  // Load initial search if filters provided
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      search(filters);
    }
  }, []); // Only run on mount

  return {
    searchResult,
    isLoading,
    error,
    filters,
    search,
    updateFilters,
    clearFilters,
  };
};

export const usePopularTests = (limit: number = 6) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPopularTests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const testsData = await testService.getPopularTests(limit);
      setTests(testsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load popular tests');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadPopularTests();
  }, [loadPopularTests]);

  return {
    tests,
    isLoading,
    error,
    refetch: loadPopularTests,
  };
};

export const useTestsByCategory = (categoryId: string | null) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTestsByCategory = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const testsData = await testService.getTestsByCategory(id);
      setTests(testsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (categoryId) {
      loadTestsByCategory(categoryId);
    } else {
      setTests([]);
    }
  }, [categoryId, loadTestsByCategory]);

  return {
    tests,
    isLoading,
    error,
    refetch: categoryId ? () => loadTestsByCategory(categoryId) : undefined,
  };
};

// Hook for cart functionality
export const useTestCart = () => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const addTest = useCallback((testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) ? prev : [...prev, testId]
    );
  }, []);

  const removeTest = useCallback((testId: string) => {
    setSelectedTests(prev => prev.filter(id => id !== testId));
  }, []);

  const clearCart = useCallback(() => {
    setSelectedTests([]);
  }, []);

  const toggleTest = useCallback((testId: string) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  }, []);

  // Calculate cart totals
  const totalPrice = testService.calculateTotalPrice(selectedTests);
  const totalSavings = testService.calculateTotalSavings(selectedTests);
  const homeCollectionAvailable = testService.isHomeCollectionAvailable(selectedTests);
  const fastingRequired = testService.requiresFasting(selectedTests);
  const collectionCharges = testService.getCollectionCharges(selectedTests, totalPrice);

  return {
    selectedTests,
    testCount: selectedTests.length,
    addTest,
    removeTest,
    toggleTest,
    clearCart,
    isTestSelected: (testId: string) => selectedTests.includes(testId),
    
    // Pricing
    totalPrice,
    totalSavings,
    collectionCharges,
    finalTotal: totalPrice + collectionCharges,
    
    // Features
    homeCollectionAvailable,
    fastingRequired,
  };
};