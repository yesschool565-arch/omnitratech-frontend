/**
 * Frontend API Client for Omnitratech Backend
 * This utility handles all API calls to the backend server
 * The backend proxies requests to WordPress REST API
 */

const API_BASE_URL = process.env.VITE_API_URL || '/api';

// Types (matching backend data models)
export interface ServiceFeature {
  title: string;
  desc: string;
  iconName: string;
}

export interface ServiceModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  features: ServiceFeature[];
}

export interface ResourceModel {
  id: string;
  title: string;
  category: string;
  format: string;
  date: string;
  readTime: string;
}

export interface JobModel {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  tags: string[];
}

export interface IndustryFeature {
  title: string;
  desc: string;
  iconName: string;
}

export interface IndustryModel {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  fullDescription: string;
  image: string;
  features: IndustryFeature[];
  solutions: string[];
}

// Utility function for API calls with error handling
const apiCall = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Services API
export const servicesAPI = {
  /**
   * Get all services
   */
  getAll: async (): Promise<ServiceModel[]> => {
    return apiCall<ServiceModel[]>('/services');
  },

  /**
   * Get single service by slug
   */
  getBySlug: async (slug: string): Promise<ServiceModel> => {
    return apiCall<ServiceModel>(`/services/${slug}`);
  },
};

// Resources API
export const resourcesAPI = {
  /**
   * Get all resources
   */
  getAll: async (): Promise<ResourceModel[]> => {
    return apiCall<ResourceModel[]>('/resources');
  },

  /**
   * Get single resource by ID
   */
  getById: async (id: string | number): Promise<ResourceModel> => {
    return apiCall<ResourceModel>(`/resources/${id}`);
  },
};

// Jobs API
export const jobsAPI = {
  /**
   * Get all available jobs
   */
  getAll: async (): Promise<JobModel[]> => {
    return apiCall<JobModel[]>('/jobs');
  },

  /**
   * Get single job by ID
   */
  getById: async (id: string | number): Promise<JobModel> => {
    return apiCall<JobModel>(`/jobs/${id}`);
  },
};

// Industries API
export const industriesAPI = {
  /**
   * Get all industries
   */
  getAll: async (): Promise<IndustryModel[]> => {
    return apiCall<IndustryModel[]>('/industries');
  },

  /**
   * Get single industry by slug
   */
  getBySlug: async (slug: string): Promise<IndustryModel> => {
    return apiCall<IndustryModel>(`/industries/${slug}`);
  },
};

// Health check
export const healthCheck = async (): Promise<{ status: string }> => {
  try {
    return await apiCall('/health');
  } catch {
    return { status: 'DOWN' };
  }
};

// Export all APIs
export const api = {
  services: servicesAPI,
  resources: resourcesAPI,
  jobs: jobsAPI,
  industries: industriesAPI,
  health: healthCheck,
};
