// Main server file
const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/env');
const roadRoutes = require('./routes/roads');
const authRoutes = require('./routes/auth');
const contractRoutes = require('./routes/contracts');
const incidentRoutes = require('./routes/incidents');
const documentRoutes = require('./routes/documents');
const entityRoutes = require('./routes/entities');
const verificationRoutes = require('./routes/verification');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/roads', roadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;