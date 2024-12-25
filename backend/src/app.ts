import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import terrorRoutes from "./routes/terrorRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


app.use(express.json());


app.use("/api", terrorRoutes);


app.get("/", (_req, res) => {
  res.json({ message: "Terror Management Platform API" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
