export default {
  user: {
    setCurrentUser(username) {
      this.username = username;
    },
    getCurrentUser() {
      return this.username;
    },
  },
};
