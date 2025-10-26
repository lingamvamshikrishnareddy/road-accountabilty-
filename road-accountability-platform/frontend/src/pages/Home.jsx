import { Link } from 'react-router-dom';
import { Search, Upload, Database, Shield, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Database,
      title: 'Comprehensive Database',
      description: 'Access detailed information about road projects, contracts, and contractors across India.',
    },
    {
      icon: Shield,
      title: 'Verified Information',
      description: 'All data is verified by our community and administrators to ensure accuracy.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Citizens can report incidents, upload documents, and contribute to transparency.',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor the progress of road projects with timelines and milestone updates.',
    },
  ];

  const stats = [
    { label: 'Road Projects', value: '1,234' },
    { label: 'Contractors', value: '567' },
    { label: 'Documents', value: '2,345' },
    { label: 'Incidents Reported', value: '789' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Road Accountability Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Tracking infrastructure, ensuring transparency, empowering citizens
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/roads"
                className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Roads
              </Link>
              <Link
                to="/upload"
                className="inline-flex items-center justify-center bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Document
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600">
                  {stat.value}
                </p>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Use Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide transparency and accountability in road infrastructure
              development through citizen participation and verified data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search & Discover
              </h3>
              <p className="text-gray-600">
                Find road projects, contracts, and contractors in your area or
                across India.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Report & Upload
              </h3>
              <p className="text-gray-600">
                Report incidents, upload documents, and contribute to the database.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Track & Monitor
              </h3>
              <p className="text-gray-600">
                Follow project progress, view timelines, and hold stakeholders
                accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join the Movement for Transparent Infrastructure
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Be part of a community working towards better roads and accountability.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;