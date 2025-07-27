import { useRef, useState } from "react";

import upload_Icon from "../../assets/Images/upload_Icon.svg";

const mockTranscription = {
  simple: `این یک متن تستی برای نشان دادن  بخش های اپلود فایل است`,
  timed: [
    { time: "00:00", text: "سلام به تیم روشن" },
    {
      time: "00:05",
      text: "در این قسمت، درباره‌ی طراحی محصول صحبت خواهیم کرد.",
    },
    { time: "00:10", text: "ابتدا نگاهی به روند توسعه می‌اندازیم." },
  ],
};

function UploadFile({ onTranscriptionReady }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleProcess(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleProcess(file);
  };

  const handleProcess = async (file) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("media_files", file);

      const res = await fetch(
        "https://harf.roshan-ai.ir/api/transcribe_files/",
        {
          method: "POST",
          headers: {
            Authorization: "Token a85d08400c622b50b18b61e239b9903645297196",
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok || !data.text) throw new Error("API response not valid");

      alert("✅ فایل ارسال شد و در حال پردازش است.");

      const archiveItem = {
        id: Date.now(),
        name: file.name || "بدون‌نام", 
        format: file.type?.split("/")?.[1] || "mp3",
        duration: "00:12",
        date: new Date().toLocaleDateString("fa-IR"),
        type: "voice",
        text: data.text,
      };

      const current = JSON.parse(localStorage.getItem("archive") || "[]");
      localStorage.setItem(
        "archive",
        JSON.stringify([archiveItem, ...current])
      );

      onTranscriptionReady({
        simple: data.text,
        timed: [], // اگر API تایم‌کد داد، اینجا بذار
      });
    } catch (error) {
      alert("❌ پردازش ناموفق. داده تستی نمایش داده می‌شود.", error);

      const archiveItem = {
        id: Date.now(),
        name: file.name || "بدون‌نام",
        format: file.type?.split("/")?.[1] || "mp3",
        duration: "00:12",
        date: new Date().toLocaleDateString("fa-IR"),
        type: "file",
        text: mockTranscription.simple,
      };

      const current = JSON.parse(localStorage.getItem("archive") || "[]");
      localStorage.setItem(
        "archive",
        JSON.stringify([archiveItem, ...current])
      );

      onTranscriptionReady(mockTranscription); // ✅ اینجا بود
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-white relative"
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <button
        onClick={() => fileInputRef.current.click()}
        className="w-[62px] h-[62px] bg-[#118AD3] border-2 border-white rounded-full flex items-center justify-center"
      >
        <img
          src={upload_Icon}
          alt="upload"
          className="w-[30px] h-[25px]"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </button>

      <p className="mt-6 text-center text-[#626262] text-[16px] font-serif leading-[100%] w-[415px]">
        برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
        <br />
        متن پیاده شده آن، در اینجا ظاهر می‌شود
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {dragActive && (
        <div className="absolute inset-0 bg-[#118AD31A] border-2 border-dashed border-[#118AD3] rounded-[25px] flex items-center justify-center text-[#118AD3] text-lg font-bold z-10">
          فایل را اینجا رها کنید
        </div>
      )}

      {loading && (
        <p className="mt-4 text-[#118AD3]">در حال ارسال و پردازش داده‌ها...</p>
      )}
    </div>
  );
}

export default UploadFile;
