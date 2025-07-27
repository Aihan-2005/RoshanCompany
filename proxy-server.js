import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());  // برای پارس کردن JSON درخواست POST

// پروکسی برای درخواست GET فایل صوتی (همان کد فعلی)
app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL مورد نیاز است");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).send("خطا در دریافت فایل");
    }

    const contentType = response.headers.get("content-type") || "audio/mpeg";
    const buffer = await response.buffer();

    res.set({
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
    });

    res.send(buffer);
  } catch (error) {
    res.status(500).send("خطا در دریافت فایل: " + error.message);
  }
});

// پروکسی برای ارسال POST به API تبدیل گفتار به متن
app.post("/transcribe", async (req, res) => {
  try {
    const apiUrl = "https://harf.roshan-ai.ir/api/transcribe_files/";

    // حتما تو هدر Authorization توکن خودت رو بفرست
    const token = "Token a85d08400c622b50b18b61e239b9903645297196";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),  // بدنه JSON از کلاینت
    });

    const data = await response.json();

    // فقط هدر CORS مناسب بفرست (بدون اضافه کردن اضافی)
    res.set("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Proxy server running on http://localhost:${PORT}`));
