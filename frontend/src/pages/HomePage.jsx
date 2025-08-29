import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    recycled: 0,
    co2Saved: 0
  });

  // Animate stats on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        users: 12500,
        recycled: 42000,
        co2Saved: 18500
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: "♻️",
      title: "Smart Sorting",
      description: "AI-powered waste identification for accurate recycling"
    },
    {
      icon: "🏆",
      title: "Reward System",
      description: "Earn points for every item you recycle"
    },
    {
      icon: "🌍",
      title: "Community Impact",
      description: "Track your contribution to environmental change"
    },
    {
      icon: "📱",
      title: "Mobile App",
      description: "Scan and track your recycling on the go"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free account in seconds"
    },
    {
      number: "2",
      title: "Scan Items",
      description: "Use our app to identify recyclable items"
    },
    {
      number: "3",
      title: "Drop Off",
      description: "Find nearby recycling centers"
    },
    {
      number: "4",
      title: "Earn Rewards",
      description: "Get points and track your impact"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Leaf particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
            <svg className="w-6 h-6 text-green-400 opacity-20" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
              <i className="fas fa-leaf text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ReLife</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</a>
            <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
            <a href="#impact" className="text-gray-600 hover:text-green-600 transition-colors">Impact</a>
          </nav>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-medium hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Join Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Recycle Together. <br />
            <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
              Build a Greener Tomorrow.
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Join our community of eco-warriors making a real impact through smart recycling. 
            Together, we're turning waste into worth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started
            </button>
            <button className="px-8 py-4 bg-white bg-opacity-50 backdrop-blur-lg border border-white rounded-full font-bold text-lg text-gray-800 hover:bg-opacity-70 transition-all shadow-lg">
              <i className="fas fa-play-circle mr-2"></i> How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="impact" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 border border-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-gray-700 text-lg">Community Members</div>
            </div>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 border border-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-teal-500 mb-2">
                {stats.recycled.toLocaleString()}+
              </div>
              <div className="text-gray-700 text-lg">Items Recycled</div>
            </div>
            <div className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 border border-white shadow-lg hover:shadow-xl transition-all">
              <div className="text-5xl font-bold text-blue-500 mb-2">
                {stats.co2Saved.toLocaleString()}+
              </div>
              <div className="text-gray-700 text-lg">kg CO₂ Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Making recycling simple and rewarding for everyone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 border border-white shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to make recycling effortless and rewarding
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl p-8 border border-white shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl p-12 text-white text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Earn Rewards for Your Impact</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get points for every item you recycle and redeem them for eco-friendly products, 
              discounts, and exclusive experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 w-48">
                <div className="text-3xl mb-3">🛍️</div>
                <h3 className="font-bold text-lg">Discounts</h3>
                <p>On sustainable products</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 w-48">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-bold text-lg">Plant a Tree</h3>
                <p>With your points</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 w-48">
                <div className="text-3xl mb-3">🎟️</div>
                <h3 className="font-bold text-lg">Events</h3>
                <p>Exclusive eco workshops</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Earning Rewards
            </button>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join thousands of community members who are already building a greener future, 
            one recycled item at a time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Join Our Community
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;