// Mock data for the application
import { 
  User, 
  Test, 
  TestCategory, 
  Order, 
  Report, 
  Notification,
  PincodeInfo,
  TimeSlot 
} from '@/models';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+91-9876543210',
    role: 'customer',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '2',
    email: 'admin@medtestpro.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  }
];

// Mock Test Categories
export const mockTestCategories: TestCategory[] = [
  {
    id: 'blood-tests',
    name: 'Blood Tests',
    description: 'Comprehensive blood analysis and screenings',
    icon: 'droplets',
    testsCount: 25,
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'heart-health',
    name: 'Heart Health',
    description: 'Cardiovascular health assessments',
    icon: 'heart',
    testsCount: 12,
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'organ-function',
    name: 'Organ Function',
    description: 'Liver, kidney and organ function tests',
    icon: 'activity',
    testsCount: 18,
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'hormones',
    name: 'Hormones',
    description: 'Hormonal balance and endocrine tests',
    icon: 'zap',
    testsCount: 15,
    sortOrder: 4,
    isActive: true
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'Blood sugar monitoring and diabetes screening',
    icon: 'target',
    testsCount: 8,
    sortOrder: 5,
    isActive: true
  },
  {
    id: 'vitamins',
    name: 'Vitamins',
    description: 'Vitamin deficiency and nutritional tests',
    icon: 'sun',
    testsCount: 10,
    sortOrder: 6,
    isActive: true
  }
];

// Mock Tests
export const mockTests: Test[] = [
  {
    id: '1',
    name: 'Complete Blood Count (CBC)',
    description: 'Comprehensive blood test to check overall health and detect various disorders including anemia, infections, and blood cancers.',
    price: 299,
    sampleType: 'blood',
    category: 'Blood Tests',
    categoryId: 'blood-tests',
    duration: '4-6 hours',
    parameters: 22,
    fasting: false,
    homeCollection: true,
    popularity: 95,
    instructions: [
      'No special preparation required',
      'Can be done at any time of the day',
      'Stay hydrated before the test'
    ],
    tags: ['basic', 'screening', 'popular'],
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '2',
    name: 'Lipid Profile',
    description: 'Measures cholesterol and triglyceride levels to assess heart disease risk and cardiovascular health.',
    price: 499,
    discountedPrice: 399,
    sampleType: 'blood',
    category: 'Heart Health',
    categoryId: 'heart-health',
    duration: '6-8 hours',
    parameters: 8,
    fasting: true,
    homeCollection: true,
    popularity: 88,
    instructions: [
      '12-14 hours fasting required',
      'Only water is allowed during fasting',
      'Take medications as prescribed by doctor'
    ],
    tags: ['cholesterol', 'heart', 'fasting'],
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '3',
    name: 'Liver Function Test (LFT)',
    description: 'Evaluates liver health and function through various enzyme measurements and protein levels.',
    price: 399,
    sampleType: 'blood',
    category: 'Organ Function',
    categoryId: 'organ-function',
    duration: '4-6 hours',
    parameters: 11,
    fasting: false,
    homeCollection: true,
    popularity: 82,
    instructions: [
      'No fasting required',
      'Inform about any medications',
      'Avoid alcohol 24 hours before test'
    ],
    tags: ['liver', 'enzymes', 'function'],
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '4',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Complete thyroid function assessment including T3, T4, and TSH levels to diagnose thyroid disorders.',
    price: 599,
    sampleType: 'blood',
    category: 'Hormones',
    categoryId: 'hormones',
    duration: '6-8 hours',
    parameters: 3,
    fasting: false,
    homeCollection: true,
    popularity: 85,
    instructions: [
      'No fasting required',
      'Take morning dose of thyroid medication after sample collection',
      'Inform about any thyroid medications'
    ],
    tags: ['thyroid', 'hormones', 't3', 't4', 'tsh'],
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '5',
    name: 'HbA1c (Diabetes)',
    description: 'Measures average blood glucose levels over the past 2-3 months, essential for diabetes monitoring.',
    price: 379,
    sampleType: 'blood',
    category: 'Diabetes',
    categoryId: 'diabetes',
    duration: '4-6 hours',
    parameters: 1,
    fasting: false,
    homeCollection: true,
    popularity: 90,
    instructions: [
      'No fasting required',
      'Can be done any time',
      'Continue medications as usual'
    ],
    tags: ['diabetes', 'glucose', 'hba1c'],
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  },
  {
    id: '6',
    name: 'Vitamin D Test',
    description: 'Measures vitamin D levels to assess bone health, immunity, and overall wellness.',
    price: 899,
    discountedPrice: 699,
    sampleType: 'blood',
    category: 'Vitamins',
    categoryId: 'vitamins',
    duration: '24-48 hours',
    parameters: 1,
    fasting: false,
    homeCollection: true,
    popularity: 80,
    instructions: [
      'No fasting required',
      'Continue vitamin supplements as prescribed',
      'Test can be done any time'
    ],
    tags: ['vitamin', 'bone-health', 'immunity'],
    isActive: true,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-09-20')
  }
];

