import React from 'react';
import { FaRecycle, FaLeaf, FaTrophy, FaGift, FaCalendarAlt, FaBoxOpen, FaStore } from 'react-icons/fa';

const DashboardTab = ({ userData, setActiveTab }) => {
  // Progress bar component
  const ProgressBar = ({ progress, target, color = "bg-green-500" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`${color} h-2.5 rounded-full transition-all duration-700 ease-in-out`} 
        style={{ width: `${Math.min(100, (progress / target) * 100)}%` }}
      ></div>
    </div>
  );

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
          icon={<FaRecycle className="text-green-600 text-xl" />} 
          title="Total Recycled" 
          value={`${userData.totalRecycled} kg`} 
          subtitle="This month"
          color="bg-green-100"
        />
        <StatCard 
          icon={<FaLeaf className="text-green-600 text-xl" />} 
          title="CO₂ Saved" 
          value={`${userData.co2Saved} kg`} 
          subtitle="This month"
          color="bg-green-100"
        />
        <StatCard 
          icon={<FaTrophy className="text-yellow-500 text-xl" />} 
          title="Active Challenges" 
          value={userData.challenges.length} 
          subtitle="Ongoing"
          color="bg-yellow-100"
        />
        <StatCard 
          icon={<FaGift className="text-blue-500 text-xl" />} 
          title="Reward Points" 
          value={userData.points} 
          subtitle="Redeem now"
          color="bg-blue-100"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pickup Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Pickup Overview</h3>
            <button 
              onClick={() => setActiveTab('pickups')}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="mb-8">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FaCalendarAlt className="mr-2 text-green-500" /> Upcoming Pickups
            </h4>
            <div className="space-y-4">
              {userData.upcomingPickups.map((pickup) => (
                <div key={pickup.id} className="flex justify-between items-center p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
                  <div>
                    <p className="font-medium">{pickup.date}</p>
                    <p className="text-sm text-gray-600">{pickup.items}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {pickup.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <FaBoxOpen className="mr-2 text-gray-500" /> Past Pickups
            </h4>
            <div className="space-y-4">
              {userData.pastPickups.map((pickup) => (
                <div key={pickup.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">{pickup.date}</p>
                    <p className="text-sm text-gray-600">{pickup.items}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {pickup.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Challenges & Rewards */}
        <div className="space-y-6">
          {/* Challenges Progress */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Challenge Progress</h3>
              <button 
                onClick={() => setActiveTab('challenges')}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                View All
              </button>
            </div>
            
            <div className="space-y-6">
              {userData.challenges.map((challenge) => (
                <div key={challenge.id}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{challenge.name}</span>
                    <span className="text-sm text-gray-600">{challenge.progress}/{challenge.target}</span>
                  </div>
                  <ProgressBar progress={challenge.progress} target={challenge.target} />
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              Join New Challenge
            </button>
          </div>
          
          {/* Rewards Snapshot */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Rewards Snapshot</h3>
            <p className="text-3xl font-bold mb-4">{userData.points} pts</p>
            <p className="mb-6 opacity-90">Redeem your points for exciting rewards!</p>
            <button 
              onClick={() => setActiveTab('rewards')}
              className="w-full py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Redeem Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Marketplace Shortcut */}
      <div className="mt-6 bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">Marketplace</h3>
            <p className="text-gray-600">Sell your recycled items or buy eco-friendly products</p>
          </div>
          <button 
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            <FaStore className="mr-2" /> List Items for Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;