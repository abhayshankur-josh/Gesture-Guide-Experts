export const API_ROUTES = {
    // Base URL - using Vite's environment variable pattern
    BASE_URL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000',

    VERSIONS: {
      V1: '/api/v1'
    },
    
    // Auth endpoints
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
      // REFRESH_TOKEN: '/auth/refresh-token',
      // FORGOT_PASSWORD: '/auth/forgot-password',
      // RESET_PASSWORD: '/auth/reset-password',
    },
    
    // // User endpoints
    // USERS: {
    //   ME: '/users/me',
    //   PROFILE: 'auth/profile',
    //   UPDATE_PROFILE: '/users/profile',
    // },
    
    // Resource endpoints with parameter functions
    SUBMISSIONS: {
      LIST: '/submissions',
      VIEW: '/submissions/view',
      UPDATE_ACTION: '/submissions/status',
      VIEW_DETAILS: (id: string) => `/submissions/view/${id}`,
      // CREATE: '/products',
      // UPDATE: (id: string) => `/products/${id}`,
      // DELETE: (id: string) => `/products/${id}`,
    },
    
    SIGNS: {
      LIST: '/signs',
      // DETAILS: (id: string) => `/orders/${id}`,
      // CREATE: '/orders',
      // UPDATE_STATUS: '/signs/status',
      // CANCEL: (id: string) => `/orders/${id}/cancel`,
    },
    
    // // Nested endpoints example
    // ADMIN: {
    //   USERS: '/admin/users',
    //   ANALYTICS: '/admin/analytics',
    //   SETTINGS: '/admin/settings',
    // }
  };