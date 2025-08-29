import React, { useState } from 'react';
import { FaCalendarAlt, FaBoxOpen, FaPlus } from 'react-icons/fa';

const PickupsTab = ({ userData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredPickups = () => {
    if (activeFilter === 'upcoming') return userData.upcomingPickups;
    if (activeFilter === 'past') return userData.pastPickups;
    return [...userData.upcomingPickups, ...userData.pastPickups];
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">My Pickups</h2>
        <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          <FaPlus className="mr-2" /> Schedule Pickup
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { id: 'all', label: 'All Pickups' },
          { id: 'upcoming', label: 'Upcoming' },
          { id: 'past', label: 'Past' }
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

      {/* Upcoming Pickups Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-green-500" /> Upcoming Pickups
        </h3>
        {userData.upcomingPickups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.upcomingPickups.map((pickup) => (
              <div key={pickup.id} className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{pickup.date}</h4>
                    <p className="text-gray-600 mt-1">{pickup.items}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {pickup.status}
                  </span>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                    Edit
                  </button>
                  <button className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming pickups scheduled.</p>
        )}
      </div>

      {/* Past Pickups Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaBoxOpen className="mr-2 text-gray-500" /> Past Pickups
        </h3>
        {userData.pastPickups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.pastPickups.map((pickup) => (
              <div key={pickup.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-800">{pickup.date}</h4>
                    <p className="text-gray-600 mt-1">{pickup.items}</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {pickup.status}
                  </span>
                </div>
                <div className="mt-4">
                  <button className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No past pickups recorded.</p>
        )}
      </div>
    </div>
  );
};

export default PickupsTab;