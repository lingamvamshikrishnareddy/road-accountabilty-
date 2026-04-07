import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import RoadList from './pages/RoadList';
import RoadDetail from './pages/RoadDetail';
import Upload from './pages/Upload';
import Search from './pages/Search';
import AdminDashboard from './pages/AdminDashboard';
import ContractorList from './pages/ContractorList';
import './App.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="App">
      <Navbar onSidebarToggle={toggleSidebar} />
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={closeSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/roads" element={<RoadList />} />
            <Route path="/roads/:id" element={<RoadDetail />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/contractors" element={<ContractorList />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
