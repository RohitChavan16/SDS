import express from "express"
import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";

const facultyMiddleware = async (req, res, next) => {
const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please log in again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const faculty = await Faculty.findOne(decoded._id);

    if(!faculty){
        return res.status(401).json({success: false, message: "You are not a faculty advisor"});
    }
    if(!faculty.active){
        return res.status(403).json({success: false, message: "You are not a active faculty advisor"});
    }

    req.user = faculty; 

    next();
  } catch (error) {
    
    if (error.name === 'TokenExpiredError') {
  return res.status(401).json({
    success: false,
    message: "Session expired. Please log in again.",
  });
}
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
}
}

export default facultyMiddleware;