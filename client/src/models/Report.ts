// Report domain models and interfaces

export interface Report {
  id: string;
  orderId: string;
  userId: string;
  patientName: string;
  tests: ReportTest[];
  status: ReportStatus;
  generatedAt?: Date;
  downloadUrl?: string;
  validUntil?: Date;
  reportedBy: {
    doctorName: string;
    signature?: string;
    qualification: string;
    registrationNumber: string;
  };
  labInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    nabLicense: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportTest {
  testId: string;
  testName: string;
  parameters: ReportParameter[];
  interpretation?: string;
  recommendations?: string[];
}

export interface ReportParameter {
  name: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: ParameterStatus;
  note?: string;
}

export type ReportStatus = 
  | 'pending'
  | 'in_progress' 
  | 'ready'
  | 'delivered'
  | 'expired';

export type ParameterStatus = 'normal' | 'high' | 'low' | 'critical';

export interface ReportSummary {
  id: string;
  orderId: string;
  patientName: string;
  testNames: string[];
  status: ReportStatus;
  generatedAt?: Date;
  isDownloadable: boolean;
}

export interface ReportDownloadInfo {
  reportId: string;
  filename: string;
  fileSize: number;
  downloadUrl: string;
  expiresAt: Date;
}