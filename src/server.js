import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import chatRoutes from "./routes/chat.route.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/check", (req, res) => {
  res.status(200).end();
});

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});