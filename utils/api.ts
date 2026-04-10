// ============================================================
// API Client — centralized fetch wrapper for the backend
// ============================================================

// Use VITE_API_URL in production, default to /api for local development
const API_BASE = import.meta.env.VITE_API_URL || '/api';

const getToken = (): string | null => localStorage.getItem('omnitratech_admin_token');

export const setToken = (token: string) => localStorage.setItem('omnitratech_admin_token', token);
export const clearToken = () => localStorage.removeItem('omnitratech_admin_token');
export const hasToken = () => !!getToken();

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, data: any) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(data) }),

  put: <T>(path: string, data: any) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(data) }),

  delete: <T = { success: boolean }>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
};

// ============================================================
// Auth helpers
// ============================================================
export async function login(username: string, password: string): Promise<string> {
  const res = await api.post<{ token: string }>('/admin/login', { username, password });
  setToken(res.token);
  return res.token;
}

export async function verifyToken(): Promise<boolean> {
  try {
    const token = getToken();
    if (!token) return false;
    
    // Simple verification by checking if token exists
    // The backend will validate on protected routes
    return true;
  } catch {
    clearToken();
    return false;
  }
}

export function logout() {
  clearToken();
}
