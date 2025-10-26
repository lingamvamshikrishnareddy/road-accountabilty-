export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const ROAD_STATUS = {
  PLANNED: 'planned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
  CANCELLED: 'cancelled',
};

export const ROAD_STATUS_LABELS = {
  [ROAD_STATUS.PLANNED]: 'Planned',
  [ROAD_STATUS.IN_PROGRESS]: 'In Progress',
  [ROAD_STATUS.COMPLETED]: 'Completed',
  [ROAD_STATUS.DELAYED]: 'Delayed',
  [ROAD_STATUS.CANCELLED]: 'Cancelled',
};

export const ROAD_STATUS_COLORS = {
  [ROAD_STATUS.PLANNED]: 'info',
  [ROAD_STATUS.IN_PROGRESS]: 'warning',
  [ROAD_STATUS.COMPLETED]: 'success',
  [ROAD_STATUS.DELAYED]: 'danger',
  [ROAD_STATUS.CANCELLED]: 'danger',
};

export const INCIDENT_TYPES = {
  POTHOLE: 'pothole',
  ACCIDENT: 'accident',
  POOR_QUALITY: 'poor_quality',
  DEBRIS: 'debris',
  FLOODING: 'flooding',
  SIGNAGE_ISSUE: 'signage_issue',
  OTHER: 'other',
};

export const INCIDENT_TYPE_LABELS = {
  [INCIDENT_TYPES.POTHOLE]: 'Pothole',
  [INCIDENT_TYPES.ACCIDENT]: 'Accident',
  [INCIDENT_TYPES.POOR_QUALITY]: 'Poor Quality',
  [INCIDENT_TYPES.DEBRIS]: 'Debris',
  [INCIDENT_TYPES.FLOODING]: 'Flooding',
  [INCIDENT_TYPES.SIGNAGE_ISSUE]: 'Signage Issue',
  [INCIDENT_TYPES.OTHER]: 'Other',
};

export const INCIDENT_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

export const INCIDENT_SEVERITY_LABELS = {
  [INCIDENT_SEVERITY.LOW]: 'Low',
  [INCIDENT_SEVERITY.MEDIUM]: 'Medium',
  [INCIDENT_SEVERITY.HIGH]: 'High',
  [INCIDENT_SEVERITY.CRITICAL]: 'Critical',
};

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
};

export const DOCUMENT_TYPES = {
  CONTRACT: 'contract',
  TENDER: 'tender',
  COMPLETION_CERTIFICATE: 'completion_certificate',
  INSPECTION_REPORT: 'inspection_report',
  PAYMENT_RECEIPT: 'payment_receipt',
  OTHER: 'other',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  VERIFIED_USER: 'verified_user',
  USER: 'user',
};

export const MAP_CENTER = {
  lat: 20.5937,
  lng: 78.9629,
}; // Center of India

export const MAP_ZOOM = 5;