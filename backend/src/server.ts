import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import servicesRoutes from './routes/services';
import resourcesRoutes from './routes/resources';
import jobsRoutes from './routes/jobs';
import industriesRoutes from './routes/industries';
import adminRoutes from './routes/admin';
import footerLinksRoutes from './routes/footerLinks';
import formEntriesRoutes from './routes/formEntries';
import settingsRoutes from './routes/settings';
import { getAdminDashboardHTML } from './services/adminDashboard';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// Support both FRONTEND_URL and CORS_ORIGIN for flexibility
const CORS_ORIGIN = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:5175';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Admin Dashboard
app.get('/admin', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(getAdminDashboardHTML());
});

// API Routes
app.use('/api/services', servicesRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/industries', industriesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/footer-links', footerLinksRoutes);
app.use('/api/form-entries', formEntriesRoutes);
app.use('/api/settings', settingsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 CORS enabled for: ${FRONTEND_URL}`);
  console.log(`✅ Database: JSON-based (${process.env.DB_TYPE || 'json'})`);
});
