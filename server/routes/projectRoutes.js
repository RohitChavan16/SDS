import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { addProject, deleteProject, getAllProjects, getProjectById, toggleVisibility, updateProject } from "../controllers/projectController.js";

const projectRouter = express.Router();


projectRouter.get("/", getAllProjects);
projectRouter.get("/:id", getProjectById);


projectRouter.post("/add", adminMiddleware, addProject);
projectRouter.put("/:id", adminMiddleware, updateProject);
projectRouter.delete("/:id", adminMiddleware, deleteProject);
projectRouter.patch("/:id/visibility", adminMiddleware, toggleVisibility);

export default projectRouter;
