import { useState } from "react";
import time_icon from "./../../assets/Images/time_icon.svg";
import Refresh from "./../../assets/Images/Refresh.svg";
import copy_Icon from "./../../assets/Images/copy_Icon.svg";
import download_Icon from "./../../assets/Images/download_Icon.svg";
import text_icon from "./../../assets/Images/text_icon.svg";
import AudioPlayer from "./AudioPlayer"; // مسیر دقیق رو بسته به پروژه تنظیم کن



function TranscriptResult({onRestart }) {
  const [activeTab, setActiveTab] = useState("simple");

  const transcription = {
    simple: "سلام! این یک متن ساده برای تست است.",
    timed: [
      { startTime: "00:00", endTime: "00:04", text: "سلام! خوش اومدی." },
      { startTime: "00:05", endTime: "00:08", text: "امروز در مورد تکنولوژی صحبت می‌کنیم." },
      { startTime: "00:09", endTime: "00:13", text: "با ما همراه باش." },
      { startTime: "00:14", endTime: "00:18", text: "مرسی از توجهت!" },
    ],
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  };

  const audioSrc = transcription?.audioUrl;



  const handleCopySimpleText = () => {
    navigator.clipboard.writeText(transcription.simple)
      .then(() => alert("متن کپی شد ✅"))
      .catch(() => alert("مشکل در کپی متن"));
  };

  const handleDownloadPdf = () => {
    const pdfWindow = window.open("");
    const htmlContent = `
      <html><head><title>دانلود متن</title></head>
      <body>
        <pre style="font-family:IRANYekan, serif; font-size:14px; direction:rtl;">
${transcription.simple}
        </pre>
      </body></html>`;
    pdfWindow.document.write(htmlContent);
    pdfWindow.document.close();
    pdfWindow.focus();
    pdfWindow.print();
  };

  return (
    <div className="w-full max-w-4xl text-right mx-auto mt-1 bg-white">
      {/* Header Buttons */}
      <div className="flex justify-between items-center px-0 border-b-[0.25px]">
        <div className="flex gap-3">
          <button 
                  onClick={onRestart }
                className="flex items-center justify-center gap-2 w-[112px] h-[34px] rounded-[20px] bg-[#118AD3] text-white text-[14px] font-[IRANYekan]">
            شروع دوباره
            <img src={Refresh} alt="Refresh" className="w-[12px] h-[13px]" />
          </button>

          <button onClick={handleCopySimpleText} className="p-2 text-[#8F8F8F]" title="کپی متن">
            <img src={copy_Icon} alt="copy_Icon" className="w-[16px] h-[17px]" />
          </button>

          <button onClick={handleDownloadPdf} className="p-2 text-[#8F8F8F]" title="دانلود PDF">
            <img src={download_Icon} alt="download_Icon" className="w-[13.5px] h-[14.5px]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("timed")}
            className={`flex items-center gap-1 px-2 py-3 border-b-[1px] pr-0 transition ${
              activeTab === "timed"
                ? "opacity-100 border-b-[#000000] text-[#000000]"
                : "opacity-80 border-b-transparent text-[#000000]"
            }`}
          >
            متن زمان‌بندی‌شده
            <img src={time_icon} alt="time_icon" className="w-[17px] h-[17px]" />
          </button>

          <button
            onClick={() => setActiveTab("simple")}
            className={`flex items-center gap-1 px-2 py-3 border-b-[1px] pr-0 transition ${
              activeTab === "simple"
                ? "opacity-100 border-b-[#000000] text-[#000000]"
                : "opacity-80 border-b-transparent text-[#000000]"
            }`}
          >
            متن ساده
            <img src={text_icon} alt="text_icon" className="w-[17px] h-[17px]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pl-10 py-6 pr-4">
        {activeTab === "simple" ? (
          <textarea
            readOnly
            className="w-full h-60 bg-white text-right p-4 font-serif text-sm leading-7 text-[#1A202C] resize-none overflow-y-auto"
            value={transcription.simple}
          />
        ) : (
          <div className="mt-4 h-[225px] flex flex-col">
            {transcription.timed?.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto flex flex-col gap-3 pr-4 scrollbar-rtl pe-2" >
                {transcription.timed.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-row justify-between  items-center px-6 py-4 transition duration-200 ${
                      idx % 2 === 0 ? "bg-[#F2F2F2] shadow-[1px_1px_50px_0px_#6363630D] rounded-[25px]" : ""
                    } w-full max-w-[598px] h-[62px] mx-auto`}
                  >
                      <div className="text-[#000000] text-xs font-semibold w-[50px] text-left">
                      {item.endTime}
                    </div>
                    <div className="text-[#000000] text-xs font-semibold w-[50px] text-left">
                      {item.startTime}
                    </div>
                    
                    <div className="flex-1 text-[#1A202C] text-sm leading-6 font-[IRANYekan] text-right px-4">
                      {item.text}
                    </div>
               
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#B91C1C] px-4 py-3 rounded-xl text-sm font-medium">
                ⚠️ محتوای زمان‌بندی‌شده‌ای برای نمایش موجود نیست.
              </div>
            )}
          </div>
        )}

        {/* Audio Player */}
        <div className="mt-8">
          <AudioPlayer src={audioSrc} />
        </div>
      </div>
    </div>
  );
}

export default TranscriptResult;
