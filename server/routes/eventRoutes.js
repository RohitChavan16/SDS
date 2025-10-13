import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { createEvent, deleteEvent, getDeletedEvent, getEventById, getOngoingEvents, getPastEvents, getUpcomingEvents, updateEvent } from "../controllers/eventController.js";

const eventRouter = express.Router();


eventRouter.get("/upcoming", getUpcomingEvents);
eventRouter.get("/past", getPastEvents);
eventRouter.get("/", getOngoingEvents);
eventRouter.get("/:id", getEventById);

eventRouter.post("/add", adminMiddleware, createEvent);
eventRouter.put("/:id", adminMiddleware, updateEvent);
eventRouter.delete("/:id", adminMiddleware, deleteEvent);
eventRouter.get("/delete-event", adminMiddleware, getDeletedEvent);


export default eventRouter;
