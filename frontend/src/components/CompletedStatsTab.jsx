import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

  const weeklyVolumeData = [
    { name: 'Week 1', volume: centerData.performanceData.weeklyVolume[0], co2: centerData.performanceData.weeklyCO2[0] },
    { name: 'Week 2', volume: centerData.performanceData.weeklyVolume[1], co2: centerData.performanceData.weeklyCO2[1] },
    { name: 'Week 3', volume: centerData.performanceData.weeklyVolume[2], co2: centerData.performanceData.weeklyCO2[2] },
    { name: 'Week 4', volume: centerData.performanceData.weeklyVolume[3], co2: centerData.performanceData.weeklyCO2[3] }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Recycling Statistics</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1 rounded-full text-sm ${timeRange === 'weekly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 rounded-full text-sm ${timeRange === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Material Distribution Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Material Distribution</h3>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {materialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <h4 className="font-medium text-gray-700 mb-3">Material Types</h4>
            <div className="space-y-2">
              {materialData.map((material, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 rounded ${material.color} mr-2`}></div>
                  <span className="text-sm text-gray-600">{material.name}</span>
                  <span className="ml-auto text-sm font-medium">{material.value} kg</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Volume and CO2 Saved */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Volume & CO2 Saved</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyVolumeData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="volume" name="Volume (kg)" fill="#3B82F6" />
              <Bar yAxisId="right" dataKey="co2" name="CO2 Saved (kg)" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Processed</p>
              <p className="text-2xl font-bold">{centerData.totalProcessed} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">CO2 Saved</p>
              <p className="text-2xl font-bold">{centerData.monthlyStats.co2_saved} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed Pickups</p>
              <p className="text-2xl font-bold">{centerData.completedPickups}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedStatsTab;