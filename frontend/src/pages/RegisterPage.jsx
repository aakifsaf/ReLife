import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaTwitter, FaLeaf, FaRecycle, FaTree } from 'react-icons/fa';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    user_type: 'individual'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to register endpoint
      const response = await fetch('https://relife-v0ud.onrender.com/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          user_type: formData.user_type
        })
      });
      
      if (response.ok) {
        // Redirect based on user type
        switch (formData.user_type) {
          case 'admin':
          case 'staff':
            navigate('/admin-dashboard');
            break;
          case 'center':
            navigate('/center-dashboard');
            break;
          default:
            navigate('/user-dashboard');
        }
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message || 'Registration failed' });
      }
    } catch (error) {
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to social register endpoint
      const response = await fetch(`https://relife-v0ud.onrender.com/api/auth/${provider}/register/`, {
        method: 'POST'
      });
      
      if (response.ok) {
        navigate('/user-dashboard');
      } else {
        setErrors({ form: 'Social registration failed' });
      }
    } catch (error) {
      setErrors({ form: 'An error occurred with social registration' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-green-200 animate-pulse">
          <FaLeaf size={24} />
        </div>
        <div className="absolute top-1/4 right-20 text-teal-200 animate-bounce">
          <FaRecycle size={32} />
        </div>
        <div className="absolute bottom-20 left-1/4 text-blue-200 animate-pulse">
          <FaTree size={28} />
        </div>
        <div className="absolute bottom-1/3 right-10 text-green-200 animate-bounce">
          <FaLeaf size={20} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden backdrop-blur-lg bg-opacity-80">
        {/* Left side - Eco illustration */}
        <div className="lg:w-1/2 bg-gradient-to-br from-green-400 to-teal-500 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <FaLeaf key={i} className="text-white" size={24} />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Movement</h1>
            <p className="text-xl mb-8">Build a Greener Tomorrow 🌍</p>
            
            <div className="mb-10">
              <div className="relative w-64 h-64 mx-auto">
                {/* Community illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                      <FaRecycle className="text-white" size={40} />
                    </div>
                  </div>
                </div>
                
                {/* People elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-green-300"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-teal-300"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 right-0">
                  <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-blue-300"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-lg">
              Together we can make a difference. Join our community of eco-warriors today!
            </p>
          </div>
        </div>
        
        {/* Right side - Registration form */}
        <div className="lg:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-600">Join our eco-friendly community today</p>
            </div>
            
            {errors.form && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
                {errors.form}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.first_name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  placeholder="John Doe"
                />
                {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.last_name ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  placeholder="Doe"
                />
                {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="user_type" className="block text-sm font-medium text-gray-700 mb-1">
                    User Type
                  </label>
                  <select
                    id="user_type"
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="individual">Individual</option>
                    <option value="household">Household</option>
                    <option value="recycling_center">Recycling Center</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address (Optional)
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="123 Green Street, Eco City"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Register'
                )}
              </button>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleSocialRegister('google')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaGoogle className="text-red-500" />
                </button>
                <button
                  onClick={() => handleSocialRegister('facebook')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaFacebook className="text-blue-600" />
                </button>
                <button
                  onClick={() => handleSocialRegister('twitter')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-3 px-4 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaTwitter className="text-blue-400" />
                </button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;