import cron from "node-cron";
import Event from "../models/Event.js";

// Run every 1 minute (adjust as needed)
cron.schedule("* * * * *", async () => {
  const now = new Date();

  try {
    await Event.updateMany(
      {
        status: { $in: ["Upcoming", "Ongoing"] },
        endDate: { $lt: now },
        isDeleted: false,
      },
      { status: "Completed" }
    );

    
    await Event.updateMany(
      {
        status: "Upcoming",
        startDate: { $lte: now },
        $or: [{ endDate: { $gt: now } }, { endDate: { $exists: false } }],
        isDeleted: false,
      },
      { status: "Ongoing" }
    );

    console.log("Event statuses updated ✅", new Date());
  } catch (error) {
    console.error("Error updating event statuses:", error);
  }
});
