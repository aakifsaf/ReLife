import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import IndividualDashboard from './pages/IndividualDashboard';
import CenterDashboard from './pages/CenterDashboard';
import StaffDashboard from './pages/StaffDashboard';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
      <Router>
        <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route 
              path="/user-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['individual']}>
                  <IndividualDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/center-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['recycling_center']}>
                  <CenterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['staff']}>
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Route */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        </AuthProvider>
      </Router>
    
  );
}

export default App;