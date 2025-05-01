import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 9001;

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});
