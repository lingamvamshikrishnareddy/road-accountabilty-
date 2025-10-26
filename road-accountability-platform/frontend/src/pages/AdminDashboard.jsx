import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart, 
  Users, 
  FileText, 
  AlertCircle, 
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { adminAPI } from '../services/api';
import { formatters } from '../utils/formatters';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.getStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to fetch dashboard stats');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Roads',
      value: stats?.totalRoads || 0,
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Active Contractors',
      value: stats?.totalContractors || 0,
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Documents',
      value: stats?.totalDocuments || 0,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+23%',
    },
    {
      title: 'Pending Reviews',
      value: stats?.pendingReviews || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {user.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.change && (
                    <span className="text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {formatters.number(stat.value)}
                </h3>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="card hover:shadow-lg transition-shadow text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  Review Submissions
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                {stats?.pendingReviews || 0} items pending review
              </p>
            </button>

            <button className="card hover:shadow-lg transition-shadow text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  User Management
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Manage user roles and permissions
              </p>
            </button>

            <button className="card hover:shadow-lg transition-shadow text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BarChart className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  View Reports
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Generate and download reports
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    New document uploaded by user@example.com
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    2 hours ago
                  </p>
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;