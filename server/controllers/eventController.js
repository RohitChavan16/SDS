import Event from "../models/Event.js";

export const getUpcomingEvents = async (req, res) => {
  try {
     const events = await Event.find({
      startDate: { $gte: new Date() },
      status: { $in: ["Upcoming", "Ongoing"] },
      isDeleted: false
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
      isDeleted: false
    }).sort({ startDate: -1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









export const getOngoingEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "Ongoing", isDeleted: false }).sort({createdAt: -1}).lean();
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
    }
    if(event.isDeleted){
      return res.status(409).json({success: false, message: "Event is deleted or it is no live"});
    }
    res.status(200).json({ success: true, event, message: "Event found successfull" });
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
    const eventId = req.params.id;
    if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ success: false, message: "Invalid event ID" });
    }
    const event = await Event.findByIdAndUpdate(eventId, req.body, { new: true, runValidators: true });
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};












export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    if(!eventId){
      return res.status(400).json({ success: false, message: "Invalid event ID" });
    }
    const event = await Event.findById(eventId);
    if(!event){
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    event.isDeleted = true;
    event.deletedAt = new Date();
    await event.save();
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const getDeletedEvent = async (req, res) => {
   try {
       const events = await Event.find({ isDeleted: true })
      .sort({ deletedAt: -1 }) // Optional: sort by deletion time if you track it
      .skip(skip)
      .limit(limit)
      .lean();

      if(!events.length){
        return res.status(404).json({ success: false, message: "No deleted events found" });
      }

     res.status(200).json({ success: true, events });
   } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error.message});
   }
}