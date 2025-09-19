import { useState } from "react"
import { Download, Eye, Calendar, FileText, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Report = {
  id: string
  orderNumber: string
  patientName: string
  testDate: string
  reportDate: string
  tests: string[]
  status: "available" | "processing" | "pending"
  downloadUrl?: string
  fileSize?: string
}

export function ReportsAccess() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // Mock reports data //todo: remove mock functionality
  const reports: Report[] = [
    {
      id: "RPT001",
      orderNumber: "ORD123456",
      patientName: "Sarah Johnson",
      testDate: "2024-01-18",
      reportDate: "2024-01-20",
      tests: ["Complete Blood Count", "Lipid Profile"],
      status: "available",
      downloadUrl: "#",
      fileSize: "2.3 MB"
    },
    {
      id: "RPT002",
      orderNumber: "ORD123457",
      patientName: "Sarah Johnson", 
      testDate: "2024-01-15",
      reportDate: "2024-01-17",
      tests: ["Liver Function Test", "Kidney Function Test"],
      status: "available",
      downloadUrl: "#",
      fileSize: "1.8 MB"
    },
    {
      id: "RPT003",
      orderNumber: "ORD123458",
      patientName: "Sarah Johnson",
      testDate: "2024-01-20",
      reportDate: "2024-01-22",
      tests: ["Thyroid Profile", "HbA1c"],
      status: "processing",
      fileSize: "2.1 MB"
    },
    {
      id: "RPT004",
      orderNumber: "ORD123459", 
      patientName: "Sarah Johnson",
      testDate: "2024-01-22",
      reportDate: "2024-01-24",
      tests: ["Vitamin D", "B12"],
      status: "pending"
    }
  ]

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.tests.some(test => 
      test.toLowerCase().includes(searchTerm.toLowerCase())
    ) || report.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || report.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case "available":
        return "bg-chart-2 text-white"
      case "processing":
        return "bg-yellow-500 text-white"
      case "pending":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleDownload = (report: Report) => {
    console.log('Downloading report:', report.id)
    // Simulate download
    alert(`Downloading ${report.tests.join(', ')} report...`)
  }

  const handleView = (report: Report) => {
    setSelectedReport(report)
  }

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-foreground">My Reports</h2>
          <p className="text-muted-foreground">Access and download your pathological test reports</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search reports by test name or order number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-reports"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[200px]" data-testid="select-filter-status">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports Grid */}
        <div className="space-y-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover-elevate" data-testid={`card-report-${report.id}`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  {/* Report Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground" data-testid={`text-order-${report.id}`}>
                          Order #{report.orderNumber}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`text-patient-${report.id}`}>
                          {report.patientName}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Test Date</p>
                          <p className="text-foreground font-medium" data-testid={`text-test-date-${report.id}`}>
                            {new Date(report.testDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Report Date</p>
                          <p className="text-foreground font-medium" data-testid={`text-report-date-${report.id}`}>
                            {report.reportDate ? new Date(report.reportDate).toLocaleDateString() : 'TBD'}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Status</p>
                        <Badge 
                          className={`${getStatusColor(report.status)} mt-1`}
                          data-testid={`badge-status-${report.id}`}
                        >
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    {/* Tests */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Tests Included</p>
                      <div className="flex flex-wrap gap-2">
                        {report.tests.map((test, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            data-testid={`badge-test-${report.id}-${index}`}
                          >
                            {test}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:ml-6">
                    {report.status === "available" ? (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full lg:w-auto"
                              onClick={() => handleView(report)}
                              data-testid={`button-view-${report.id}`}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Report
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Report Preview - Order #{report.orderNumber}</DialogTitle>
                            </DialogHeader>
                            <div className="bg-muted/30 rounded-lg p-8 text-center">
                              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                              <p className="text-muted-foreground">
                                Report preview would be displayed here
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Tests: {report.tests.join(', ')}
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          className="w-full lg:w-auto"
                          onClick={() => handleDownload(report)}
                          data-testid={`button-download-${report.id}`}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        
                        {report.fileSize && (
                          <p className="text-xs text-center text-muted-foreground" data-testid={`text-filesize-${report.id}`}>
                            {report.fileSize}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="text-center">
                        <Button disabled className="w-full lg:w-auto">
                          {report.status === "processing" ? "Processing..." : "Report Pending"}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          {report.status === "processing" 
                            ? "Report will be ready soon" 
                            : "Sample collection pending"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "all" 
                  ? "No reports match your search criteria"
                  : "You don't have any test reports yet"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-2">Report Access</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Reports are available 24-48 hours after sample collection</li>
                  <li>• You'll receive SMS/email notifications when ready</li>
                  <li>• All reports are digitally signed and certified</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Technical Support</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Having trouble downloading? Contact our support</li>
                  <li>• Reports are secured with password protection</li>
                  <li>• Available in PDF format for easy sharing</li>
                </ul>
              </div>
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline" data-testid="button-contact-support">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}