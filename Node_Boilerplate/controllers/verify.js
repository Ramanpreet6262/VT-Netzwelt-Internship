const jwt = require("jsonwebtoken");
const messages = require("../messages/messages");

exports.verify = (req, res, next) => {
  const token = req.header("auth_token");

  if (!token) {
    // return res.status(401).json({ message: messages.accessDenied });
    // Instead of returning error function created manually, we can return error through error handling middleware
    const error = new Error(messages.accessDenied);
    error.status = 401;
    throw error; 
  } else {
    try {
      const TOKEN_SECRET = process.env.TOKEN_SECRET || "hdioehfduewuifbjrfugr";
      const verify = jwt.verify(token, TOKEN_SECRET);
      req.user = verify;
      next();
    } catch {
      // res.status(401).json({ message: messages.invalidToken });
      // Instead of returning error function created manually, we can return error through error handling middleware
      const error = new Error(messages.invalidToken);
      error.status = 401;
      next(error); 
    }
  }
};
