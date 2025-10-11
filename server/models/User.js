import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: [true, "Password is Required"]},
isAccountVerified: {type: Boolean, default: false},
registeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
   bookmarkedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  bookmarkedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
   bio: {
    type: String,
    trim: true,
  },
  notificationsEnabled: {
      type: Boolean,
      default: true,
    },
    isBanned: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
