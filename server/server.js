import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import memberRouter from "./routes/memberRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import reportRouter from "./routes/reportRoutes.js";

const app = express();
const PORT = 5000;


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

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});