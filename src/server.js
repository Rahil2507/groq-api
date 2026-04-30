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

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});