import express from "express"
import Member from "../models/Member.js";

const adminMiddleware = async (req, res, next) => {
try {
    const { token } = req.cookies || req.query.token;        

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const member = await Member.findById(decoded._id);

    if (!member) {
      return res.status(401).json({ message: "Only club member can add" });
    }
    
    req.user = member; 
    next(); 
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export default adminMiddleware;