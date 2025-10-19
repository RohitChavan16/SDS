import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
 title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  visibleTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
    fileUrl: {
      type: String, // stored link Cloudinary
      required: true,
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx", "doc", "pptx", "xlsx", "csv", "zip", "txt", "other"],
      default: "other",
    },
    fileName: {
      type: String,
      required: true,
    },
    status: {
    type: String,
    enum: ["Submitted", "Under Review", "Approved", "Rejected"],
    default: "Submitted",
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    version: {
      type: Number,
      default: 1,
    },

    sharedWith: [
      {
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sharedAt: { type: Date, default: Date.now },
      },
    ],

    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Private",
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

export default Report;
