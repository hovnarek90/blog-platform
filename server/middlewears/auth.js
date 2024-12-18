const auth = {
  token: null,
  login(username, password) {
    // Simulate API call for authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "password") {
          this.token = "mocked-jwt-token"; // Simulated token
          resolve(this.token);
        } else {
          reject("Invalid credentials");
        }
      }, 1000);
    });
  },
  logout() {
    this.token = null;
  },
  isAuthenticated() {
    return !!this.token;
  },
};

// Export for use in other scripts
export default auth;
