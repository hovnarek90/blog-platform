const auth = {
  token: null,
  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "password") {
          this.token = "mocked-jwt-token"; 
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

export default auth;
