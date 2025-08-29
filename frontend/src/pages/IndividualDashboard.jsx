import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRecycle, FaCalendarAlt, FaTrophy, FaGift, FaLeaf, FaStore, FaBars, FaTimes, FaChartLine, FaBoxOpen, FaUser } from 'react-icons/fa';
import DashboardTab from '../components/DashboardTab';
import PickupsTab from '../components/PickupsTab';
import ChallengesTab from '../components/ChallengesTab';
import RewardsTab from '../components/RewardsTab';
import MarketplaceTab from '../components/MarketplaceTab';
import ProfileTab from '../components/ProfileTab';
import { useAuth } from '../context/AuthContext';

const IndividualDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();
  
  // Mock data - in a real app this would come from an API
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    points: 1250,
    totalRecycled: 42.5,
    co2Saved: 128.3,
    challenges: [
      { id: 1, name: "Plastic Warrior", progress: 75, target: 100 },
      { id: 2, name: "Paper Saver", progress: 40, target: 50 },
      { id: 3, name: "E-Waste Hero", progress: 20, target: 30 }
    ],
    upcomingPickups: [
      { id: 1, date: "2023-06-15", items: "Plastic, Paper", status: "Scheduled" },
      { id: 2, date: "2023-06-22", items: "Glass, Metal", status: "Scheduled" }
    ],
    pastPickups: [
      { id: 3, date: "2023-06-01", items: "Plastic, Paper", status: "Completed" },
      { id: 4, date: "2023-05-25", items: "E-waste", status: "Completed" }
    ],
    profile: {
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Green Street, Eco City",
      memberSince: "2022-01-15"
    }
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
      case 'dashboard':
        return <DashboardTab userData={userData} setActiveTab={setActiveTab} />;
      case 'pickups':
        return <PickupsTab userData={userData} />;
      case 'challenges':
        return <ChallengesTab userData={userData} />;
      case 'rewards':
        return <RewardsTab userData={userData} />;
      case 'marketplace':
        return <MarketplaceTab />;
      case 'profile':
        return <ProfileTab userData={userData} />;
      default:
        return <DashboardTab userData={userData} setActiveTab={setActiveTab} />;
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
            <FaLeaf className="mr-2 text-green-300" /> EcoTrack
          </h1>
        </div>
        <nav className="mt-5">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
            { id: 'pickups', label: 'Pickups', icon: <FaCalendarAlt /> },
            { id: 'challenges', label: 'Challenges', icon: <FaTrophy /> },
            { id: 'rewards', label: 'Rewards', icon: <FaGift /> },
            { id: 'marketplace', label: 'Marketplace', icon: <FaStore /> },
            { id: 'profile', label: 'Profile', icon: <FaUser /> }
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
            <h2 className="text-xl font-semibold text-gray-800">Welcome back, {userData.name}!</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <FaGift className="text-green-600 mr-2" />
                <span className="font-medium text-green-800">{userData.points} pts</span>
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

export default IndividualDashboard;