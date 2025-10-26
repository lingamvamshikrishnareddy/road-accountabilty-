import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Roads API
export const roadsAPI = {
  getAll: (params) => api.get('/roads', { params }),
  getById: (id) => api.get(`/roads/${id}`),
  create: (data) => api.post('/roads', data),
  update: (id, data) => api.put(`/roads/${id}`, data),
  delete: (id) => api.delete(`/roads/${id}`),
  search: (query) => api.get('/roads/search', { params: { q: query } }),
};

// Contracts API
export const contractsAPI = {
  getAll: (params) => api.get('/contracts', { params }),
  getById: (id) => api.get(`/contracts/${id}`),
  getByRoad: (roadId) => api.get(`/roads/${roadId}/contracts`),
  create: (data) => api.post('/contracts', data),
  update: (id, data) => api.put(`/contracts/${id}`, data),
  delete: (id) => api.delete(`/contracts/${id}`),
};

// Incidents API
export const incidentsAPI = {
  getAll: (params) => api.get('/incidents', { params }),
  getById: (id) => api.get(`/incidents/${id}`),
  getByRoad: (roadId) => api.get(`/roads/${roadId}/incidents`),
  create: (data) => api.post('/incidents', data),
  update: (id, data) => api.put(`/incidents/${id}`, data),
  delete: (id) => api.delete(`/incidents/${id}`),
  getStats: () => api.get('/incidents/stats'),
};

// Documents API
export const documentsAPI = {
  getAll: (params) => api.get('/documents', { params }),
  getById: (id) => api.get(`/documents/${id}`),
  upload: (formData) => api.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/documents/${id}`),
  download: (id) => api.get(`/documents/${id}/download`, { responseType: 'blob' }),
};

// Entities API (Contractors, Officials, Ministers)
export const entitiesAPI = {
  getContractors: (params) => api.get('/entities/contractors', { params }),
  getContractorById: (id) => api.get(`/entities/contractors/${id}`),
  getOfficials: (params) => api.get('/entities/officials', { params }),
  getOfficialById: (id) => api.get(`/entities/officials/${id}`),
  getMinisters: (params) => api.get('/entities/ministers', { params }),
  getMinisterById: (id) => api.get(`/entities/ministers/${id}`),
};

// Verification API
export const verificationAPI = {
  getPendingItems: () => api.get('/verification/pending'),
  verify: (type, id) => api.post(`/verification/${type}/${id}/verify`),
  reject: (type, id, reason) => api.post(`/verification/${type}/${id}/reject`, { reason }),
};

// Admin API
export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserRole: (userId, role) => api.put(`/admin/users/${userId}/role`, { role }),
  getStats: () => api.get('/admin/stats'),
};

export default api;