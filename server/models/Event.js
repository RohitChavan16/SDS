import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);
