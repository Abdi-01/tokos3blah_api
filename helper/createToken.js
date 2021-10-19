const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, "private123", {
      expiresIn: "12h",
    });
  },
  decriptToken: (token) => {
    return jwt.verify(token,"private123")
  }
};
