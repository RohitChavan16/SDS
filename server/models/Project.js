import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
 
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
