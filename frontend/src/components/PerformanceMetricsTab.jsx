import React, { useState } from 'react';
import { FaChartLine, FaRecycle, FaLeaf, FaTachometerAlt } from 'react-icons/fa';

const PerformanceMetricsTab = ({ centerData }) => {
  const [timeRange, setTimeRange] = useState('monthly');
  
  // Mock performance data
  const performanceData = centerData.performanceData;
  
  // Calculate weekly averages
  const avgWeeklyVolume = performanceData.weeklyVolume.reduce((a, b) => a + b, 0) / performanceData.weeklyVolume.length;
  const avgWeeklyCO2 = performanceData.weeklyCO2.reduce((a, b) => a + b, 0) / performanceData.weeklyCO2.length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Performance Metrics</h2>
          <p className="text-gray-600">Track your recycling center's impact and efficiency</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {['weekly', 'monthly', 'yearly'].map((range) => (
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaRecycle className="text-white text-xl" />
            </div>
            <div>
              <p className="text-green-100">Weekly Avg. Volume</p>
              <p className="text-2xl font-bold">{avgWeeklyVolume.toFixed(0)} kg</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaLeaf className="text-white text-xl" />
            </div>
            <div>
              <p className="text-blue-100">Weekly Avg. CO₂ Saved</p>
              <p className="text-2xl font-bold">{avgWeeklyCO2.toFixed(0)} kg</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaTachometerAlt className="text-white text-xl" />
            </div>
            <div>
              <p className="text-purple-100">Operational Efficiency</p>
              <p className="text-2xl font-bold">{performanceData.efficiency}%</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <p className="text-yellow-100">Growth Rate</p>
              <p className="text-2xl font-bold">+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Volume & CO₂ Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Volume Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Processing Volume</h3>
          <div className="h-64 flex items-end space-x-2 justify-center">
            {performanceData.weeklyVolume.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 ease-in-out hover:opacity-75"
                  style={{ height: `${(value / 2500) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Total: {performanceData.weeklyVolume.reduce((a, b) => a + b, 0).toLocaleString()} kg this week</p>
          </div>
        </div>

        {/* CO₂ Saved Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly CO₂ Saved</h3>
          <div className="h-64 flex items-end space-x-2 justify-center">
            {performanceData.weeklyCO2.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 ease-in-out hover:opacity-75"
                  style={{ height: `${(value / 700) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Total: {performanceData.weeklyCO2.reduce((a, b) => a + b, 0).toLocaleString()} kg this week</p>
          </div>
        </div>
      </div>

      {/* Efficiency Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Efficiency Gauge */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Operational Efficiency</h3>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-green-500 clip-path-half"
                style={{ 
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((performanceData.efficiency * 1.8 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((performanceData.efficiency * 1.8 - 90) * Math.PI / 180)}%)` 
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800">{performanceData.efficiency}%</p>
                  <p className="text-gray-600">Efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Material Processing Efficiency */}
        <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Processing Efficiency</h3>
          <div className="space-y-4">
            {[
              { material: "Plastic", efficiency: 92, color: "bg-blue-500" },
              { material: "Paper", efficiency: 88, color: "bg-green-500" },
              { material: "Metal", efficiency: 95, color: "bg-yellow-500" },
              { material: "Glass", efficiency: 85, color: "bg-purple-500" },
              { material: "Electronics", efficiency: 78, color: "bg-red-500" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">{item.material}</span>
                  <span className="text-gray-600">{item.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`${item.color} h-2.5 rounded-full transition-all duration-700 ease-in-out`} 
                    style={{ width: `${item.efficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Environmental Impact</h3>
        <p className="mb-6 opacity-90">Your center's contribution to environmental sustainability</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-3xl font-bold mb-1">1,250 kg</p>
            <p>CO₂ Saved This Month</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-3xl font-bold mb-1">420 trees</p>
            <p>Equivalent Saved</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-3xl font-bold mb-1">12,500 kWh</p>
            <p>Energy Conserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetricsTab;
