import React, { useState } from 'react';
import { FaCalendarAlt, FaCheck, FaTruck, FaClock } from 'react-icons/fa';

const PickupQueueTab = ({ centerData }) => {
  const [activeFilter, setActiveFilter] = useState('pending');
  
  // Mock pickup data
  const pickups = [
    { id: 1, customer: "Alex Johnson", address: "123 Green St, Eco City", items: "Plastic, Paper", date: "2023-06-15", time: "10:00 AM", status: "pending" },
    { id: 2, customer: "Maria Garcia", address: "456 Eco Ave, Green Valley", items: "Glass, Metal", date: "2023-06-15", time: "11:30 AM", status: "pending" },
    { id: 3, customer: "James Wilson", address: "789 Recycle Rd, Eco Town", items: "E-waste", date: "2023-06-15", time: "1:00 PM", status: "pending" },
    { id: 4, customer: "Sarah Miller", address: "321 Sustainability Ln, Green City", items: "Plastic", date: "2023-06-15", time: "3:00 PM", status: "pending" },
    { id: 5, customer: "Robert Chen", address: "654 Earth Blvd, Eco District", items: "Paper, Metal", date: "2023-06-16", time: "9:00 AM", status: "scheduled" },
    { id: 6, customer: "Emma Thompson", address: "987 Greenway St, Eco Metropolis", items: "Glass, Plastic", date: "2023-06-16", time: "2:00 PM", status: "scheduled" }
  ];

  const filteredPickups = pickups.filter(pickup => 
    activeFilter === 'all' || pickup.status === activeFilter
  );

  const handleApprove = (id) => {
    // In a real app, this would update the backend
    console.log(`Approved pickup ${id}`);
  };

  const handleComplete = (id) => {
    // In a real app, this would update the backend
    console.log(`Completed pickup ${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Pickup Queue</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            Schedule New Pickup
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { id: 'pending', label: 'Pending' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'all', label: 'All Pickups' }
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaClock className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending Pickups</p>
              <p className="text-2xl font-bold text-gray-800">{centerData.pendingPickups}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaCalendarAlt className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Today's Pickups</p>
              <p className="text-2xl font-bold text-gray-800">{centerData.todayPickups}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <FaTruck className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <FaCheck className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed Today</p>
              <p className="text-2xl font-bold text-gray-800">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pickups List */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPickups.length > 0 ? (
              filteredPickups.map((pickup) => (
                <tr key={pickup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{pickup.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{pickup.items}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-700">{pickup.date}</div>
                    <div className="text-gray-500 text-sm">{pickup.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {pickup.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pickup.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {pickup.status === 'pending' ? (
                      <button
                        onClick={() => handleApprove(pickup.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleComplete(pickup.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Complete
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-900">
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No pickups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PickupQueueTab;
