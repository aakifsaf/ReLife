import React, { useState } from 'react';
import { FaStore, FaSearch, FaFilter, FaShoppingCart, FaRecycle } from 'react-icons/fa';

const MarketplacePurchasesTab = ({ centerData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('monthly');
  
  const purchases = centerData.weeklyPurchases;

  const filteredPurchases = purchases.filter(purchase => {
    const matchesCategory = activeFilter === 'all' || purchase.material.toLowerCase() === activeFilter;
    const matchesSearch = purchase.material.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          purchase.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Materials' },
    { id: 'plastic', name: 'Plastic' },
    { id: 'paper', name: 'Paper' },
    { id: 'metal', name: 'Metal' },
    { id: 'glass', name: 'Glass' },
    { id: 'electronics', name: 'Electronics' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Marketplace Purchases</h2>
          <p className="text-gray-600">Track recyclable materials purchased from vendors</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          {['daily', 'weekly', 'monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials or vendors..."
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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaShoppingCart className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaStore className="text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Vendors</p>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <FaRecycle className="text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Quantity</p>
              <p className="text-2xl font-bold text-gray-800">645 kg</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <FaFilter className="text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Avg. Price/kg</p>
              <p className="text-2xl font-bold text-gray-800">$3.20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Purchases</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{purchase.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{purchase.material}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{purchase.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{purchase.quantity} kg</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${purchase.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No purchases found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor Performance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Vendors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "EcoPlastics Inc.", materials: "Plastic", quantity: "450 kg", rating: 4.8 },
            { name: "Green Paper Co.", materials: "Paper", quantity: "380 kg", rating: 4.6 },
            { name: "MetalWorks Ltd.", materials: "Metal", quantity: "290 kg", rating: 4.7 }
          ].map((vendor, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{vendor.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{vendor.materials}</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                  {vendor.rating}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-medium">{vendor.quantity} supplied</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(parseInt(vendor.quantity) / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePurchasesTab;
