import React, { useState } from 'react';

const MarketplacePurchasesTab = ({ centerData }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('monthly');
  
  const purchases = centerData.weeklyPurchases;

  const filteredPurchases = purchases.filter(purchase => {
    const matchesCategory = activeFilter === 'all' || purchase.material.toLowerCase() === activeFilter;
    const matchesSearch = purchase.material.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         purchase.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Marketplace Purchases</h2>
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search purchases..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          All Materials
        </button>
        <button 
          onClick={() => setActiveFilter('plastic')}
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'plastic' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Plastic
        </button>
        <button 
          onClick={() => setActiveFilter('paper')}
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'paper' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Paper
        </button>
        <button 
          onClick={() => setActiveFilter('metal')}
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'metal' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Metal
        </button>
        <button 
          onClick={() => setActiveFilter('glass')}
          className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'glass' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Glass
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPurchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {purchase.material}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.quantity} kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(purchase.amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{purchase.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPurchases.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No purchases found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePurchasesTab;