import axios from 'axios';

const authService = {
  register: async (userData) => {
      try {
          const response = await axios.post('http://localhost:3000/register', userData);
          if (response.data.status === 'success') {
              return response.data;
          } else {
              throw new Error(response.data.message);
          }
      } catch (error) {
          throw new Error(error.response?.data?.message || 'Registration failed');
      }
  },

  login: async (email, password) => {
      try {
          const response = await axios.post('http://localhost:3000/login', { email, password });
          if (response.data.status === 'success') {
              // Store user data in localStorage
              localStorage.setItem('user', JSON.stringify(response.data.data));
              return response.data;
          } else {
              throw new Error(response.data.message);
          }
      } catch (error) {
          throw new Error(error.response?.data?.message || 'Login failed');
      }
  },

  logout: () => {
      localStorage.removeItem('user');
  },

  getCurrentUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
  },

  isLoggedIn: () => {
      return !!localStorage.getItem('user');
  }
};

export default authService;
