import React, { useState } from 'react';
import { FaChartBar, FaRecycle, FaLeaf } from 'react-icons/fa';

const CompletedStatsTab = ({ centerData }) => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Mock data for charts
  const materialData = [
    { name: 'Plastic', value: centerData.monthlyStats.plastic, color: 'bg-blue-500' },
    { name: 'Paper', value: centerData.monthlyStats.paper, color: 'bg-green-500' },
    { name: 'Metal', value: centerData.monthlyStats.metal, color: 'bg-yellow-500' },
    { name: 'Glass', value: centerData.monthlyStats.glass, color: 'bg-purple-500' },
    { name: 'Electronics', value: centerData.monthlyStats.electronics, color: 'bg-red-500' }
  ];

  const totalProcessed = materialData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Completed Statistics</h2>
        <div className="flex space-x-2">
          {['daily', 'weekly', 'monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaRecycle className="text-white text-xl" />
            </div>
            <div>
              <p className="text-green-100">Total Processed</p>
              <p className="text-3xl font-bold">{centerData.totalProcessed} kg</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div>
              <p className="text-blue-100">CO₂ Saved</p>
              <p className="text-3xl font-bold">{centerData.co2Saved} kg</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaChartBar className="text-white text-xl" />
            </div>
            <div>
              <p className="text-purple-100">Efficiency</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Material Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Breakdown</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Quantity by Material</h4>
              <div className="space-y-4">
                {materialData.map((material) => (
                  <div key={material.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{material.name}</span>
                      <span className="text-gray-600">{material.value} kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`${material.color} h-4 rounded-full`} 
                        style={{ width: `${(material.value / totalProcessed) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pie Chart Visualization */}
            <div>
              <h4 className="font-medium text-gray-700 mb-4">Distribution</h4>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
                  <div className="absolute inset-4 bg-white rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-800">{totalProcessed} kg</p>
                      <p className="text-gray-600">Total</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {materialData.map((material, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 ${material.color} rounded-full mr-2`}></div>
                    <span className="text-sm text-gray-700">{material.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Processing Activity</h3>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CO₂ Saved</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, date: "2023-06-15", material: "Plastic", quantity: "150 kg", co2: "400 kg", status: "Completed" },
                  { id: 2, date: "2023-06-15", material: "Paper", quantity: "220 kg", co2: "550 kg", status: "Completed" },
                  { id: 3, date: "2023-06-14", material: "Metal", quantity: "95 kg", co2: "320 kg", status: "Completed" },
                  { id: 4, date: "2023-06-14", material: "Glass", quantity: "180 kg", co2: "280 kg", status: "Completed" },
                  { id: 5, date: "2023-06-13", material: "Electronics", quantity: "75 kg", co2: "180 kg", status: "Completed" }
                ].map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{activity.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.material}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{activity.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{activity.co2}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedStatsTab;
