class CenterApiService {
    // Dynamically retrieve token before each request
    getToken() {
      return localStorage.getItem('token');
    }
  
    // Set token in localStorage
    setToken(token) {
      localStorage.setItem('token', token);
    }
  
    async request(endpoint, options = {}) {
      const response = await fetch(`http://localhost:8000/api/center${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response.json();
    }
  
    fetchDashboardData() {
      return this.request('/dashboard/');
    }
  
    fetchPickups(status = 'all') {
      return this.request(`/pickups/?status=${encodeURIComponent(status)}`);
    }
  
    updatePickupStatus(pickupId, action) {
      return this.request(`/pickups/${pickupId}/`, {
        method: 'POST',
        body: { action },
      });
    }
  
    fetchRecyclingStats(range = 'monthly') {
      return this.request(`/stats/?range=${encodeURIComponent(range)}`);
    }
  
    fetchMarketplacePurchases(category = 'all', search = '') {
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (search) params.append('search', search);
      return this.request(`/purchases/?${params.toString()}`);
    }
  
    fetchPerformanceMetrics(range = 'monthly') {
      return this.request(`/performance/?range=${encodeURIComponent(range)}`);
    }
  }
  
  // Create and export a singleton instance
  const centerApi = new CenterApiService();
  export default centerApi;