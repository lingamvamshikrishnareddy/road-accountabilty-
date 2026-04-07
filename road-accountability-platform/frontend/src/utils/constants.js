export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

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

export const DOCUMENT_TYPES = [
  { value: 'contract', label: 'Contract' },
  { value: 'bid', label: 'Bid Document' },
  { value: 'progress_report', label: 'Progress Report' },
  { value: 'incident_report', label: 'Incident Report' },
  { value: 'completion_certificate', label: 'Completion Certificate' },
  { value: 'other', label: 'Other' },
];
