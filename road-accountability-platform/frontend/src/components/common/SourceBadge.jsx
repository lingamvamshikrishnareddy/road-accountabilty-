import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { VERIFICATION_STATUS } from '../../utils/constants';

const SourceBadge = ({ status, source, showIcon = true }) => {
  const getStatusConfig = () => {
    switch (status) {
      case VERIFICATION_STATUS.VERIFIED:
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800',
          label: 'Verified',
        };
      case VERIFICATION_STATUS.PENDING:
        return {
          icon: Clock,
          color: 'bg-yellow-100 text-yellow-800',
          label: 'Pending Verification',
        };
      case VERIFICATION_STATUS.REJECTED:
        return {
          icon: AlertCircle,
          color: 'bg-red-100 text-red-800',
          label: 'Rejected',
        };
      default:
        return {
          icon: Clock,
          color: 'bg-gray-100 text-gray-800',
          label: 'Unknown',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex items-center space-x-2">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {showIcon && <Icon className="w-3 h-3 mr-1" />}
        {config.label}
      </span>
      {source && (
        <span className="text-xs text-gray-500">
          Source: {source}
        </span>
      )}
    </div>
  );
};

export default SourceBadge;