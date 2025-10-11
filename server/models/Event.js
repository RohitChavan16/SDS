import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: ""
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  tags: [String],
  location: {
    type: {
      type: String,
      enum: ["Virtual", "Physical"],
      default: "Physical",
    },
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    meetingLink: String, 
  },
    isPaid: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  capacity: {
    type: Number,
  },
  registeredUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
   waitlistUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
   status: {
    type: String,
    enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    default: "Upcoming",
  },
   announcements: [
    {
      title: String,
      message: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
   visibility: {
    type: String,
    enum: ["Public", "Private", "Invite-Only"],
    default: "Public",
  },
  recurring: {
    type: {
      isRecurring: { type: Boolean, default: false },
      frequency: { type: String, enum: ["Daily", "Weekly", "Monthly", "Yearly"] },
      until: Date,
    },
  },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;
