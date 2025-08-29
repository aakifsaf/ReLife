import React, { useState } from 'react';

const PickupQueueTab = ({ centerData }) => {
  const [activeFilter, setActiveFilter] = useState('pending');
  
  // Mock pickup data
  const pickups = [
    { id: 1, customer: "Alex Johnson", address: "123 Green St, Eco City", items: "Plastic, Paper", date: "2023-06-15", status: "pending" },
    { id: 2, customer: "Maria Garcia", address: "456 Eco Ave, Green Valley", items: "Glass, Metal", date: "2023-06-16", status: "pending" },
    { id: 3, customer: "James Wilson", address: "789 Recycle Rd, Eco Town", items: "E-waste", date: "2023-06-16", status: "approved" },
    { id: 4, customer: "Sarah Miller", address: "321 Sustainability Ln, Green City", items: "Plastic, Paper, Glass", date: "2023-06-14", status: "approved" },
    { id: 5, customer: "Robert Chen", address: "654 Earth Blvd, Eco District", items: "Paper, Metal", date: "2023-06-13", status: "completed" }
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

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Pickup Queue</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('pending')}
            className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'pending' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveFilter('approved')}
            className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'approved' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Approved
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPickups.map((pickup) => (
              <tr key={pickup.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pickup.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.items}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pickup.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getStatusBadge(pickup.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {pickup.status === 'pending' && (
                    <button 
                      onClick={() => handleApprove(pickup.id)}
                      className="text-green-600 hover:text-green-900 mr-3"
                    >
                      Approve
                    </button>
                  )}
                  {pickup.status === 'approved' && (
                    <button 
                      onClick={() => handleComplete(pickup.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PickupQueueTab;