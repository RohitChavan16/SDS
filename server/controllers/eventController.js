import Event from "../models/Event.js";

export const getUpcomingEvents = async (req, res) => {
  try {
     const events = await Event.find({
      startDate: { $gte: new Date() },
      status: { $in: ["Upcoming", "Ongoing"] },
    }).sort({ startDate: 1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};








export const getPastEvents = async (req, res) => {
  try {
    const events = await Event.find({
      $or: [
        { endDate: { $lt: new Date() } },
        { startDate: { $lt: new Date() }, endDate: { $exists: false } },
      ],
      status: "Completed",
    }).sort({ startDate: -1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









export const getAllEvents = async (req, res) => {
  try {
    const events = (await Event.find()).sort({createdAt: -1});
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("registeredUsers", "name email")
      .populate("waitlistUsers", "name email");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    res.status(200).json({ success: true, event });
    }
  } catch (error) {
    console.error("Get event by ID error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID format",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, startDate } = req.body;

    if (!title || !description || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and start date are required",
      });
    }

    // Check if start date is not in the past
    if (new Date(startDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be in the past",
      });
    }

    // Validate end date if provided
    if (req.body.endDate && new Date(req.body.endDate) < new Date(startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Validate location
    if (req.body.location) {
      if (req.body.location.type === "Virtual" && !req.body.location.meetingLink) {
        return res.status(400).json({
          success: false,
          message: "Meeting link is required for virtual events",
        });
      }
      if (req.body.location.type === "Physical" && !req.body.location.address) {
        return res.status(400).json({
          success: false,
          message: "Address is required for physical events",
        });
      }
    }

    // Validate price for paid events
    if (req.body.isPaid && (!req.body.price || req.body.price <= 0)) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0 for paid events",
      });
    }

    const event = await Event.create(req.body);
    res.status(201).json({ success: true, message: "Event Ceated Succeefully", event });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
