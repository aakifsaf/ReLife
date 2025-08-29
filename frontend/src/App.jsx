import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import IndividualDashboard from './pages/IndividualDashboard';
import CenterDashboard from './pages/CenterDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<IndividualDashboard />} />
          <Route path="/center-dashboard" element={<CenterDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;