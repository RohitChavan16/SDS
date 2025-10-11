import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Member from "../models/Member.js";

export const register = async (req, res) => {
  const {name, email, password, userType, notificationsEnabled, isAccountVerified, profileImage, role, designation, year, enrollmentNumber, phone} = req.body;

if(!name || !email || !password || !userType){
return res.json({success: false, message: 'Missing Details'});
}
try {
   if(userType === "User") {
    const existingUser = await User.findOne({email});
    if(existingUser) {
    return res.json({ success: false, message: "User already exists" });
    }
   }  else if(userType === "Member"){
    const existingMember = await Member.findOne({email});
    if(existingMember) {
    return res.json({ success: false, message: "Member already exists" });
    }
}

if(!isAccountVerified){
  return res.json({success: false, message: "Verify Account by otp"});
}


const hashedPassword = await bcrypt.hash(password, 10);
let ID = "";
if(userType === "User") {
const user = new User({name, email, password: hashedPassword, notificationsEnabled, isAccountVerified}); 
ID = user._id;
} else if(userType === "Member"){
  if(!enrollmentNumber && !phone){
    return res.json({success: false, message: 'Missing Details'});
  }
const member = new Member({name, email, password: hashedPassword, enrollmentNumber, phone, role, joinedAt: new Date()}); 
await member.save();
ID = member._id;
}

const token = jwt.sign({_id: ID}, process.env.JWT_SECRET, { expiresIn: '7d'});

res.cookie('token', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV == 'production' ? 'none': 'strict',
maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({ success: true, message: "User registered successfully" });

} catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ success: false, message: "Server error in register", error: error.message });
  }
};




export const login = async (req, res) => {

  const {email, password, userType} = req.body;

if(!email || ! password || !userType){
return res.json({success: false, message: 'Email and password are required'})
}
let user;
try {
if(userType === "User"){
 user = await User.findOne({email});
} else if(userType === "Member"){
 user = await Member.findOne({email});
}
if(!user){
return res.json({success: false, message: 'Invalid email'})
}

const isMatch = await bcrypt.compare(password, user.password);

if(!isMatch) {
return res.json({success: false, message: 'Invalid password'});
} 
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

res.cookie('token', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV == 'production' ? 'none': 'strict',
maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    res.status(200).json({ success: true, message: "Login successful" });
} catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ success: false, message: "Server error in login", error: error.message });
}
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ success: false, message: "Server error in logout", error: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    
    res.status(200).json({ success: true, message: "Verification OTP sent" });
  } catch (error) {
    console.error("Error in sendVerifyOtp:", error);
    res.status(500).json({ success: false, message: "Server error in sendVerifyOtp", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    
    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verifyEmail:", error);
    res.status(500).json({ success: false, message: "Server error in verifyEmail", error: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    
    res.status(200).json({ success: true, message: "User is authenticated" });
  } catch (error) {
    console.error("Error in isAuthenticated:", error);
    res.status(500).json({ success: false, message: "Server error in isAuthenticated", error: error.message });
  }
};

export const sendResetOtp = async (req, res) => {
  try {
    
    res.status(200).json({ success: true, message: "Password reset OTP sent" });
  } catch (error) {
    console.error("Error in sendResetOtp:", error);
    res.status(500).json({ success: false, message: "Server error in sendResetOtp", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: "Server error in resetPassword", error: error.message });
  }
};
