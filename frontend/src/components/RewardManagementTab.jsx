import React, { useState } from 'react';
import { FaGift, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const RewardManagementTab = ({ rewardData }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReward, setNewReward] = useState({
    name: '',
    points: '',
    description: '',
    stock: ''
  });

  const filteredRewards = rewardData.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward({
      ...newReward,
      [name]: value
    });
  };

  const handleCreateReward = (e) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('Creating reward:', newReward);
    setShowCreateForm(false);
    setNewReward({
      name: '',
      points: '',
      description: '',
      stock: ''
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reward Management</h2>
          <p className="text-gray-600">Manage rewards and track redemptions</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <FaPlus className="mr-2" /> {showCreateForm ? 'Cancel' : 'Add New Reward'}
        </button>
      </div>

      {/* Create Reward Form */}
      {showCreateForm && (
        <div className="mb-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Reward</h3>
          <form onSubmit={handleCreateReward} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Reward Name</label>
              <input
                type="text"
                name="name"
                value={newReward.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Points Required</label>
              <input
                type="number"
                name="points"
                value={newReward.points}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={newReward.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={newReward.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button 
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Add Reward
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search rewards..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rewards Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaGift className="text-white text-xl" />
            </div>
            <div>
              <p className="text-green-100">Total Rewards</p>
              <p className="text-3xl font-bold">45</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaGift className="text-white text-xl" />
            </div>
            <div>
              <p className="text-blue-100">Redemptions</p>
              <p className="text-3xl font-bold">3,280</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
              <FaGift className="text-white text-xl" />
            </div>
            <div>
              <p className="text-purple-100">Avg. Redemption</p>
              <p className="text-3xl font-bold">72 pts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reward Inventory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Redemptions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRewards.length > 0 ? (
                filteredRewards.map((reward) => (
                  <tr key={reward.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{reward.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {reward.points} pts
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {reward.redemptions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {reward.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        reward.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : reward.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {reward.stock > 10 ? 'In Stock' : reward.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No rewards found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redemption Trends */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Redemption Trends</h3>
        <div className="h-64 flex items-end space-x-2 justify-center">
          {[120, 250, 180, 320, 280, 400, 350].map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 ease-in-out hover:opacity-75"
                style={{ height: `${(value / 400) * 100}%` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardManagementTab;
