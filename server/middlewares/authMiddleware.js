const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

const protect = async (req, res, next) => {
  let token;
  // console.log(req)
  console.log("headers" in req);
  console.log("//++++++++ req.headers", req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("user's token", token);

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log("decoded token", decoded);
      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user)

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      console.log("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    console.log("Not authorized, no token");
  }
};

module.exports = { protect };
