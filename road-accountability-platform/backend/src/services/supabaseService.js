// Supabase service for database operations
const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY } = require('../config/env');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ========================
// ROADS
// ========================

const getRoadByQRCode = async (qrCode) => {
  const { data, error } = await supabase
    .from('roads')
    .select('*')
    .eq('qr_code', qrCode)
    .single();
  
  if (error) throw error;
  return data;
};

const getRoadById = async (id) => {
  const { data, error } = await supabase
    .from('roads')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const getAllRoads = async () => {
  const { data, error } = await supabase
    .from('roads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const createRoad = async (roadData) => {
  const { data, error } = await supabase
    .from('roads')
    .insert([roadData])
    .select();
  
  if (error) throw error;
  return data[0];
};

const updateRoad = async (id, roadData) => {
  const { data, error } = await supabase
    .from('roads')
    .update(roadData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

const deleteRoad = async (id) => {
  const { error } = await supabase
    .from('roads')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// ========================
// CONTRACTS
// ========================

const getContractsByRoad = async (roadId) => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .eq('road_id', roadId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const getContractById = async (id) => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const getAllContracts = async () => {
  const { data, error } = await supabase
    .from('contracts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const createContract = async (contractData) => {
  const { data, error } = await supabase
    .from('contracts')
    .insert([contractData])
    .select();
  
  if (error) throw error;
  return data[0];
};

const updateContract = async (id, contractData) => {
  const { data, error } = await supabase
    .from('contracts')
    .update(contractData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

const deleteContract = async (id) => {
  const { error } = await supabase
    .from('contracts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// ========================
// INCIDENTS
// ========================

const getIncidentsByRoad = async (roadId) => {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('road_id', roadId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const getIncidentById = async (id) => {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const getAllIncidents = async () => {
  const { data, error } = await supabase
    .from('incidents')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const createIncident = async (incidentData) => {
  const { data, error } = await supabase
    .from('incidents')
    .insert([incidentData])
    .select();
  
  if (error) throw error;
  return data[0];
};

const updateIncident = async (id, incidentData) => {
  const { data, error } = await supabase
    .from('incidents')
    .update(incidentData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

const deleteIncident = async (id) => {
  const { error } = await supabase
    .from('incidents')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// ========================
// DOCUMENTS
// ========================

const getDocumentsByRoad = async (roadId) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('road_id', roadId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const getDocumentById = async (id) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const getAllDocuments = async () => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const createDocument = async (documentData) => {
  const { data, error } = await supabase
    .from('documents')
    .insert([documentData])
    .select();
  
  if (error) throw error;
  return data[0];
};

const deleteDocument = async (id) => {
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// ========================
// ENTITIES (Contractors)
// ========================

const getContractors = async (filters = {}) => {
  let query = supabase.from('entities').select('*');
  
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const getContractorById = async (id) => {
  const { data, error } = await supabase
    .from('entities')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const createContractor = async (contractorData) => {
  const { data, error } = await supabase
    .from('entities')
    .insert([contractorData])
    .select();
  
  if (error) throw error;
  return data[0];
};

const updateContractor = async (id, contractorData) => {
  const { data, error } = await supabase
    .from('entities')
    .update(contractorData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

const deleteContractor = async (id) => {
  const { error } = await supabase
    .from('entities')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};

// ========================
// VERIFICATION
// ========================

const getVerificationQueue = async () => {
  const { data, error } = await supabase
    .from('verification_queue')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
};

const getVerificationItemById = async (id) => {
  const { data, error } = await supabase
    .from('verification_queue')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const approveVerification = async (id, userId) => {
  const { data, error } = await supabase
    .from('verification_queue')
    .update({ status: 'approved', reviewed_by: userId, reviewed_at: new Date() })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

const rejectVerification = async (id, userId, reason) => {
  const { data, error } = await supabase
    .from('verification_queue')
    .update({ status: 'rejected', reviewed_by: userId, reviewed_at: new Date(), rejection_reason: reason })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

// ========================
// ADMIN STATS
// ========================

const getAdminStats = async () => {
  const pendingRes = supabase
    .from('verification_queue')
    .select('id', { count: 'exact' })
    .eq('status', 'pending');
  
  const flaggedRes = supabase
    .from('documents')
    .select('id', { count: 'exact' })
    .eq('status', 'flagged');
  
  const usersRes = supabase
    .from('auth.users')
    .select('id', { count: 'exact' });
  
  const docsRes = supabase
    .from('documents')
    .select('id', { count: 'exact' });

  const [pending, flagged, users, docs] = await Promise.all([
    pendingRes,
    flaggedRes,
    usersRes,
    docsRes,
  ]);

  return {
    pendingVerifications: pending.count || 0,
    flaggedDocuments: flagged.count || 0,
    activeUsers: users.count || 0,
    totalDocuments: docs.count || 0,
  };
};

const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const updateUser = async (userId, userData) => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId)
    .select();
  
  if (error) throw error;
  return data[0];
};

module.exports = {
  getRoadByQRCode,
  getRoadById,
  getAllRoads,
  createRoad,
  updateRoad,
  deleteRoad,
  getContractsByRoad,
  getContractById,
  getAllContracts,
  createContract,
  updateContract,
  deleteContract,
  getIncidentsByRoad,
  getIncidentById,
  getAllIncidents,
  createIncident,
  updateIncident,
  deleteIncident,
  getDocumentsByRoad,
  getDocumentById,
  getAllDocuments,
  createDocument,
  deleteDocument,
  getContractors,
  getContractorById,
  createContractor,
  updateContractor,
  deleteContractor,
  getVerificationQueue,
  getVerificationItemById,
  approveVerification,
  rejectVerification,
  getAdminStats,
  getAllUsers,
  updateUser,
};