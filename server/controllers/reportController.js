import Report from "../models/Report.js";

export const uploadReport = async (req, res) => {
  try {

    const { title, description, fileType, fileName, visibility, visibleTo } = req.body;
    const uploadedBy = req.user._id;

    if (!req.file)
      return res.status(400).json({ success: false, message: "File is required" });

    // Upload to Cloudinary
    const cloudResponse = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "reports",
      resource_type: "auto",
    });

    const report = await Report.create({
      title,
      description,
      uploadedBy,
      fileUrl: cloudResponse.secure_url,
      fileType,
      fileName,
      visibility,
      visibleTo: visibility === "Private" ? visibleTo : [],
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Report uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};









export const getAllReports = async (req, res) => {
  try {
     const user = req.user;

    const reports = await Report.find()
      .populate("uploadedBy", "fullName email")
      .populate("sharedWith.faculty", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};











export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findById(id)
      .populate("uploadedBy", "fullName email")
      .populate("sharedWith.faculty", "fullName email");

    if (!report)
      return res.status(404).json({ success: false, message: "Report not found" });
       res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
   const { id } = req.params;
    const report = await Report.findById(id);

    if (!report)
      return res.status(404).json({ success: false, message: "Report not found" });

    if (report.uploadedBy.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "You can only update your own reports" });

    const updatedData = { ...req.body };

    // Increment version if file is reuploaded
    if (req.file) {
      const cloudResponse = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "reports",
        resource_type: "auto",
      });
      updatedData.fileUrl = cloudResponse.secure_url;
      updatedData.version = report.version + 1;
    }

    const updatedReport = await Report.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
   const { id } = req.params;
    const report = await Report.findById(id);

    if (!report)
      return res.status(404).json({ success: false, message: "Report not found" });

    if (report.uploadedBy.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "You can only delete your own reports" });

    await Report.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const shareReportWithAdvisor = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });
    res.status(200).json({ success: true, message: "Report shared with faculty advisor" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





export const downloadReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ success: false, message: "Report not found" });
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};






export const facultyAction = async (req, res) => {
    try {
       const { action } = req.body;
       const id = req.params.id;
       const report = await Report.findByIdAndUpdate(id, {status: action});
       if (!report) return res.status(404).json({ success: false, message: "Report not found" });
       res.status(200).json({ success: true, message: "Done" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}
