export const API_ROUTES = {
    // Base URL - using Vite's environment variable pattern
    BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000/api/v1',
    
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      LOGOUT: '/auth/logout',
      REFRESH_TOKEN: '/auth/refresh-token',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
    },
    
    // User endpoints
    USERS: {
      ME: '/users/me',
      PROFILE: '/users/profile',
      UPDATE_PROFILE: '/users/profile',
    },
    
    // Resource endpoints with parameter functions
    PRODUCTS: {
      LIST: '/products',
      DETAILS: (id: string) => `/products/${id}`,
      CREATE: '/products',
      UPDATE: (id: string) => `/products/${id}`,
      DELETE: (id: string) => `/products/${id}`,
    },
    
    ORDERS: {
      LIST: '/orders',
      DETAILS: (id: string) => `/orders/${id}`,
      CREATE: '/orders',
      UPDATE: (id: string) => `/orders/${id}`,
      CANCEL: (id: string) => `/orders/${id}/cancel`,
    },
    
    // Nested endpoints example
    ADMIN: {
      USERS: '/admin/users',
      ANALYTICS: '/admin/analytics',
      SETTINGS: '/admin/settings',
    }
  };