import mongoose from "mongoose";

const verifyOtpSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  Model: { type: String, required: true, enum: ["User", "Member", "Faculty"] }, 
  type: { type: String, enum: ["verify", "reset"], required: true },
  otp: { type: String, required: true, default: "" }, 
  expireAt: { type: Number, default: 0 },
}, { timestamps: true });

const VerifyOtp = mongoose.models.VerifyOtp || mongoose.model("VerifyOtp", verifyOtpSchema);

export default VerifyOtp;
