// Pincode service controller hook
import { useState, useCallback } from 'react';
import { PincodeInfo } from '@/models';
import { pincodeService } from '@/services';

export const usePincodeCheck = () => {
  const [pincodeInfo, setPincodeInfo] = useState<PincodeInfo | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPincode = useCallback(async (pincode: string): Promise<PincodeInfo | null> => {
    setIsChecking(true);
    setError(null);
    
    try {
      const info = await pincodeService.checkServiceability(pincode);
      setPincodeInfo(info);
      return info;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check pincode');
      return null;
    } finally {
      setIsChecking(false);
    }
  }, []);

  const clearPincodeInfo = useCallback(() => {
    setPincodeInfo(null);
    setError(null);
  }, []);

  return {
    pincodeInfo,
    isChecking,
    error,
    checkPincode,
    clearPincodeInfo,
    isServiceable: pincodeInfo?.isServiceable || false,
  };
};

export const usePincodeSearch = () => {
  const [searchResults, setSearchResults] = useState<PincodeInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchByCity = useCallback(async (city: string): Promise<PincodeInfo[]> => {
    if (!city.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsSearching(true);
    setError(null);
    
    try {
      const results = await pincodeService.searchPincodesByCity(city);
      setSearchResults(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  const searchByState = useCallback(async (state: string): Promise<PincodeInfo[]> => {
    if (!state.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsSearching(true);
    setError(null);
    
    try {
      const results = await pincodeService.searchPincodesByState(state);
      setSearchResults(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
  }, []);

  return {
    searchResults,
    isSearching,
    error,
    searchByCity,
    searchByState,
    clearSearch,
  };
};

export const useServiceablePincodes = () => {
  const [pincodes, setPincodes] = useState<PincodeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadServiceablePincodes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await pincodeService.getAllServiceablePincodes();
      setPincodes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load serviceable pincodes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    pincodes,
    isLoading,
    error,
    loadServiceablePincodes,
  };
};

// Hook for pincode utilities
export const usePincodeUtils = () => {
  return {
    formatDisplay: pincodeService.formatPincodeDisplay,
    getDeliveryMessage: pincodeService.getDeliveryMessage,
    isServiceable: pincodeService.isServiceable,
    getCollectionCharges: pincodeService.getCollectionCharges,
    getEstimatedDelivery: pincodeService.getEstimatedDelivery,
  };
};