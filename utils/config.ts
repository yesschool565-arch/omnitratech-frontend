/**
 * Frontend Configuration
 * Handles environment-specific settings for API endpoints and assets
 */

// Get API base URL from environment or use default
const getApiUrl = (): string => {
  if (typeof window !== 'undefined' && process.env.VITE_API_URL) {
    return process.env.VITE_API_URL;
  }
  
  // Development: localhost:3001/api
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001/api';
  }
  
  // Production: use relative path
  return '/api';
};

const API_BASE_URL = getApiUrl();

// Extract base URL without /api suffix for asset requests
const getBaseUrl = (): string => {
  const url = API_BASE_URL;
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

export const CONFIG = {
  API_URL: API_BASE_URL,
  BASE_URL: getBaseUrl(),
  NOISE_SVG_URL: `${getBaseUrl()}/api/assets/noise.svg`,
  
  // Settings endpoints
  SETTINGS_URL: `${API_BASE_URL}/settings`,
  
  // Services endpoints
  SERVICES_URL: `${API_BASE_URL}/services`,
  
  // Industries endpoints
  INDUSTRIES_URL: `${API_BASE_URL}/industries`,
  
  // Resources endpoints
  RESOURCES_URL: `${API_BASE_URL}/resources`,
  
  // Jobs endpoints
  JOBS_URL: `${API_BASE_URL}/jobs`,
  
  // Footer links endpoints
  FOOTER_LINKS_URL: `${API_BASE_URL}/footer-links`,
  
  // Form entries endpoints
  FORM_ENTRIES_URL: `${API_BASE_URL}/form-entries`,
  
  // Auth endpoints
  AUTH_LOGIN_URL: `${API_BASE_URL}/auth/login`,
  AUTH_VERIFY_URL: `${API_BASE_URL}/auth/verify`,
};

export default CONFIG;
