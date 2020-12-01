import api from "api";
import cors from "cors";
import express from "express";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello from Express!");
});

app.use(
  cors({
    origin:
      // TODO: Update this for live!
      "http://localhost:3000",
  })
);

app.use(express.json());

app.post("/", async ({ body }, res) => {
  // TODO: 🥅
  try {
    const JSONRes = await api(body);

    res.status(200).json(JSONRes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(process.env.PORT || 8000);
