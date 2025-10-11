import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

export default Report;
