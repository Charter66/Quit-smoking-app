const jwt = require('jsonwebtoken');

const checkToken = (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
        console.log(error)
    };

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = _id;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = checkToken;