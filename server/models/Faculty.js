import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  coepEmail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: [true, "Password is Required"]
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    enum: ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Advisor"],
    default: "Lecturer",
  },
  facultyId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },

  assignedReports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },
  ],

  joinedOn: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true });

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
