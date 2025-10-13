import transporter from "../config/nodemailer.js";
import Member from "../models/Member.js";

export const getAllMembers = async (req, res) => {
  try {

    const members = await Member.find()
      .sort({ joinedAt: -1 }).lean();

    if (!members.length) {
      return res.status(404).json({ success: false, message: "No members found" });
    }

    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};











export const getAllActiveMember = async () => {
   try {

    const members = await Member.find({ isActive: true })
      .sort({ joinedAt: -1 }).lean();

    if (!members.length) {
      return res.status(404).json({ success: false, message: "No active members found" });
    }

    res.status(200).json({ success: true, members });
  } catch (error) {
    console.error("Error fetching active members:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}














export const getMembersByRole = async (req, res) => {
  try {
    const members = await Member.find({ role: req.params.role, isActive: true })
      .sort({ joinedAt: -1 })
      .lean();

    if (!members.length) {
      return res.status(404).json({ success: false, message: `No members with role ${req.params.role}` });
    }

    res.status(200).json({ success: true, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};













export const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};












export const addMember = async (req, res) => {
  try {

    const { name, email, phone, enrollmentNumber, role, designation, year, permissions } = req.body;
    
    if (!name || !email || !phone || !enrollmentNumber) {
      return res.status(400).json({ success: false, message: "Name, email, password, phone, and enrollment number are required" });
    }

    const existing = await Member.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Member already exists' });

    const tempPassword = crypto.randomBytes(6).toString('hex'); // 12 char password
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const member = new Member({
      name,
      email,
      enrollmentNumber,
      phone,
      role,
      year,
      designation,
      permissions,
      password: hashedPassword,
    });

    await member.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to the Club",
      text: `Hello ${name}, your temporary password is: ${tempPassword}. Please login and change it.`,
     
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Member added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};












export const updateMember = async (req, res) => {
  try {
 
    const { id } = req.params;

    const allowedFields = [
      "name",
      "email",
      "phone",
      "bio",
      "profileImage",
      "designation",
      "year",
      "role",
      "permissions",
      "isActive"
    ];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const member = await Member.findByIdAndUpdate(id, updates, { new: true });
    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, message: "Member Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};











export const deleteMember = async (req, res) => {
  try {
    
    const member = await Member.findByIdAndUpdate(
      id,
      { isActive: false, leftAt: Date.now() },
      { new: true }
    );

    if (!member) return res.status(404).json({ success: false, message: "Member not found" });
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
