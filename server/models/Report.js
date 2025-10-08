import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
