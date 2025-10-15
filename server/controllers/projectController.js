import Project from "../models/Project.js";

export const getAllProjects = async (req, res) => {
  try {

      const projects = await Project.find({visibility: "Public"})
      .populate("createdBy", "name email profilePic")
      .populate("collaborators.user", "name email profilePic")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};











export const getAllDeactiveProjects = async (req, res) => {
  try {

    const projects = await Project.find({visibility: "Private"})
      .populate("createdBy", "name email profilePic")
      .populate("collaborators.user", "name email profilePic")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};










export const getProjectById = async (req, res) => {
  try {
   const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid project ID" });
    }

    const project = await Project.findById(id)
      .populate("createdBy", "name email profilePic")
      .populate("collaborators.user", "name email profilePic")
      .lean();

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }};















export const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      coverImage,
      tags,
      category,
      techStack,
      collaborators,
      githubRepo,
      liveDemo,
      documentation,
      startDate,
      isOngoing,
      features,
      challenges,
      learnings,
      visibility,
    } = req.body;

    if (!title || !description || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and start date are required.",
      });
    }

    const project = new Project({
      title,
      description,
      coverImage,
      tags,
      category,
      techStack,
      collaborators,
      githubRepo,
      liveDemo,
      documentation,
      startDate,
      isOngoing,
      features,
      challenges,
      learnings,
      visibility,
      createdBy: req.user._id, 
    });

    await project.save();
    res.status(201).json({ success: true, message: "Project added Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
















export const updateProject = async (req, res) => {
  try {
     const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid project ID" });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    
    if (String(project.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this project.",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({ success: true, message: "Project updated successfully."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};













export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid project ID" });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (String(project.createdBy) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Only the creater of this project can delete.",
      });
    }

    await project.deleteOne();

    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};











export const toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    project.visibility = project.visibility === "Public" ? "Private" : "Public";

    await project.save();
    
    res.status(200).json({ success: true, message: "Visibility Changed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
