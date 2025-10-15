import transporter from "../config/nodemailer.js";
import Faculty from "../models/Faculty.js";


export const facultyRegister = async (req, res) => {
  try {
    
    const { name, email, coepEmail, department, designation, facultyId, phone, password } = req.body;

    if (!name || !email || !coepEmail || !department || !facultyId || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existing = await Faculty.findOne({
      $or: [{ email }, { coepEmail }, { facultyId }]
    });
    if (existing) return res.status(400).json({ success: false, message: "Faculty already exists" });
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = await Faculty.create({
      name, email, coepEmail, department, designation, facultyId, phone, password: hashedPassword
    });
   
    await faculty.save();
    
    const token = jwt.sign({_id: ID}, process.env.JWT_SECRET, { expiresIn: '7d'});
    
    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV == 'production' ? 'none': 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to SDS",
        text: `Dear ${email},
    
    We are pleased to inform you that your SDS account has been successfully created.
    You can now access your dashboard, check for the reports, and begin using our platform.
    We are excited to have you as faculty advisor of the SDS community.
    Warm regards,  
    The SDS Team`,
    }
    
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Registered successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

















export const facultyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || ! password){
      return res.json({success: false, message: 'Email and password are required'})
    }
    const faculty = await Faculty.findOne({ email });
    if (!faculty) return res.json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'});

    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV == 'production' ? 'none': 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 });
    
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};












export const facultyLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

