const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      console.log("Token is missing");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = _id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checkToken;