// Mock Time Slots
export const mockTimeSlots: TimeSlot[] = [
  { id: '1', startTime: '07:00', endTime: '09:00', displayText: '07:00 - 09:00 AM' },
  { id: '2', startTime: '09:00', endTime: '11:00', displayText: '09:00 - 11:00 AM' },
  { id: '3', startTime: '11:00', endTime: '13:00', displayText: '11:00 - 01:00 PM' },
  { id: '4', startTime: '14:00', endTime: '16:00', displayText: '02:00 - 04:00 PM' },
  { id: '5', startTime: '16:00', endTime: '18:00', displayText: '04:00 - 06:00 PM' },
  { id: '6', startTime: '18:00', endTime: '20:00', displayText: '06:00 - 08:00 PM' }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    trackingId: 'MT2024001',
    status: 'sample_collected',
    tests: [
      { testId: '1', testName: 'Complete Blood Count (CBC)', price: 299 },
      { testId: '2', testName: 'Lipid Profile', price: 399, discountedPrice: 399 }
    ],
    patient: {
      name: 'John Doe',
      age: 32,
      gender: 'male',
      phone: '+91-9876543210',
      email: 'john.doe@example.com'
    },
    address: {
      addressLine1: '123 Main Street',
      addressLine2: 'Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      landmark: 'Near City Mall'
    },
    appointment: {
      date: new Date('2024-09-22'),
      timeSlot: mockTimeSlots[1],
      technicianId: 'tech1',
      technicianName: 'Ravi Kumar',
      technicianPhone: '+91-9123456789'
    },
    payment: {
      method: 'online',
      status: 'completed',
      amount: 698,
      transactionId: 'txn_123456',
      gateway: 'razorpay',
      paidAt: new Date('2024-09-20')
    },
    pricing: {
      testsTotal: 698,
      discount: 0,
      collectionCharges: 0,
      total: 698
    },
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-09-21')
  }
];

// Mock Reports
export const mockReports: Report[] = [
  {
    id: '1',
    orderId: '1',
    userId: '1',
    patientName: 'John Doe',
    status: 'ready',
    tests: [
      {
        testId: '1',
        testName: 'Complete Blood Count (CBC)',
        parameters: [
          {
            name: 'Hemoglobin',
            value: 14.2,
            unit: 'g/dL',
            referenceRange: '12.0 - 16.0',
            status: 'normal'
          },
          {
            name: 'White Blood Cells',
            value: 8.5,
            unit: '10^3/μL',
            referenceRange: '4.0 - 11.0',
            status: 'normal'
          }
        ],
        interpretation: 'All parameters are within normal limits.'
      }
    ],
    generatedAt: new Date('2024-09-22'),
    reportedBy: {
      doctorName: 'Dr. Priya Sharma',
      qualification: 'MD Pathology',
      registrationNumber: 'MH12345'
    },
    labInfo: {
      name: 'MedTest Pro Laboratory',
      address: '456 Lab Street, Mumbai 400001',
      phone: '+91-1800-123-4567',
      email: 'lab@medtestpro.com',
      nabLicense: 'NABL-123'
    },
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-09-22')
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'report_ready',
    title: 'Your test report is ready',
    message: 'Your Complete Blood Count (CBC) report is now available for download.',
    isRead: false,
    actionUrl: '/reports/1',
    createdAt: new Date('2024-09-22')
  },
  {
    id: '2',
    userId: '1',
    type: 'sample_collected',
    title: 'Sample collected successfully',
    message: 'Your samples have been collected by our technician Ravi Kumar.',
    isRead: true,
    readAt: new Date('2024-09-21'),
    createdAt: new Date('2024-09-21')
  }
];

// Mock Pincode Data
export const mockPincodeData: PincodeInfo[] = [
  {
    pincode: '400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    isServiceable: true,
    estimatedDelivery: 1,
    collectionCharges: 0
  },
  {
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    isServiceable: true,
    estimatedDelivery: 1,
    collectionCharges: 0
  },
  {
    pincode: '560001',
    city: 'Bangalore',
    state: 'Karnataka',
    isServiceable: true,
    estimatedDelivery: 2,
    collectionCharges: 50
  },
  {
    pincode: '999999',
    city: 'Remote Area',
    state: 'Unknown',
    isServiceable: false
  }
];