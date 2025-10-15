import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  tags: [String],
  category: {
    type: String,
    enum: ["Web", "Mobile", "AI", "ML", "Data Science", "Game", "IoT", "Blockchain", "Other"],
    default: "Other",
  },
  techStack: [
    {
      type: String, 
      trim: true,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },

  collaborators: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, default: "Contributor" },
    },
  ],
  githubRepo: {
    type: String,
    trim: true,
  },
  liveDemo: {
    type: String,
    trim: true,
  },
  documentation: {
    type: String, 
  },
  startDate: {
    type: Date,
    required: true,
  },
  isOngoing: {
    type: Boolean,
    default: true,
  },

  // 📂 Project Details
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  challenges: [
    {
      type: String,
      trim: true,
    },
  ],
  learnings: [
    {
      type: String,
      trim: true,
    },
  ],
  visibility: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
