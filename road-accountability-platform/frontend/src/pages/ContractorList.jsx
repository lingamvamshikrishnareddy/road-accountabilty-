import { useState, useEffect } from 'react';
import { Building2, Search, Award, MapPin } from 'lucide-react';
import { entitiesAPI } from '../services/api';
import { formatters } from '../utils/formatters';
import toast from 'react-hot-toast';

const ContractorList = () => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContractors();
  }, [searchTerm]);

  const fetchContractors = async () => {
    try {
      setLoading(true);
      const { data } = await entitiesAPI.getContractors({ search: searchTerm });
      setContractors(data.contractors || []);
    } catch (error) {
      toast.error('Failed to fetch contractors');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contractors</h1>
          <p className="text-gray-600">
            Browse contractors and their project history
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contractors by name or location..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading contractors...</p>
          </div>
        ) : contractors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No contractors found
            </h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractors.map((contractor) => (
              <div key={contractor.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {contractor.name}
                      </h3>
                      {contractor.registration_number && (
                        <p className="text-xs text-gray-500">
                          Reg: {contractor.registration_number}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {contractor.location && (
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {contractor.location}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500">Projects</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {contractor.total_projects || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Value</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatters.currency(contractor.total_value || 0)}
                    </p>
                  </div>
                </div>

                {contractor.rating && (
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center">
                    <Award className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      Rating: {contractor.rating}/5
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractorList;