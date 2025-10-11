import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  profileImage: {
    type: String, 
  },
  enrollmentNumber: {
    type: String, 
    trim: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Moderator", "Event Manager", "Treasurer", "Member"],
    default: "Member",
  },
  designation: {
    type: String, 
  },
  year: {
    type: String, 
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  leftAt: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  permissions: {
    canCreateEvent: { type: Boolean, default: false },
    canEditEvent: { type: Boolean, default: false },
    canDeleteEvent: { type: Boolean, default: false },
    canManageMembers: { type: Boolean, default: false },
    canPostAnnouncements: { type: Boolean, default: false },
  },
  contributions: [
    {
      projectName: String,
      description: String,
      date: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
