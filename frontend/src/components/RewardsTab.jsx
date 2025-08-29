import React, { useState } from 'react';
import { FaGift, FaTicketAlt, FaShoppingBag, FaLeaf } from 'react-icons/fa';

const RewardsTab = ({ userData }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const rewards = [
    { id: 1, name: "Eco-Friendly Water Bottle", points: 500, category: "products", image: "water-bottle" },
    { id: 2, name: "Recycled Notebook Set", points: 300, category: "products", image: "notebook" },
    { id: 3, name: "$10 Discount Coupon", points: 200, category: "coupons", image: "coupon" },
    { id: 4, name: "Tree Planting Voucher", points: 400, category: "experiences", image: "tree" },
    { id: 5, name: "Eco-Friendly Tote Bag", points: 350, category: "products", image: "tote-bag" },
    { id: 6, name: "Recycling Bin", points: 600, category: "products", image: "bin" },
    { id: 7, name: "Free Pickup Service", points: 250, category: "services", image: "pickup" },
    { id: 8, name: "Eco Workshop Pass", points: 450, category: "experiences", image: "workshop" }
  ];

  const filteredRewards = activeCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === activeCategory);

  const categories = [
    { id: 'all', name: 'All Rewards', icon: <FaGift /> },
    { id: 'products', name: 'Products', icon: <FaShoppingBag /> },
    { id: 'coupons', name: 'Coupons', icon: <FaTicketAlt /> },
    { id: 'experiences', name: 'Experiences', icon: <FaLeaf /> },
    { id: 'services', name: 'Services', icon: <FaGift /> }
  ];

  return (
    <div>
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-6 text-white mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Reward Points</h2>
            <p className="text-4xl font-bold">{userData.points} pts</p>
            <p className="mt-2 opacity-90">Redeem your points for exciting rewards!</p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Redeem Points
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-6 -mx-2 px-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full mx-2 ${
              activeCategory === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" />
            <div className="p-5">
              <h3 className="font-bold text-gray-800 mb-1">{reward.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-green-600">{reward.points} pts</span>
                <button 
                  className={`px-3 py-1 rounded text-sm ${
                    userData.points >= reward.points
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={userData.points < reward.points}
                >
                  {userData.points >= reward.points ? 'Redeem' : 'Insufficient Points'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">How Reward Points Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              step: 1, 
              title: "Earn Points", 
              desc: "Recycle items and participate in challenges to earn points" 
            },
            { 
              step: 2, 
              title: "Accumulate", 
              desc: "Save your points in your account for future redemptions" 
            },
            { 
              step: 3, 
              title: "Redeem Rewards", 
              desc: "Exchange points for products, services, or experiences" 
            }
          ].map((item) => (
            <div key={item.step} className="flex">
              <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsTab;