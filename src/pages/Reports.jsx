import { useState } from 'react'
import ReportForm from '../components/ReportForm'
import IssueCard from '../components/IssueCard'
import ReportTable from '../components/ReportTable'

function Reports() {
  const [submittedReports, setSubmittedReports] = useState([])

  const handleFormSubmit = (formData) => {
    const newReport = {
      id: submittedReports.length + 1,
      ...formData,
      status: 'Pending'
    }
    setSubmittedReports([newReport, ...submittedReports])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Form and Issue Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <ReportForm onSubmit={handleFormSubmit} />
        </div>
        <div>
          <IssueCard />
        </div>
      </div>

      {/* Reports Table Section */}
      {submittedReports.length > 0 && (
        <div className="mt-12">
          <ReportTable reports={submittedReports} />
        </div>
      )}
    </div>
  )
}

export default Reports
