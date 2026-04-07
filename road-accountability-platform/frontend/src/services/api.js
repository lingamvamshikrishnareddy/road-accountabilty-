import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const roadsAPI = {
  getByQRCode: (qrCode) => axios.get(`${API_BASE_URL}/roads/qr/${qrCode}`),
  getById: (id) => axios.get(`${API_BASE_URL}/roads/${id}`),
  getAll: () => axios.get(`${API_BASE_URL}/roads`),
  create: (data) => axios.post(`${API_BASE_URL}/roads`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/roads/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/roads/${id}`),
};

export const contractsAPI = {
  getByRoad: (roadId) => axios.get(`${API_BASE_URL}/contracts?roadId=${roadId}`),
  getById: (id) => axios.get(`${API_BASE_URL}/contracts/${id}`),
  getAll: () => axios.get(`${API_BASE_URL}/contracts`),
  create: (data) => axios.post(`${API_BASE_URL}/contracts`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/contracts/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/contracts/${id}`),
};

export const incidentsAPI = {
  getByRoad: (roadId) => axios.get(`${API_BASE_URL}/incidents?roadId=${roadId}`),
  getById: (id) => axios.get(`${API_BASE_URL}/incidents/${id}`),
  getAll: () => axios.get(`${API_BASE_URL}/incidents`),
  create: (data) => axios.post(`${API_BASE_URL}/incidents`, data),
  update: (id, data) => axios.put(`${API_BASE_URL}/incidents/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE_URL}/incidents/${id}`),
};

export const adminAPI = {
  getStats: () => axios.get(`${API_BASE_URL}/admin/stats`),
  getUsers: () => axios.get(`${API_BASE_URL}/admin/users`),
  getVerificationQueue: () => axios.get(`${API_BASE_URL}/admin/verification-queue`),
  getAnalytics: () => axios.get(`${API_BASE_URL}/admin/analytics`),
  updateUser: (userId, data) => axios.put(`${API_BASE_URL}/admin/users/${userId}`, data),
};

export const entitiesAPI = {
  getContractors: (params) => axios.get(`${API_BASE_URL}/entities/contractors`, { params }),
  getContractorById: (id) => axios.get(`${API_BASE_URL}/entities/contractors/${id}`),
  createContractor: (data) => axios.post(`${API_BASE_URL}/entities/contractors`, data),
  updateContractor: (id, data) => axios.put(`${API_BASE_URL}/entities/contractors/${id}`, data),
  deleteContractor: (id) => axios.delete(`${API_BASE_URL}/entities/contractors/${id}`),
};

export const documentsAPI = {
  upload: (formData) => axios.post(`${API_BASE_URL}/documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getByRoad: (roadId) => axios.get(`${API_BASE_URL}/documents?roadId=${roadId}`),
  getById: (id) => axios.get(`${API_BASE_URL}/documents/${id}`),
  getAll: () => axios.get(`${API_BASE_URL}/documents`),
  delete: (id) => axios.delete(`${API_BASE_URL}/documents/${id}`),
  verify: (id, data) => axios.post(`${API_BASE_URL}/documents/${id}/verify`, data),
};

export const verificationAPI = {
  getQueue: () => axios.get(`${API_BASE_URL}/verification/queue`),
  getById: (id) => axios.get(`${API_BASE_URL}/verification/${id}`),
  approve: (id, data) => axios.post(`${API_BASE_URL}/verification/${id}/approve`, data),
  reject: (id, data) => axios.post(`${API_BASE_URL}/verification/${id}/reject`, data),
};

export default {
  roadsAPI,
  contractsAPI,
  incidentsAPI,
  adminAPI,
  entitiesAPI,
  documentsAPI,
  verificationAPI,
};
