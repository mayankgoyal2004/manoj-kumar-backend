// Dedicated API Client connecting the Dashboard to the PostgreSQL/Prisma Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'academic_portfolio_jwt';

export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  if (typeof window === 'undefined') return;
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }
}

async function request(endpoint, options = {}) {
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  // If 401 Unauthorized, revoke stored token and notify auth state
  if (response.status === 401) {
    setAuthToken(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
  }

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.errors = data?.errors;
    throw error;
  }

  return data;
}

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const res = await request('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res.data?.token) setAuthToken(res.data.token);
      return res.data;
    },
    register: async (userData) => {
      const res = await request('/admin/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      if (res.data?.token) setAuthToken(res.data.token);
      return res.data;
    },
    me: async () => {
      const res = await request('/admin/auth/me');
      return res.data;
    },
    updateAccount: async (patch) => {
      const res = await request('/admin/auth/account', {
        method: 'PUT',
        body: JSON.stringify(patch),
      });
      return res.data;
    },
    changePassword: async (currentPassword, newPassword) => {
      const res = await request('/admin/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      return res.data;
    },
    logout: () => {
      setAuthToken(null);
    },
  },

  // Dashboard Stats & Analytics
  stats: {
    getDashboardStats: async () => {
      const res = await request('/admin/stats');
      return res.data;
    },
  },

  // Executive Profile
  profile: {
    get: async () => {
      const res = await request('/admin/profile');
      return res.data;
    },
    update: async (patch) => {
      const res = await request('/admin/profile', {
        method: 'PUT',
        body: JSON.stringify(patch),
      });
      return res.data;
    },
    updateMetrics: async (metrics) => {
      const res = await request('/admin/profile/metrics', {
        method: 'PUT',
        body: JSON.stringify({ metrics }),
      });
      return res.data;
    },
  },

  // Generic Module Resource Operations
  modules: {
    getAll: async (moduleKey, params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await request(`/admin/${moduleKey}${query ? `?${query}` : ''}`);
      return res.data;
    },
    getById: async (moduleKey, id) => {
      const res = await request(`/admin/${moduleKey}/${id}`);
      return res.data;
    },
    create: async (moduleKey, record) => {
      const res = await request(`/admin/${moduleKey}`, {
        method: 'POST',
        body: JSON.stringify(record),
      });
      return res.data;
    },
    update: async (moduleKey, id, patch) => {
      const res = await request(`/admin/${moduleKey}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(patch),
      });
      return res.data;
    },
    remove: async (moduleKey, id) => {
      const res = await request(`/admin/${moduleKey}/${id}`, {
        method: 'DELETE',
      });
      return res.data;
    },
  },

  // Website Settings
  settings: {
    getPublicSettings: async () => {
      const res = await request('/public/settings');
      return res.data;
    },
    getWebsiteSettings: async () => {
      const token = getAuthToken();
      if (!token) {
        const res = await request('/public/settings');
        return res.data;
      }
      try {
        const res = await request('/admin/website-settings');
        return res.data;
      } catch (err) {
        const res = await request('/public/settings');
        return res.data;
      }
    },
    updateWebsiteSettings: async (settings) => {
      const res = await request('/admin/website-settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      return res.data;
    },
  },

  // Contact / Secretariat Inquiries
  contact: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await request(`/admin/contact-messages${query ? `?${query}` : ''}`);
      return res.data;
    },
    update: async (id, patch) => {
      const res = await request(`/admin/contact-messages/${id}`, {
        method: 'PUT',
        body: JSON.stringify(patch),
      });
      return res.data;
    },
    remove: async (id) => {
      const res = await request(`/admin/contact-messages/${id}`, {
        method: 'DELETE',
      });
      return res.data;
    },
  },

  // File Upload
  upload: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/admin/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.message || 'File upload failed');
    return data.data;
  },

  // Public Overview
  public: {
    getOverview: async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public/overview`);
        if (!response.ok) return null;
        const json = await response.json();
        return json.data || null;
      } catch {
        return null;
      }
    },
  },
};

export default api;
