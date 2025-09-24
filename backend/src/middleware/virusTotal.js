// middleware/virusTotal.js
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export const scanFileWithVirusTotal = async (filePath) => {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const res = await axios.post(
      "https://www.virustotal.com/api/v3/files",
      form,
      {
        headers: {
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
          ...form.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    return res.data; // contains scan id, status, etc.
  } catch (err) {
    console.error("VirusTotal scan failed:", err.message);
    throw new Error("Virus scan failed");
  }
};
