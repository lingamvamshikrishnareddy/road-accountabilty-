import { Link } from 'react-router-dom';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';
import { formatters } from '../../utils/formatters';
import { ROAD_STATUS_LABELS, ROAD_STATUS_COLORS } from '../../utils/constants';
import SourceBadge from '../common/SourceBadge';

const RoadCard = ({ road }) => {
  const statusColor = ROAD_STATUS_COLORS[road.status] || 'info';

  return (
    <Link to={`/roads/${road.id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow duration-200">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {road.name}
          </h3>
          <span className={`badge badge-${statusColor} ml-2`}>
            {ROAD_STATUS_LABELS[road.status]}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">
              {road.start_location} → {road.end_location}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>{road.length_km} km</span>
          </div>

          {road.estimated_completion_date && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                Completion: {formatters.date(road.estimated_completion_date)}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Estimated Cost</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatters.currency(road.estimated_cost)}
            </p>
          </div>
          {road.verification_status && (
            <SourceBadge status={road.verification_status} showIcon={false} />
          )}
        </div>

        {road.contractor_name && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">Contractor</p>
            <p className="text-sm font-medium text-gray-900">
              {road.contractor_name}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RoadCard;