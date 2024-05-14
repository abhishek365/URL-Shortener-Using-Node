const jwt = require("jsonwebtoken");
const SECRET_KEY = "@@abhishek@@8120@@";

class Session {
  setUser(user) {
    return jwt.sign({ ...user }, SECRET_KEY);
  }

  getUser(token) {
    try {
      if (!token) return null;
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }
}

module.exports = Session;
