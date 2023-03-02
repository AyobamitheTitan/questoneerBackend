import express from "express";
import { connect } from "./db/connect.js";
import { config } from "dotenv";
import userRoute from "./routes/userRoute.js";

config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/v1",userRoute)

app.get("/", (req, res) => {
  res.json({ message: "snvopnsov" });
});

connect(process.env.MONGO_URI).then(() => {
  console.log("Successfully connected to the database");
  const PORT = process.env.SERVER_PORT;
  app.listen(PORT, () => {
    console.log(`Server is live on http://localhost:${PORT}`);
  });
});
