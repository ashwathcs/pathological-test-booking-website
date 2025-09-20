// Report management controller hook
import { useState, useEffect, useCallback } from 'react';
import { Report, ReportSummary, ReportDownloadInfo } from '@/models';
import { reportService } from '@/services';
import { useAuth } from './useAuth';

export const useReports = () => {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReports = useCallback(async () => {
    if (!isAuthenticated) {
      setReports([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const reportsData = await reportService.getUserReports();
      setReports(reportsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  return {
    reports,
    isLoading,
    error,
    refetch: loadReports,
  };
};

export const useReport = (reportId: string | null) => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReport = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const reportData = await reportService.getReport(id);
      setReport(reportData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (reportId) {
      loadReport(reportId);
    } else {
      setReport(null);
    }
  }, [reportId, loadReport]);

  return {
    report,
    isLoading,
    error,
    refetch: reportId ? () => loadReport(reportId) : undefined,
  };
};

export const useReportDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = useCallback(async (reportId: string): Promise<ReportDownloadInfo | null> => {
    setIsDownloading(true);
    setError(null);
    try {
      const downloadInfo = await reportService.downloadReport(reportId);
      return downloadInfo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download report');
      return null;
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const shareReport = useCallback(async (reportId: string, email: string) => {
    setIsDownloading(true);
    setError(null);
    try {
      const result = await reportService.shareReport(reportId, email);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share report');
      return { success: false, error: 'Failed to share report' };
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    downloadReport,
    shareReport,
    isDownloading,
    error,
  };
};

// Hook for report management (staff/admin)
export const useReportManagement = () => {
  const { hasAnyRole } = useAuth();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canManageReports = hasAnyRole(['admin', 'staff']);

  const loadAllReports = useCallback(async () => {
    if (!canManageReports) return;

    setIsLoading(true);
    setError(null);
    try {
      const reportsData = await reportService.getAllReports();
      setReports(reportsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, [canManageReports]);

  const updateReportStatus = useCallback(async (reportId: string, status: Report['status']) => {
    if (!canManageReports) {
      throw new Error('Unauthorized');
    }

    try {
      const result = await reportService.updateReportStatus(reportId, status);
      if (result.success) {
        await loadAllReports(); // Refresh reports
      }
      return result;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update report status');
    }
  }, [canManageReports, loadAllReports]);

  useEffect(() => {
    if (canManageReports) {
      loadAllReports();
    }
  }, [canManageReports, loadAllReports]);

  return {
    reports,
    isLoading,
    error,
    canManageReports,
    refetch: loadAllReports,
    updateReportStatus,
  };
};

// Hook for report utilities
export const useReportUtils = () => {
  return {
    getStatusDisplay: reportService.getReportStatusDisplay,
    getStatusColor: reportService.getReportStatusColor,
    isDownloadable: reportService.isReportDownloadable,
    isExpired: reportService.isReportExpired,
    getParameterStatusColor: reportService.getParameterStatusColor,
    formatParameterValue: reportService.formatParameterValue,
  };
};