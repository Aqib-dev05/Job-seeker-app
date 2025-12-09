import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { jobSchema } from "./jobSchema.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jobseek";



const Job = mongoose.model("Job", jobSchema);

// Middleware
app.use(cors(
  {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
));
app.use(express.json());
app.use(morgan("dev"));

// Routes (single file; no separate routers/controllers)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/api/jobs", async (req, res) => {
  try {
    const { q, location, type, field } = req.query;
    const query = {};

    if (q) {
      query.$or = [
        { title: new RegExp(q, "i") },
        { company: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { field: new RegExp(q, "i") },
        { location: new RegExp(q, "i") }
      ];
    }
    if (location) query.location = new RegExp(`^${location}$`, "i");
    if (type) query.type = type;
    if (field) query.field = field;

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: "Failed to create job" });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: "Failed to update job" });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

// Optional seed endpoint to add demo data quickly
app.post("/api/jobs/seed", async (_req, res) => {
  try {
    const sample = [
      {
        title: "Frontend Engineer",
        company: "Acme Corp",
        location: "Remote",
        type: "Full-time",
        field: "Technology",
        description: "React + Vite experience",
        deadline: new Date(Date.now() + 14 * 86400000),
        logo: "https://placehold.co/96x96?text=AC",
        url: "https://example.com/job/frontend"
      },
      {
        title: "Marketing Intern",
        company: "Beta Labs",
        location: "New York",
        type: "Internship",
        field: "Marketing",
        description: "Content + social campaigns",
        deadline: new Date(Date.now() + 21 * 86400000),
        logo: "https://placehold.co/96x96?text=BL",
        url: "https://example.com/job/marketing-intern"
      }
    ];
    await Job.deleteMany({});
    const jobs = await Job.insertMany(sample);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to seed jobs" });
  }
});

// Connect DB and start server
(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`API ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  }
})();

