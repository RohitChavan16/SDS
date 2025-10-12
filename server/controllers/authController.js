import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Member from "../models/Member.js";
import transporter from "../config/nodemailer.js";
import VerifyOtp from "../models/VerifyOtp.js";

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


const hashedPassword = await bcrypt.hash(password, 10);
let ID = "";
if(userType === "User") {
const user = new User({name, email, password: hashedPassword, notificationsEnabled, isAccountVerified}); 
await user.save();
ID = user._id;
} else if(userType === "Member"){
  if(!enrollmentNumber && !phone){
    return res.json({success: false, message: 'Missing Details'});
  }
const member = new Member({name, email, password: hashedPassword, enrollmentNumber, phone, role, designation, year, joinedAt: new Date()}); 
await member.save();
ID = member._id;
}

const token = jwt.sign({_id: ID}, process.env.JWT_SECRET, { expiresIn: '7d'});

res.cookie('token', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV == 'production' ? 'none': 'strict',
maxAge: 7 * 24 * 60 * 60 * 1000 });

const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to SDS",
    text: `Dear ${email},

We are pleased to inform you that your SDS account has been successfully created.
You can now access your dashboard, manage your profile, and begin using our platform.
Thank you for joining us — we are excited to have you as part of the SDS community.
Warm regards,  
The SDS Team`,
}

await transporter.sendMail(mailOptions);

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
     const userId = req.user._id;                                            // const { userId } = req.body;
   if (!userId) {
  return res.status(400).json({ success: false, message: "Invalid user ID from token" });
}   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    await VerifyOtp.deleteMany({ userId, type: "verify" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const verifyOtp = new VerifyOtp({userId, Model: "User", type: "verify", otp, expireAt: Date.now() + 5 * 60 * 1000});
    
    await verifyOtp.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Mail send error:", mailError);
      return res.status(500).json({ success: false, message: "Failed to send OTP email." });
    }
    res.status(200).json({ success: true, message: "Verification OTP sent" });
  } catch (error) {
    console.error("Error in sendVerifyOtp:", error);
    res.status(500).json({ success: false, message: "Server error in sendVerifyOtp", error: error.message });
  }
};













export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user?._id;

  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Missing details",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const verifyOtp = await VerifyOtp.findOne({ userId, type: "verify" });
    if (!verifyOtp) {
      return res.json({ success: false, message: "Please Try again sendin the otp" });
    }
    if ( verifyOtp.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (verifyOtp.expireAt < Date.now()) {
      await VerifyOtp.deleteOne({ _id: verifyOtp._id });
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;

    await user.save();
    await VerifyOtp.deleteOne({ _id: verifyOtp._id });
    
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
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    await VerifyOtp.deleteMany({ userId: "", type: "reset" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const verifyOtp = new VerifyOtp({userId: email, Model: "User", type: "reset", otp, expireAt: Date.now() + 5 * 60 * 1000});
    
    await verifyOtp.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
     
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: "Password reset OTP sent" });
  } catch (error) {
    console.error("Error in sendResetOtp:", error);
    res.status(500).json({ success: false, message: "Server error in sendResetOtp", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and New Password are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const verifyOtp = await VerifyOtp.findOne({ userId: email, type: "reset" });

    if ( verifyOtp.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (verifyOtp.expireAt < Date.now()) {
      await VerifyOtp.deleteOne({ _id: verifyOtp._id });
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
   
    await VerifyOtp.deleteOne({ _id: verifyOtp._id });
    
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ success: false, message: "Server error in resetPassword", error: error.message });
  }
};
