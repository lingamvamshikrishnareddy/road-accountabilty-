import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import RoadList from './pages/RoadList';
import RoadDetail from './pages/RoadDetail';
import ContractorList from './pages/ContractorList';
import Search from './pages/Search';
import Upload from './pages/Upload';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/roads" element={<RoadList />} />
              <Route path="/roads/:id" element={<RoadDetail />} />
              <Route path="/contractors" element={<ContractorList />} />
              <Route path="/search" element={<Search />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;