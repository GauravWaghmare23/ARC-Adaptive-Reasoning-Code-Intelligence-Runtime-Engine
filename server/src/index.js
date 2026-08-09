import "dotenv/config";
import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";

const app = express();

const PORT = process.env.PORT || 8000;

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Better Auth
app.all("/api/auth/{*any}", toNodeHandler(auth));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/me", async(req,res)=>{
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
})

// Health check
app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});