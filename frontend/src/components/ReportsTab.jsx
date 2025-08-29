import React, { useState } from 'react';
import { FaChartBar, FaDownload, FaFileExport, FaCalendarAlt } from 'react-icons/fa';

const ReportsTab = () => {
  const [reportType, setReportType] = useState('usage');
  const [timeRange, setTimeRange] = useState('monthly');

  const reportTypes = [
    { id: 'usage', name: 'Usage Statistics' },
    { id: 'recycling', name: 'Recycling Impact' },
    { id: 'user', name: 'User Activity' },
    { id: 'financial', name: 'Financial Summary' }
  ];

  const timeRanges = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'yearly', name: 'Yearly' }
  ];

  const handleGenerateReport = () => {
    // In a real app, this would generate the report
    console.log(`Generating ${reportType} report for ${timeRange}`);
  };

  const handleExportReport = (format) => {
    // In a real app, this would export the report
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
          <p className="text-gray-600">Generate and export detailed system reports</p>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {reportTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={handleGenerateReport}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <FaChartBar className="mr-2" /> Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Report Preview</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExportReport('pdf')}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FaFileExport className="mr-2" /> Export PDF
            </button>
            <button
              onClick={() => handleExportReport('csv')}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaDownload className="mr-2" /> Export CSV
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-2">Usage Statistics Report</h4>
          <p className="text-gray-600 mb-6">June 2023</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chart */}
            <div>
              <h5 className="font-medium text-gray-700 mb-4">User Activity</h5>
              <div className="h-64 flex items-end space-x-2 justify-center">
                {[120, 250, 180, 320, 280, 400, 350].map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 ease-in-out hover:opacity-75"
                      style={{ height: `${(value / 400) * 100}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats */}
            <div>
              <h5 className="font-medium text-gray-700 mb-4">Key Metrics</h5>
              <div className="space-y-4">
                {[
                  { label: "Total Users", value: "12,420", change: "+12%" },
                  { label: "Active Users", value: "8,750", change: "+8%" },
                  { label: "New Signups", value: "1,240", change: "+15%" },
                  { label: "Avg. Session", value: "12m 30s", change: "+5%" }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{stat.label}</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{stat.value}</p>
                      <p className="text-green-600 text-sm">{stat.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Reports</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, name: "June 2023 Usage Report", date: "2023-07-01", type: "Usage", status: "Completed" },
                { id: 2, name: "Q2 Recycling Impact", date: "2023-06-30", type: "Recycling", status: "Completed" },
                { id: 3, name: "User Activity Analysis", date: "2023-06-25", type: "User", status: "Completed" },
                { id: 4, name: "May 2023 Financial", date: "2023-06-01", type: "Financial", status: "Completed" }
              ].map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <FaDownload />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaFileExport />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;
