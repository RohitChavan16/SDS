import express from "express"
import { facultyLogin, facultyLogout, facultyRegister } from "../controllers/facultyController.js";

const facultyRouter = express.Router();

facultyRouter.post("/register", facultyRegister);
facultyRouter.post("/login", facultyLogin);
facultyRouter.post("/logout", facultyLogout);
/*facultyRouter.post("/send-verify-otp", facultyMiddleware, sendVerifyOtp);
facultyRouter.post("/verify-account", facultyMiddleware, verifyEmail);
facultyRouter.get("/is-auth", facultyMiddleware, isAuthenticated);
facultyRouter.post("/send-reset-otp", sendResetOtp);
facultyRouter.post("/reset-password", resetPassword); */

export default facultyRouter;