import express from "express";
import cors from "cors";

const app = express();

const PORT = 4000;

app.use(express.json());

app.use(cors());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Health is good",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});