import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // API call to login endpoint
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Use the login function from context
        login(data.user, data.token);
        if(data.user.user_type === 'individual') {
          navigate('/user-dashboard');
        } else if(data.user.user_type === 'recycling_center') {
          navigate('/center-dashboard');
        } else if(data.user.user_type === 'staff') {
          navigate('/staff-dashboard');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setError('');
    
    try {
      // API call to social login endpoint
      const response = await fetch(`http://localhost:8000/api/auth/${provider}/`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        login(data.user, data.token);
        navigate('/dashboard');
      } else {
        setError(`${provider} login failed`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center p-4">
      {/* Leaf particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <svg className="w-8 h-8 text-green-400 opacity-20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
        {/* Illustration Side */}
        <div className="lg:w-1/2 bg-gradient-to-br from-green-500 to-teal-600 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="flex justify-center">
                  <i className="fas fa-recycle text-4xl"></i>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="mb-8">
              <div className="bg-white bg-opacity-20 rounded-full p-6 inline-block mb-6">
                <i className="fas fa-leaf text-5xl"></i>
              </div>
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-xl opacity-90 max-w-md">
                Your green journey starts here 🌱
              </p>
            </div>
            
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <div className="flex">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <i className="fas fa-user text-green-600"></i>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-2">
                      <i className="fas fa-recycle text-teal-600"></i>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-globe-americas text-blue-600"></i>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-lg">
                Join our community of eco-warriors making a real impact
              </p>
            </div>
          </div>
        </div>

        {/* Login Form Side */}
        <div className="lg:w-1/2 p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In to EcoCycle</h1>
              <p className="text-gray-600">Continue your green journey</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-white bg-opacity-50 border border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <a href="#" className="text-sm text-green-600 hover:text-green-800">Forgot password?</a>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 bg-white bg-opacity-50 border border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-2xl hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="flex items-center justify-center py-3 px-4 bg-white bg-opacity-50 border border-white rounded-2xl hover:bg-opacity-70 transition-all backdrop-blur-sm"
              >
                <i className="fab fa-google text-red-500 mr-2"></i>
                <span>Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin('facebook')}
                disabled={isLoading}
                className="flex items-center justify-center py-3 px-4 bg-white bg-opacity-50 border border-white rounded-2xl hover:bg-opacity-70 transition-all backdrop-blur-sm"
              >
                <i className="fab fa-facebook text-blue-600 mr-2"></i>
                <span>Facebook</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button 
                  onClick={() => navigate('/register')}
                  className="text-green-600 font-medium hover:text-green-800"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;