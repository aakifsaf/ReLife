import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaTrophy, FaGift, FaChartBar, FaBars, FaTimes, FaUser, FaRecycle } from 'react-icons/fa';
import SystemOverviewTab from '../components/SystemOverviewTab';
import ChallengeManagementTab from '../components/ChallengeManagementTab';
import RewardManagementTab from '../components/RewardManagementTab';
import UserManagementTab from '../components/UserManagementTab';
import ReportsTab from '../components/ReportsTab';
import { useAuth } from '../context/AuthContext';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { user, logout } = useAuth();
  
  // Mock data - in a real app this would come from an API
  const [systemData, setSystemData] = useState({
    totalUsers: 12420,
    totalPickups: 8750,
    verifiedCenters: 142,
    activeChallenges: 8,
    totalRewards: 45,
    redeemedRewards: 3280,
    userData: [
      { id: 1, name: "Alex Johnson", email: "alex@example.com", type: "Individual", status: "Active", joinDate: "2023-01-15" },
      { id: 2, name: "Green Valley Center", email: "contact@greenvalley.com", type: "Center", status: "Verified", joinDate: "2022-11-03" },
      { id: 3, name: "Maria Garcia", email: "maria.g@example.com", type: "Individual", status: "Active", joinDate: "2023-02-28" },
      { id: 4, name: "EcoTech Solutions", email: "info@ecotech.com", type: "Center", status: "Pending", joinDate: "2023-05-10" }
    ],
    challengeData: [
      { id: 1, name: "Plastic Warrior", participants: 1250, progress: 75, target: 100, status: "Active" },
      { id: 2, name: "Paper Saver", participants: 980, progress: 40, target: 50, status: "Active" },
      { id: 3, name: "E-Waste Hero", participants: 650, progress: 20, target: 30, status: "Active" }
    ],
    rewardData: [
      { id: 1, name: "Eco-Friendly Water Bottle", points: 500, redemptions: 120, stock: 50 },
      { id: 2, name: "Recycled Notebook Set", points: 300, redemptions: 240, stock: 30 },
      { id: 3, name: "$10 Discount Coupon", points: 200, redemptions: 420, stock: 200 }
    ]
  });

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (sidebarOpen) setSidebarOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  // Render active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return <SystemOverviewTab systemData={systemData} />;
      case 'challenges':
        return <ChallengeManagementTab challengeData={systemData.challengeData} />;
      case 'rewards':
        return <RewardManagementTab rewardData={systemData.rewardData} />;
      case 'users':
        return <UserManagementTab userData={systemData.userData} />;
      case 'reports':
        return <ReportsTab />;
      default:
        return <SystemOverviewTab systemData={systemData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-green-600 text-white"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-20 h-full bg-green-800 text-white w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-5 border-b border-green-700">
          <h1 className="text-2xl font-bold flex items-center">
            <FaRecycle className="mr-2 text-green-300" /> EcoAdmin
          </h1>
        </div>
        <nav className="mt-5">
          {[
            { id: 'overview', label: 'System Overview', icon: <FaChartBar /> },
            { id: 'challenges', label: 'Challenge Management', icon: <FaTrophy /> },
            { id: 'rewards', label: 'Reward Management', icon: <FaGift /> },
            { id: 'users', label: 'User Management', icon: <FaUsers /> },
            { id: 'reports', label: 'Reports', icon: <FaChartBar /> }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? 'bg-green-700 border-l-4 border-green-300' 
                  : 'hover:bg-green-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 bg-green-900">
          <button 
            onClick={handleLogout}
            className="w-full py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <FaUsers className="text-green-600 mr-2" />
                <span className="font-medium text-green-800">{systemData.totalUsers} users</span>
              </div>
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <FaUser className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-4 md:p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
