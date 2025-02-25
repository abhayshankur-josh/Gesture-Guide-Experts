
export const ROUTES = {
    // Public routes
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    
    // Protected routes
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    
    // Feature-specific routes
    PRODUCTS: {
      LIST: '/products',
      DETAILS: (id: string) => `/products/${id}`,
      CREATE: '/products/create',
      EDIT: (id: string) => `/products/${id}/edit`,
    },
    
    ORDERS: {
      LIST: '/orders',
      DETAILS: (id: string) => `/orders/${id}`,
    },
    
    // Nested routes example
    ADMIN: {
      ROOT: '/admin',
      USERS: '/admin/users',
      ANALYTICS: '/admin/analytics',
      SETTINGS: '/admin/settings',
    }
  };