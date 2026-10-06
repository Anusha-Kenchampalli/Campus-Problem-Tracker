import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cpt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to execute API requests directly
const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

// Authentication API (User / Student & Admin)
export const authAPI = {
  login: async (college_id, password) => {
    return handleRequest(() => api.post('/auth/login', { college_id, password }));
  },

  getMe: async () => {
    return handleRequest(() => api.get('/auth/me'));
  }
};

// USER / STUDENT PROBLEMS API
export const userProblemsAPI = {
  create: async (problemData) => {
    return handleRequest(() => api.post('/problems', problemData));
  },

  getUserProblems: async (params = {}) => {
    return handleRequest(() => api.get('/problems', { params }));
  },

  getById: async (id) => {
    return handleRequest(() => api.get(`/problems/${id}`));
  },

  submitFeedback: async (id, { rating, comment, user_name, user_id }) => {
    return handleRequest(() => api.post(`/problems/${id}/feedback`, { rating, comment, user_name, user_id }));
  }
};

// USER NOTIFICATIONS API
export const userNotificationsAPI = {
  getAll: async () => {
    return handleRequest(() => api.get('/notifications'));
  },

  markRead: async (id) => {
    return handleRequest(() => api.put(`/notifications/${id}/read`));
  }
};

// ADMIN PROBLEMS API
export const problemsAPI = {
  getAll: async (params = {}) => {
    return handleRequest(() => api.get('/admin/problems', { params }));
  },

  getById: async (id) => {
    return handleRequest(() => api.get(`/admin/problems/${id}`));
  },

  updatePriority: async (id, priority) => {
    return handleRequest(() => api.put(`/admin/problems/${id}/priority`, { priority }));
  },

  assign: async (id, { department_id, staff_id }) => {
    return handleRequest(() => api.put(`/admin/problems/${id}/assign`, { department_id, staff_id }));
  },

  updateStatus: async (id, { status, reason, resolution_note }) => {
    return handleRequest(() => api.put(`/admin/problems/${id}/status`, { status, reason, resolution_note }));
  }
};

// Departments API
export const departmentsAPI = {
  getAll: async () => {
    return handleRequest(() => api.get('/departments'));
  },
  create: async (deptData) => {
    return handleRequest(() => api.post('/departments', deptData));
  },
  update: async (id, deptData) => {
    return handleRequest(() => api.put(`/departments/${id}`, deptData));
  }
};

// Staff API
export const staffAPI = {
  getAll: async (department_id = null) => {
    return handleRequest(() => api.get('/staff', { params: { department_id } }));
  },
  create: async (staffData) => {
    return handleRequest(() => api.post('/staff', staffData));
  },
  update: async (id, staffData) => {
    return handleRequest(() => api.put(`/staff/${id}`, staffData));
  }
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    return handleRequest(() => api.get('/categories'));
  },
  create: async (categoryData) => {
    return handleRequest(() => api.post('/categories', categoryData));
  },
  update: async (id, categoryData) => {
    return handleRequest(() => api.put(`/categories/${id}`, categoryData));
  }
};

// Locations API
export const locationsAPI = {
  getAll: async () => {
    return handleRequest(() => api.get('/locations'));
  },
  create: async (locationData) => {
    return handleRequest(() => api.post('/locations', locationData));
  },
  update: async (id, locationData) => {
    return handleRequest(() => api.put(`/locations/${id}`, locationData));
  }
};

// Analytics API
export const analyticsAPI = {
  get: async () => {
    return handleRequest(() => api.get('/admin/analytics'));
  }
};

// Feedback API
export const feedbackAPI = {
  getAll: async () => {
    return handleRequest(() => api.get('/admin/feedback'));
  }
};

// Admin Notifications API
export const notificationsAPI = {
  getAll: async () => {
    return handleRequest(() => api.get('/admin/notifications'));
  },
  markRead: async (id) => {
    return handleRequest(() => api.put(`/admin/notifications/${id}/read`));
  }
};

export default api;
