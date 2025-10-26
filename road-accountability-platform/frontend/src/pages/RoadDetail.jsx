import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, TrendingUp, DollarSign, Building2 } from 'lucide-react';
import { roadsAPI, contractsAPI, incidentsAPI } from '../services/api';
import { formatters } from '../utils/formatters';
import { ROAD_STATUS_LABELS, ROAD_STATUS_COLORS } from '../utils/constants';
import SourceBadge from '../components/common/SourceBadge';
import RoadTimeline from '../components/roads/RoadTimeline';
import RoadMap from '../components/roads/RoadMap';
import toast from 'react-hot-toast';

const RoadDetail = () => {
  const { id } = useParams();
  const [road, setRoad] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchRoadDetails();
  }, [id]);

  const fetchRoadDetails = async () => {
    try {
      setLoading(true);
      const [roadRes, contractsRes, incidentsRes] = await Promise.all([
        roadsAPI.getById(id),
        contractsAPI.getByRoad(id),
        incidentsAPI.getByRoad(id),
      ]);
      setRoad(roadRes.data);
      setContracts(contractsRes.data.contracts || []);
      setIncidents(incidentsRes.data.incidents || []);
    } catch (error) {
      toast.error('Failed to fetch road details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading road details...</p>
        </div>
      </div>
    );
  }

  if (!road) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Road not found</h2>
          <Link to="/roads" className="text-primary-600 hover:text-primary-700">
            Back to roads
          </Link>
        </div>
      </div>
    );
  }

  const statusColor = ROAD_STATUS_COLORS[road.status] || 'info';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/roads"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Roads
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {road.name}
              </h1>
              <div className="flex items-center space-x-2">
                <span className={`badge badge-${statusColor}`}>
                  {ROAD_STATUS_LABELS[road.status]}
                </span>
                {road.verification_status && (
                  <SourceBadge status={road.verification_status} />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-medium text-gray-900">
                  {road.start_location} → {road.end_location}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Length</p>
                <p className="font-medium text-gray-900">{road.length_km} km</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Estimated Cost</p>
                <p className="font-medium text-gray-900">
                  {formatters.currency(road.estimated_cost)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Completion Date</p>
                <p className="font-medium text-gray-900">
                  {road.estimated_completion_date
                    ? formatters.date(road.estimated_completion_date)
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'timeline', 'contracts', 'incidents', 'map'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700">{road.description || 'No description available.'}</p>
                </div>

                {road.contractor_name && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Contractor
                    </h3>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 font-medium">
                        {road.contractor_name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'timeline' && <RoadTimeline road={road} />}

            {activeTab === 'contracts' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contracts ({contracts.length})
                </h3>
                {contracts.length === 0 ? (
                  <p className="text-gray-500">No contracts found.</p>
                ) : (
                  <div className="space-y-4">
                    {contracts.map((contract) => (
                      <div key={contract.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {contract.title}
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Amount:</span>
                            <span className="ml-2 font-medium">
                              {formatters.currency(contract.amount)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-2 font-medium">
                              {formatters.date(contract.award_date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'incidents' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Reported Incidents ({incidents.length})
                </h3>
                {incidents.length === 0 ? (
                  <p className="text-gray-500">No incidents reported.</p>
                ) : (
                  <div className="space-y-4">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900">
                            {incident.type}
                          </h4>
                          <span className={`badge badge-${incident.severity}`}>
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-gray-700 mt-2">{incident.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {formatters.relativeTime(incident.created_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'map' && <RoadMap road={road} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadDetail;