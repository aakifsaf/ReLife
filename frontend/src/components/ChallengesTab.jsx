import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaCheckCircle } from 'react-icons/fa';

const ChallengesTab = ({ userData }) => {
  const [activeFilter, setActiveFilter] = useState('active');
  
  const filteredChallenges = () => {
    if (activeFilter === 'completed') 
      return userData.challenges.filter(c => c.progress >= c.target);
    if (activeFilter === 'active') 
      return userData.challenges.filter(c => c.progress < c.target);
    return userData.challenges;
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Recycling Challenges</h2>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          Join New Challenge
        </button>
      </div>

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
        {filteredChallenges().length > 0 ? (
          filteredChallenges().map((challenge) => (
            <div key={challenge.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{challenge.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {challenge.progress >= challenge.target ? 'Completed' : 'In Progress'}
                  </p>
                </div>
                {challenge.progress >= challenge.target ? (
                  <FaMedal className="text-yellow-500 text-xl" />
                ) : (
                  <FaTrophy className="text-green-500 text-xl" />
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">
                    {challenge.progress}/{challenge.target}
                  </span>
                </div>
                <ProgressBar 
                  progress={challenge.progress} 
                  target={challenge.target} 
                  color={challenge.progress >= challenge.target ? "bg-yellow-500" : "bg-green-500"} 
                />
              </div>
              
              <div className="mt-4">
                {challenge.progress >= challenge.target ? (
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="mr-2" />
                    <span className="font-medium">Challenge Completed!</span>
                  </div>
                ) : (
                  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FaTrophy className="mx-auto text-gray-300 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No challenges found</h3>
            <p className="text-gray-500">
              {activeFilter === 'completed' 
                ? "You haven't completed any challenges yet." 
                : "You're not participating in any challenges."}
            </p>
          </div>
        )}
      </div>

      {/* Challenge Benefits */}
      <div className="mt-10 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Why Participate in Challenges?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Earn Points", desc: "Complete challenges to earn reward points" },
            { title: "Save Environment", desc: "Make a bigger impact through collective action" },
            { title: "Track Progress", desc: "Monitor your recycling habits over time" }
          ].map((benefit, index) => (
            <li key={index} className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <FaTrophy className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChallengesTab;