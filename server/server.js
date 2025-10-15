import express from "express"
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import memberRouter from "./routes/memberRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import reportRouter from "./routes/reportRoutes.js";
import { connectDB } from "./config/db.js";
import facultyRouter from "./routes/facultyRoutes.js";

const app = express();



app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Jai Shri Ram");
} );
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);
app.use('/api/member', memberRouter);
app.use('/api/project', projectRouter);
app.use('/api/report', reportRouter);
app.use('/api/faculty', facultyRouter);

await connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});