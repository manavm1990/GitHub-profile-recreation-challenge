import api from "api";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin:
      // TODO: Update this for live!
      "http://localhost:3000",
  })
);

app.use(express.json());

app.post("/", async (req, res, next) => {
  // TODO: 🥅

  try {
    const JSONRes = await api({
      query: `{
  viewer {
    name
     repositories(last: 20) {
       nodes {
         name
       }
     }
   }
}`,
    });

    res.status(200).json(JSONRes);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(8000, (err) => {
  if (err) {
    console.error(err);
  }
  console.info("Server 🏃🏾‍♂️. http://localhost:8000");
});
