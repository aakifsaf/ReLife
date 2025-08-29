import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaCamera } from 'react-icons/fa';

const ProfileTab = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ ...userData.profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    // Update userData with new profileData
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center">
              <FaUser className="text-gray-500 text-3xl" />
            </div>
            <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
              <FaCamera className="text-xs" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-600">Member since {new Date(userData.profile.memberSince).toLocaleDateString()}</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {userData.points} pts
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Eco Enthusiast
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <FaEdit className="mr-2" /> {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                disabled
              />
            ) : (
              <p className="text-gray-800">{userData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-800">{profileData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-800">{profileData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-800">{profileData.address}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Member Since</label>
            <p className="text-gray-800">{new Date(userData.profile.memberSince).toLocaleDateString()}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Total Recycled</label>
            <p className="text-gray-800">{userData.totalRecycled} kg</p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Account Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FaEnvelope className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500">Email Status</p>
              <p className="text-lg font-bold text-gray-800">Verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaPhone className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500">Phone Status</p>
              <p className="text-lg font-bold text-gray-800">Verified</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <FaMapMarkerAlt className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-500">Pickup Address</p>
              <p className="text-lg font-bold text-gray-800">Set</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;