import React, { useState } from 'react';
import { FaTrophy, FaPlus, FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';

const ChallengeManagementTab = ({ challengeData }) => {
  const [activeFilter, setActiveFilter] = useState('active');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    description: '',
    target: '',
    rewardPoints: '',
    startDate: '',
    endDate: ''
  });

  const filteredChallenges = activeFilter === 'all' 
    ? challengeData 
    : challengeData.filter(c => c.status.toLowerCase() === activeFilter);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewChallenge({
      ...newChallenge,
      [name]: value
    });
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log('Creating challenge:', newChallenge);
    setShowCreateForm(false);
    setNewChallenge({
      name: '',
      description: '',
      target: '',
      rewardPoints: '',
      startDate: '',
      endDate: ''
    });
  };

  // Progress bar component
  const ProgressBar = ({ progress, target, color = "bg-green-500" }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`${color} h-2.5 rounded-full transition-all duration-700 ease-in-out`} 
        style={{ width: `${Math.min(100, (progress / target) * 100)}%` }}
      ></div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Challenge Management</h2>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <FaPlus className="mr-2" /> {showCreateForm ? 'Cancel' : 'Create New Challenge'}
        </button>
      </div>

      {/* Create Challenge Form */}
      {showCreateForm && (
        <div className="mb-8 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Challenge</h3>
          <form onSubmit={handleCreateChallenge} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Challenge Name</label>
              <input
                type="text"
                name="name"
                value={newChallenge.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Target (kg)</label>
              <input
                type="number"
                name="target"
                value={newChallenge.target}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Reward Points</label>
              <input
                type="number"
                name="rewardPoints"
                value={newChallenge.rewardPoints}
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
                value={newChallenge.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newChallenge.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">End Date</label>
              <input
                type="date"
                name="endDate"
                value={newChallenge.endDate}
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
                Create Challenge
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' },
          { id: 'all', label: 'All Challenges' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 font-medium ${
              activeFilter === filter.id
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{challenge.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {challenge.status === 'Active' ? 'Ongoing' : 'Completed'}
                  </p>
                </div>
                <FaTrophy className="text-green-500 text-xl" />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Participants</span>
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.participants}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.progress}/{challenge.target} kg
                  </span>
                </div>
                <ProgressBar 
                  progress={challenge.progress} 
                  target={challenge.target} 
                />
              </div>
              
              <div className="flex justify-between mt-4">
                <button className="flex items-center text-sm text-green-600 hover:text-green-800">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button className="flex items-center text-sm text-red-600 hover:text-red-800">
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FaTrophy className="mx-auto text-gray-300 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No challenges found</h3>
            <p className="text-gray-500">
              {activeFilter === 'completed' 
                ? "No completed challenges yet." 
                : "No active challenges at the moment."}
            </p>
          </div>
        )}
      </div>

      {/* Challenge Analytics */}
      <div className="mt-10 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Challenge Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Total Challenges", value: "24", change: "+12%" },
            { title: "Active Participants", value: "8,420", change: "+8%" },
            { title: "Avg. Completion", value: "72%", change: "+5%" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-green-100">
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <span className="ml-2 text-green-600 text-sm">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeManagementTab;
