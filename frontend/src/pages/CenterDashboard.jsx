import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRecycle, FaCalendarAlt, FaChartBar, FaStore, FaBars, FaTimes, FaBoxOpen, FaUser, FaCheck, FaHistory } from 'react-icons/fa';
import PickupQueueTab from '../components/PickupQueueTab';
import CompletedStatsTab from '../components/CompletedStatsTab';
import MarketplacePurchasesTab from '../components/MarketplacePurchasesTab';
import PerformanceMetricsTab from '../components/PerformanceMetricsTab';
import { useAuth } from '../context/AuthContext';

const CenterDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pickup-queue');
  const { user, logout } = useAuth();
  
  // Mock data - in a real app this would come from an API
  const [centerData, setCenterData] = useState({
    name: "Green Valley Recycling Center",
    totalProcessed: 1250.5,
    co2Saved: 3200.7,
    pendingPickups: 12,
    todayPickups: 8,
    weeklyPurchases: [
      { id: 1, material: "Plastic", quantity: 150, price: 450, date: "2023-06-15", vendor: "EcoPlastics Inc." },
      { id: 2, material: "Paper", quantity: 220, price: 330, date: "2023-06-14", vendor: "Green Paper Co." },
      { id: 3, material: "Metal", quantity: 95, price: 760, date: "2023-06-13", vendor: "MetalWorks Ltd." },
      { id: 4, material: "Glass", quantity: 180, price: 270, date: "2023-06-12", vendor: "ClearGlass Corp." }
    ],
    monthlyStats: {
      plastic: 420,
      paper: 380,
      metal: 290,
      glass: 190,
      electronics: 75
    },
    performanceData: {
      weeklyVolume: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
      weeklyCO2: [320, 510, 400, 570, 480, 640, 590],
      efficiency: 87
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
      case 'pickup-queue':
        return <PickupQueueTab centerData={centerData} />;
      case 'completed-stats':
        return <CompletedStatsTab centerData={centerData} />;
      case 'marketplace-purchases':
        return <MarketplacePurchasesTab centerData={centerData} />;
      case 'performance-metrics':
        return <PerformanceMetricsTab centerData={centerData} />;
      default:
        return <PickupQueueTab centerData={centerData} />;
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
            <FaRecycle className="mr-2 text-green-300" /> EcoCenter
          </h1>
        </div>
        <nav className="mt-5">
          {[
            { id: 'pickup-queue', label: 'Pickup Queue', icon: <FaCalendarAlt /> },
            { id: 'completed-stats', label: 'Completed Stats', icon: <FaCheck /> },
            { id: 'marketplace-purchases', label: 'Marketplace Purchases', icon: <FaStore /> },
            { id: 'performance-metrics', label: 'Performance Metrics', icon: <FaChartBar /> }
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
            <h2 className="text-xl font-semibold text-gray-800">Welcome back, {centerData.name}!</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <FaBoxOpen className="text-green-600 mr-2" />
                <span className="font-medium text-green-800">{centerData.pendingPickups} pending</span>
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

export default CenterDashboard;
