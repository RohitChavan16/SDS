import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import facultyMiddleware from "../middleware/facultyMiddleware.js";
import { deleteReport, downloadReport, facultyAction, getAllReports, getReportById, shareReportWithAdvisor, updateReport, uploadReport } from "../controllers/reportController.js";

const reportRouter = express.Router();


reportRouter.post("/add", adminMiddleware, uploadReport);
reportRouter.get("/", adminMiddleware, getAllReports);
reportRouter.delete("/:id", adminMiddleware, deleteReport);
reportRouter.put("/:id", adminMiddleware, updateReport);
reportRouter.post("/:id/share", adminMiddleware, shareReportWithAdvisor);

reportRouter.get("/check-report", facultyMiddleware, getAllReports);
reportRouter.get("/faculty-action/:id", facultyMiddleware, facultyAction);
reportRouter.get("download/:id", downloadReport);


reportRouter.get("/:id", getReportById);

export default reportRouter;
