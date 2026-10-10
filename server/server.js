import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "15mb" }));

app.get("/", (_req, res) => {
res.send("AI.JEFFStudio backend is running.");
});

app.get("/health", (_req, res) => {
res.json({ ok: true, service: "AI.JEFFStudio" });
});

app.post("/api/generate", (_req, res) => {
res.status(501).json({
error: "Video generation is not connected yet.",
message: "A video-generation provider and secure server API key are required."
});
});

app.listen(PORT, () => {
console.log("AI.JEFFStudio backend listening on port ${PORT}");
});
