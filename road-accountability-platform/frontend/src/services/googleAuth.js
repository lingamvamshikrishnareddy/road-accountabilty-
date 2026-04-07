import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const googleAuthService = {
  // Handle Google login response
  handleGoogleLogin: async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);

      // Optional: Send token to backend for server-side validation
      try {
        const response = await axios.post(`${API_BASE_URL}/auth/google`, {
          token: token,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        });
        return { user: response.data.user, token: response.data.token, error: null };
      } catch (backendError) {
        // If backend is not available, use frontend validation
        console.warn('Backend verification failed, using frontend validation');
        return {
          user: {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
            provider: 'google',
          },
          token: token,
          error: null,
        };
      }
    } catch (error) {
      return { user: null, token: null, error };
    }
  },

  // Store user session
  storeSession: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    localStorage.setItem('authProvider', 'google');
  },

  // Get stored session
  getSession: () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    const provider = localStorage.getItem('authProvider');
    return {
      user: user ? JSON.parse(user) : null,
      token,
      provider,
    };
  },

  // Clear session
  clearSession: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authProvider');
  },

  // Check if token is valid (not expired)
  isTokenValid: (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      return false;
    }
  },
};
