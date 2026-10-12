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

app.post("/api/generate", async (req, res) => {
  try {
    const apiKey = process.env.MAGIC_HOUR_API_KEY;
    const prompt = req.body?.prompt;

    if (!apiKey) {
      return res.status(500).json({
        error: "Magic Hour API key is not configured."
      });
    }

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "Please provide a video prompt."
      });
    }

    const response = await fetch(
      "https://api.magichour.ai/v1/text-to-video",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: "AI Jeffstudio Pro Video",
          end_seconds: 5,
          aspect_ratio: "16:9",
          style: {
            prompt: prompt.trim()
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message || data.error ||
          "Video generation request failed."
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Video generation error:", error.message);

    return res.status(500).json({
      error: "Unable to connect to the video generation service."
    });
  }
});

app.listen(PORT, () => {
console.log("AI.JEFFStudio backend listening on port ${PORT}");
});
