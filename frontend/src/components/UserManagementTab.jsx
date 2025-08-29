import React, { useState } from 'react';
import { FaUsers, FaSearch, FaFilter, FaUserCheck, FaUserTimes, FaUser } from 'react-icons/fa';

const UserManagementTab = ({ userData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const filteredUsers = userData.filter(user => {
    const matchesFilter = activeFilter === 'all' || user.type.toLowerCase() === activeFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const handleVerify = (id) => {
    // In a real app, this would update the backend
    console.log(`Verifying user ${id}`);
  };

  const handleSuspend = (id) => {
    // In a real app, this would update the backend
    console.log(`Suspending user ${id}`);
  };

  const categories = [
    { id: 'all', name: 'All Users' },
    { id: 'individual', name: 'Individuals' },
    { id: 'center', name: 'Centers' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-600">Manage users and recycling centers</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex overflow-x-auto pb-2 -mx-1 px-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`whitespace-nowrap px-3 py-1 rounded-full mx-1 text-sm ${
                  activeFilter === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaUsers className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">12,420</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaUser className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Individuals</p>
              <p className="text-2xl font-bold text-gray-800">9,850</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <FaUser className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Centers</p>
              <p className="text-2xl font-bold text-gray-800">2,570</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <FaUserCheck className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Verified</p>
              <p className="text-2xl font-bold text-gray-800">2,412</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">User Directory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  User
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  Type
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('joinDate')}
                >
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.type === 'Individual' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {user.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'Active' || user.status === 'Verified'
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.type === 'Center' && user.status === 'Pending' ? (
                        <button
                          onClick={() => handleVerify(user.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          <FaUserCheck />
                        </button>
                      ) : (
                        <button className="text-gray-400 mr-3 cursor-not-allowed">
                          <FaUserCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspend(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaUserTimes />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Activity */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent User Activity</h3>
        <div className="space-y-4">
          {[
            { id: 1, user: "Alex Johnson", action: "completed pickup", time: "2 minutes ago" },
            { id: 2, user: "Green Valley Center", action: "processed 450kg plastic", time: "15 minutes ago" },
            { id: 3, user: "Maria Garcia", action: "joined 'Paper Saver' challenge", time: "1 hour ago" },
            { id: 4, user: "EcoTech Solutions", action: "verified account", time: "3 hours ago" }
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
    </div>
  );
};

export default UserManagementTab;
