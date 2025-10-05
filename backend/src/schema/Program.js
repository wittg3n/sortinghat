// models/Program.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: String,
  site: String,
  adresseChamp1: String,
  adresseChamp2: String,
  adresseChamp3: String,
  codePostal: String,
  ville: String,
  region: String,
  departement: String,
  lat: Number,
  lon: Number,
  villeEtrangere: { type: Boolean, default: false },
});

const programSchema = new mongoose.Schema(
  {
    ifc: { type: String, required: true, unique: true, index: true },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    modalities: [String], // e.g., "Formation initiale"
    comment: { type: String },
    locations: [locationSchema],
    alternance: { type: Boolean, default: false },
    recruitmentStart: Date,
    recruitmentEnd: Date,
    recruitmentReason: String, // e.g., "international"
    applyUrl: String,
    tuitionInfo: String,
    tuitionUrl: String,
    lastModified: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Program", programSchema);
