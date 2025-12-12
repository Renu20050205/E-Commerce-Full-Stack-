const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ msg: "Access Denied! Token Missing or Malformed!" });
    }

    token = token.split(" ")[1].trim();

    const verifiedToken = jwt.verify(token, "my-secret-key");
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Invalid or Expired Token!" });
  }
};

module.exports = authMiddleware;
