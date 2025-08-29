const API_BASE_URL = 'http://localhost:8000/api/individual';

class IndividualApiService {
  // Dynamically retrieve token before each request
  getToken() {
    return localStorage.getItem('token');
  }

  // Set token in localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Centralized request handler
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`API error (${response.status}):`, errorData);
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  }

  // Dashboard data
  fetchDashboardData() {
    console.log(localStorage.getItem('token'));
    return this.request('/dashboard/');
  }

  // Pickups
  fetchPickups(type = 'all') {
    return this.request(`/pickups/?type=${encodeURIComponent(type)}`);
  }

  // Challenges
  fetchChallenges(type = 'all') {
    return this.request(`/challenges/?type=${encodeURIComponent(type)}`);
  }

  // Rewards
  fetchRewards(type = 'all') {
    return this.request(`/rewards/?type=${encodeURIComponent(type)}`);
  }

  // Marketplace items
  fetchMarketplaceItems(category = 'all', search = '') {
    const params = new URLSearchParams();
    if (category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    return this.request(`/marketplace/?${params.toString()}`);
  }

  // Create marketplace item
  createMarketplaceItem(itemData) {
    return this.request('/marketplace/create/', {
      method: 'POST',
      body: itemData,
    });
  }
}

export default new IndividualApiService();
