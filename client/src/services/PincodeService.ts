// Pincode service with mock data
import { PincodeInfo } from '@/models';
import { mockPincodeData } from './mockData';

class PincodeService {
  private pincodeData: PincodeInfo[] = [...mockPincodeData];

  async checkServiceability(pincode: string): Promise<PincodeInfo | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Validate pincode format (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      return null;
    }

    return this.pincodeData.find(data => data.pincode === pincode) || null;
  }

  async getAllServiceablePincodes(): Promise<PincodeInfo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    return this.pincodeData.filter(data => data.isServiceable);
  }

  async searchPincodesByCity(city: string): Promise<PincodeInfo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const searchTerm = city.toLowerCase();
    return this.pincodeData.filter(data => 
      data.isServiceable && 
      data.city.toLowerCase().includes(searchTerm)
    );
  }

  async searchPincodesByState(state: string): Promise<PincodeInfo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const searchTerm = state.toLowerCase();
    return this.pincodeData.filter(data => 
      data.isServiceable && 
      data.state.toLowerCase().includes(searchTerm)
    );
  }

  // Helper methods for business logic
  isServiceable(pincode: string): Promise<boolean> {
    return this.checkServiceability(pincode).then(data => data?.isServiceable || false);
  }

  getCollectionCharges(pincode: string): Promise<number> {
    return this.checkServiceability(pincode).then(data => data?.collectionCharges || 0);
  }

  getEstimatedDelivery(pincode: string): Promise<number> {
    return this.checkServiceability(pincode).then(data => data?.estimatedDelivery || 3);
  }

  formatPincodeDisplay(pincodeInfo: PincodeInfo): string {
    return `${pincodeInfo.pincode} - ${pincodeInfo.city}, ${pincodeInfo.state}`;
  }

  getDeliveryMessage(pincodeInfo: PincodeInfo): string {
    if (!pincodeInfo.isServiceable) {
      return 'Service not available in this area';
    }

    const days = pincodeInfo.estimatedDelivery || 3;
    const charges = pincodeInfo.collectionCharges || 0;

    let message = `Sample collection available within ${days} ${days === 1 ? 'day' : 'days'}`;
    
    if (charges > 0) {
      message += ` (₹${charges} collection charges)`;
    } else {
      message += ' (Free collection)';
    }

    return message;
  }

  // Mock method to add new serviceable areas (for admin use)
  async addServiceableArea(pincodeInfo: Omit<PincodeInfo, 'isServiceable'>): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if pincode already exists
    const existingPincode = this.pincodeData.find(data => data.pincode === pincodeInfo.pincode);
    if (existingPincode) {
      return { success: false, error: 'Pincode already exists' };
    }

    // Add new pincode data
    this.pincodeData.push({
      ...pincodeInfo,
      isServiceable: true
    });

    return { success: true };
  }

  async updateServiceableArea(pincode: string, updates: Partial<PincodeInfo>): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const index = this.pincodeData.findIndex(data => data.pincode === pincode);
    if (index === -1) {
      return { success: false, error: 'Pincode not found' };
    }

    this.pincodeData[index] = {
      ...this.pincodeData[index],
      ...updates
    };

    return { success: true };
  }
}

// Export singleton instance
export const pincodeService = new PincodeService();
export { PincodeService };