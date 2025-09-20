// Report service with mock data
import { Report, ReportSummary, ReportDownloadInfo } from '@/models';
import { mockReports } from './mockData';
import { authService } from './AuthService';

class ReportService {
  private reports: Report[] = [...mockReports];

  async getUserReports(): Promise<ReportSummary[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];

    return this.reports
      .filter(report => report.userId === currentUser.id)
      .map(report => ({
        id: report.id,
        orderId: report.orderId,
        patientName: report.patientName,
        testNames: report.tests.map(test => test.testName),
        status: report.status,
        generatedAt: report.generatedAt,
        isDownloadable: report.status === 'ready' && !!report.downloadUrl
      }))
      .sort((a, b) => {
        const aDate = a.generatedAt || new Date(0);
        const bDate = b.generatedAt || new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
  }

  async getReport(reportId: string): Promise<Report | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const currentUser = authService.getCurrentUser();
    if (!currentUser) return null;

    const report = this.reports.find(report => report.id === reportId);
    
    // Check if user owns this report or is admin/staff
    if (report && (report.userId === currentUser.id || currentUser.role === 'admin' || currentUser.role === 'staff')) {
      return report;
    }

    return null;
  }

  async downloadReport(reportId: string): Promise<ReportDownloadInfo | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const report = await this.getReport(reportId);
    if (!report || report.status !== 'ready') return null;

    // In a real app, this would generate a secure download URL
    return {
      reportId: report.id,
      filename: `${report.patientName}_${report.id}_Report.pdf`,
      fileSize: 1024 * 1024, // 1MB mock size
      downloadUrl: `/api/reports/${reportId}/download`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Expires in 24 hours
    };
  }

  async shareReport(reportId: string, email: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const report = await this.getReport(reportId);
    if (!report) {
      return { success: false, error: 'Report not found' };
    }

    if (report.status !== 'ready') {
      return { success: false, error: 'Report is not ready for sharing' };
    }

    // In a real app, this would send email with report link
    console.log(`Sharing report ${reportId} to ${email}`);
    
    return { success: true };
  }

  // Admin/Staff methods
  async getAllReports(): Promise<ReportSummary[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentUser = authService.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      throw new Error('Unauthorized access');
    }

    return this.reports
      .map(report => ({
        id: report.id,
        orderId: report.orderId,
        patientName: report.patientName,
        testNames: report.tests.map(test => test.testName),
        status: report.status,
        generatedAt: report.generatedAt,
        isDownloadable: report.status === 'ready' && !!report.downloadUrl
      }))
      .sort((a, b) => {
        const aDate = a.generatedAt || new Date(0);
        const bDate = b.generatedAt || new Date(0);
        return bDate.getTime() - aDate.getTime();
      });
  }

  async updateReportStatus(reportId: string, status: Report['status']): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentUser = authService.getCurrentUser();
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'staff')) {
      return { success: false, error: 'Unauthorized to update report status' };
    }

    const reportIndex = this.reports.findIndex(report => report.id === reportId);
    if (reportIndex === -1) {
      return { success: false, error: 'Report not found' };
    }

    this.reports[reportIndex] = {
      ...this.reports[reportIndex],
      status,
      generatedAt: status === 'ready' ? new Date() : this.reports[reportIndex].generatedAt,
      updatedAt: new Date()
    };

    return { success: true };
  }

  // Helper methods for business logic
  getReportStatusDisplay(status: Report['status']): string {
    const statusMap = {
      'pending': 'Pending',
      'in_progress': 'In Progress',
      'ready': 'Ready',
      'delivered': 'Delivered',
      'expired': 'Expired'
    };
    return statusMap[status];
  }

  getReportStatusColor(status: Report['status']): string {
    const colorMap = {
      'pending': 'orange',
      'in_progress': 'blue',
      'ready': 'green',
      'delivered': 'gray',
      'expired': 'red'
    };
    return colorMap[status];
  }

  isReportDownloadable(report: Report): boolean {
    return report.status === 'ready' && !!report.downloadUrl;
  }

  isReportExpired(report: Report): boolean {
    if (!report.validUntil) return false;
    return new Date() > report.validUntil;
  }

  getParameterStatusColor(status: Report['tests'][0]['parameters'][0]['status']): string {
    const colorMap = {
      'normal': 'green',
      'high': 'orange',
      'low': 'orange',
      'critical': 'red'
    };
    return colorMap[status];
  }

  formatParameterValue(parameter: Report['tests'][0]['parameters'][0]): string {
    return `${parameter.value} ${parameter.unit}`;
  }
}

// Export singleton instance
export const reportService = new ReportService();
export { ReportService };