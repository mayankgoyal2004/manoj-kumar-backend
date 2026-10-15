// Portfolio Website API client for live data fetching & contact form submission
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api/public';

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    // Graceful offline fallback
    console.warn(`Backend fetch failed for ${endpoint}:`, err);
    return null;
  }
}

export interface ContactSubmissionPayload {
  fullName: string;
  organization?: string;
  email: string;
  phone?: string;
  purpose: string;
  message: string;
}

export const portfolioApi = {
  // Fast overview bundle
  getOverview: async () => {
    return fetchJson<any>('/overview');
  },

  // Profile details
  getProfile: async () => {
    return fetchJson<any>('/profile');
  },

  // Collections
  getPositions: async (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return fetchJson<any[]>(`/positions${query}`);
  },

  getEducation: async () => {
    return fetchJson<any[]>('/education?pageSize=100');
  },

  getAwards: async () => {
    return fetchJson<any[]>('/awards?pageSize=100');
  },

  getPatents: async () => {
    return fetchJson<any[]>('/patents?pageSize=100');
  },

  getPublications: async (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return fetchJson<any[]>(`/publications${query}`);
  },

  getBooks: async () => {
    return fetchJson<any[]>('/books?pageSize=500');
  },

  getGrants: async () => {
    return fetchJson<any[]>('/grants?pageSize=500');
  },

  getSupervision: async () => {
    return fetchJson<any[]>('/supervision?pageSize=500');
  },

  getConferences: async () => {
    return fetchJson<any[]>('/conferences?pageSize=500');
  },

  getAffiliations: async () => {
    return fetchJson<any[]>('/affiliations?pageSize=500');
  },

  getMous: async () => {
    return fetchJson<any[]>('/mous?pageSize=500');
  },

  getNews: async () => {
    return fetchJson<any[]>('/news?pageSize=500');
  },

  getGallery: async () => {
    return fetchJson<any[]>('/gallery?pageSize=500');
  },

  getDocuments: async () => {
    return fetchJson<any[]>('/documents?pageSize=500');
  },

  getSettings: async () => {
    return fetchJson<any>('/settings');
  },

  // Submit contact message directly to the backend
  submitContact: async (payload: ContactSubmissionPayload) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to submit contact message');
    }
    return json;
  },
};

export default portfolioApi;
