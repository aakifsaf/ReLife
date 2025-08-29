import React from 'react';
import { FaUsers, FaCalendarAlt, FaRecycle, FaTrophy, FaGift, FaChartBar } from 'react-icons/fa';

const SystemOverviewTab = ({ systemData }) => {
  // Stat card component
  const StatCard = ({ icon, title, value, subtitle, color = "bg-green-100" }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center">
        <div className={`${color} p-3 rounded-lg mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FaUsers className="text-green-600 text-xl" />} 
          title="Total Users" 
          value={systemData.totalUsers.toLocaleString()} 
          subtitle="Active accounts"
          color="bg-green-100"
        />
        <StatCard 
          icon={<FaCalendarAlt className="text-blue-500 text-xl" />} 
          title="Total Pickups" 
          value={systemData.totalPickups.toLocaleString()} 
          subtitle="Completed this month"
          color="bg-blue-100"
        />
        <StatCard 
          icon={<FaRecycle className="text-purple-500 text-xl" />} 
          title="Verified Centers" 
          value={systemData.verifiedCenters} 
          subtitle="Active recycling centers"
          color="bg-purple-100"
        />
        <StatCard 
          icon={<FaTrophy className="text-yellow-500 text-xl" />} 
          title="Active Challenges" 
          value={systemData.activeChallenges} 
          subtitle="Ongoing campaigns"
          color="bg-yellow-100"
        />
      </div>

      {/* System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { id: 1, user: "Alex Johnson", action: "completed pickup", time: "2 minutes ago" },
              { id: 2, user: "Green Valley Center", action: "processed 450kg plastic", time: "15 minutes ago" },
              { id: 3, user: "Maria Garcia", action: "joined 'Paper Saver' challenge", time: "1 hour ago" },
              { id: 4, user: "EcoTech Solutions", action: "verified account", time: "3 hours ago" },
              { id: 5, user: "Robert Chen", action: "redeemed reward", time: "5 hours ago" }
            ].map((activity) => (
              <div key={activity.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FaUsers className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.user} <span className="text-gray-600 font-normal">{activity.action}</span></p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Reward Redemptions</h3>
            <p className="text-3xl font-bold mb-4">{systemData.redeemedRewards.toLocaleString()}</p>
            <p className="opacity-90">Total rewards claimed</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Health</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">API Response Time</span>
                  <span className="text-sm text-gray-600">120ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">Database Uptime</span>
                  <span className="text-sm text-gray-600">99.98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">Server Load</span>
                  <span className="text-sm text-gray-600">24%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
          <div className="h-64 flex items-end space-x-2 justify-center">
            {[120, 250, 180, 320, 280, 400, 350].map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 ease-in-out hover:opacity-75"
                  style={{ height: `${(value / 400) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Participation */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Challenge Participation</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-400">
              <div className="absolute inset-4 bg-white rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">78%</p>
                  <p className="text-gray-600">Participation</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { name: "Plastic Warrior", color: "bg-blue-500" },
              { name: "Paper Saver", color: "bg-green-500" },
              { name: "E-Waste Hero", color: "bg-purple-500" },
              { name: "Glass Genius", color: "bg-yellow-500" }
            ].map((challenge, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 ${challenge.color} rounded-full mr-2`}></div>
                <span className="text-sm text-gray-700">{challenge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverviewTab;
