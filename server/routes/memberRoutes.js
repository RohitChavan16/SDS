import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { addMember, deleteMember, getAllActiveMember, getAllMembers, getMemberById, getMembersByRole, updateMember } from "../controllers/memberController.js";


const memberRouter = express.Router();

memberRouter.get("/", getAllMembers);
memberRouter.get("/active", getAllActiveMember);
memberRouter.get("/role/:role", getMembersByRole);
memberRouter.get("/:id", getMemberById);

memberRouter.post("/add", adminMiddleware, addMember);
memberRouter.put("/:id", adminMiddleware, updateMember);
memberRouter.delete("/:id", adminMiddleware, deleteMember);

export default memberRouter;
