import mongoose from "mongoose";

// Basic job model that matches the frontend filters
export const jobSchema = new mongoose.Schema(
    {
      title: { type: String, required: true, trim: true },
      company: { type: String, required: true, trim: true },
      location: { type: String, required: true, trim: true },
      type: { type: String, default: "Full-time" },
      field: { type: String, default: "Technology" },
      description: { type: String, default: "" },
      deadline: { type: Date },
      logo: { type: String, default: "" },
      url: { type: String, default: "" }
    },
    { timestamps: true }
  );