const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const authenticate = async (req, res, next) => {
    try {
      const authorizationHeader = req.header("Authorization");
  
      if (!authorizationHeader) {
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
      }
  
      const token = authorizationHeader.replace("Bearer ", "");
      const decode = jwt.verify(token, "your-secret-key");
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  
      const remainingTimeInSeconds = decode.exp - currentTimestamp;
  
      console.log(
        "Remaining time until token expiration:",
        remainingTimeInSeconds,
        "seconds"
      );
      const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
      const remainingHours = Math.floor(remainingMinutes / 60);
  
      console.log(
        "Remaining time until token expiration:",
        remainingHours,
        "hours and",
        remainingMinutes % 60,
        "minutes"
      );
  
      // Find the user by email and token in the user's document
      let existingUser;
      existingUser = await User.findOne({ email: decode.email, token });
      
      //const existingUser = await user.findOne({ email: decode.email, token });
  
      if (existingUser) {
        req.user = existingUser;
        req.token = token;
        next(); // Call next to proceed to the next middleware or route handler
      } else {
        return res.status(401).json({ message: "Authentication failed" });
      }
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res
          .status(500)
          .json({ status: 500, message: "Token has expired. Please login" });
      } else {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
  module.exports = authenticate;
  