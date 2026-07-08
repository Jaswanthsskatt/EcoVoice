import { FaEye } from "react-icons/fa";

function ReportTable({ reports = [] }) {

  const badge = (status) => {

    if (status === "Resolved")
      return "bg-green-100 text-green-700";

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    return "bg-blue-100 text-blue-700";
  };

  return (

    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        Track Your Reports
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">#</th>

              <th className="text-left">Issue</th>

              <th className="text-left">Location</th>

              <th className="text-left">Status</th>

              <th className="text-left">Action</th>

            </tr>

          </thead>

          <tbody>

            {reports.length > 0 ? (
              reports.map((report) => (

              <tr
                key={report.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">
                  {report.id}
                </td>

                <td>{report.issue}</td>

                <td>{report.location}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${badge(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>

                </td>

                <td>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    <FaEye size={16} />
                    View
                  </button>
                </td>

              </tr>

            ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No reports submitted yet
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ReportTable;