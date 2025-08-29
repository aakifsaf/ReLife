import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import individualApi from '../services/individualApi';
import DashboardTab from '../components/DashboardTab';
import PickupsTab from '../components/PickupsTab';
import ChallengesTab from '../components/ChallengesTab';
import RewardsTab from '../components/RewardsTab';
import MarketplaceTab from '../components/MarketplaceTab';
import ProfileTab from '../components/ProfileTab';

const IndividualDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await individualApi.fetchDashboardData();
        setUserData({
          name: `${data.user.first_name} ${data.user.last_name}`,
          points: data.user.points,
          totalRecycled: data.total_recycled_kg,
          co2Saved: data.co2_saved_total,
          challengesCompleted: data.challenges_completed_count,
          upcomingPickups: data.upcoming_pickups,
          pastPickups: data.past_pickups,
          activeChallenges: data.active_challenges,
          completedChallenges: data.completed_challenges,
          rewards: data.rewards,
          recyclingHistory: data.recycling_history,
          profile: {
            firstName: data.user.first_name,
            lastName: data.user.last_name,
            email: data.user.email,
            phone: data.user.phone || '',
            address: data.user.address || '',
            dateJoined: data.user.date_joined
          }
        });
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      individualApi.setToken(localStorage.getItem('token'));
      fetchDashboardData();
    }
  }, [user]);

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }

    if (!userData) return null;

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transition-transform duration-300 ease-in-out transform`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-green-700">
          <h1 className="text-xl font-bold">EcoTrack</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-5 px-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center ${
              activeTab === 'dashboard' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('pickups')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center ${
              activeTab === 'pickups' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Pickups
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center ${
              activeTab === 'challenges' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center ${
              activeTab === 'rewards' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center ${
              activeTab === 'marketplace' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center ${
              activeTab === 'profile' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-700 mr-3"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {activeTab.replace('-', ' ')}
              </h2>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="text-sm font-medium text-gray-900">{userData?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{userData?.points || 0} points</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                {userData?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default IndividualDashboard;