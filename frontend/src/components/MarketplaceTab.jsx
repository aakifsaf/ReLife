import React, { useState } from 'react';
import { FaStore, FaPlus, FaSearch, FaFilter, FaShoppingCart, FaRecycle } from 'react-icons/fa';

const MarketplaceTab = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = [
    { id: 1, name: "Recycled Plastic Chair", price: 45.99, seller: "EcoFurniture", category: "furniture", image: "chair" },
    { id: 2, name: "Bamboo Toothbrush Set", price: 12.50, seller: "GreenLiving", category: "personal-care", image: "toothbrush" },
    { id: 3, name: "Upcycled Glass Vase", price: 28.75, seller: "ArtisanCrafts", category: "home-decor", image: "vase" },
    { id: 4, name: "Organic Cotton Tote Bag", price: 18.99, seller: "SustainableStyle", category: "fashion", image: "tote" },
    { id: 5, name: "Solar-Powered Charger", price: 35.00, seller: "TechGreen", category: "electronics", image: "charger" },
    { id: 6, name: "Recycled Paper Notebooks", price: 8.99, seller: "EcoStationery", category: "office", image: "notebook" }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'personal-care', name: 'Personal Care' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'office', name: 'Office' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Eco Marketplace</h2>
          <p className="text-gray-600">Buy and sell sustainable products</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          <FaPlus className="mr-2" /> List Item for Sale
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or sellers..."
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">by {product.seller}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {product.category.replace('-', ' ')}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg text-gray-800">${product.price.toFixed(2)}</span>
                  <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FaStore className="mx-auto text-gray-300 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Selling Section */}
      <div className="mt-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Sell Your Recycled Items</h3>
            <p className="opacity-90">Turn your recyclables into income by listing them on our marketplace</p>
          </div>
          <button className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start Selling
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceTab;