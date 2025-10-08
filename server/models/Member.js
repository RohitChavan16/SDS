import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({

}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
