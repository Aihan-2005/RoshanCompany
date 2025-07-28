import { useState } from "react";
import VoiceRecorder from "../component/VoiceRecorder";
import UploadAndTranscript  from "../component/upload/UploadAndTranscript";
import LinkInput from "../component/LinkInput";



import mic_Icon from "./../assets/Images/mic_Icon.svg";
import upload_Icon from "./../assets/Images/upload_Icon.svg";
import chain_Icon from "./../assets/Images/chain_Icon.svg";
import drop_Icon from "./../assets/Images/drop_Icon.svg"


function MainContent() {
  const [activeTab, setActiveTab] = useState("voice");
  const [open, setOpen] = useState(false);

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "voice":
        return <VoiceRecorder />;
      case "upload":
        return <UploadAndTranscript  />;
      case "link":
        return <LinkInput />;
      default:
        return null;
    }
  };

  let borderColor;
  switch (activeTab) {
    case "voice":
      borderColor = "#00BA9F";
      break;
    case "upload":
      borderColor = "#118AD3";
      break;
    case "link":
      borderColor = "#FF1654";
      break;
    default:
      borderColor = "#00BA9F";
  }

  const borderTopRightRadius = activeTab === "voice" ? "0px" : "25px";

  return (
    <div
      className="relative mx-auto"
      style={{ width: "653px", height: "477px", top: "20px", right: "20px" }}
    >
      <div
        className="absolute flex z-10 right-0"
        style={{ top: "-48px" }}
      >

         <button
          onClick={() => setActiveTab("link")}
          className={`w-[144px] h-[48px] rounded-tl-[10px] rounded-tr-[10px] flex items-center justify-center gap-2 text-[16px] font-['IRANYekan'] transition-colors ${
            activeTab === "link"
              ? "bg-[#FF1654] text-white"
              : "bg-white  text-[#969696]"
          }`}
        >
          لینک
          <img
            src={chain_Icon}
            alt="link"
            className={`w-[20px] h-[16px] transition-all duration-200 ${
              activeTab === "link" ? "" : "filter invert brightness-[70%]"
            }`}
          />
        </button>


        <button
          onClick={() => setActiveTab("upload")}
          className={`w-[144px] h-[48px] rounded-tl-[10px] rounded-tr-[10px] flex items-center justify-center gap-2 text-[16px] font-['IRANYekan'] transition-colors ${
            activeTab === "upload"
              ? "bg-[#118AD3] text-white"
              : "bg-white text-[#969696]"
          }`}
        >
          بارگزاری فایل
          <img
            src={upload_Icon}
            alt="upload"
            className={`w-[18.5px] h-[15px] transition-all duration-200 ${
              activeTab === "upload" ? "filter invert brightness-0" : "filter invert brightness-50"
            }`}
          />
        </button>

                <button
          onClick={() => setActiveTab("voice")}
          className={`w-[144px] h-[48px] rounded-tl-[10px] rounded-tr-[10px] flex items-center justify-center gap-2 text-[16px] font-['IRANYekan'] transition-colors ${
            activeTab === "voice"
              ? "bg-[#00BA9F] text-white"
              : "bg-white  text-[#969696]"
          }`}
        >
          ضبط صدا
          <img
            src={mic_Icon}
            alt="mic"
            className={`w-[13px] h-[22px] transition-all duration-200 ${
              activeTab === "voice" ? "" : "filter invert brightness-[70%]"
            }`}
          />
        </button>

       
      </div>

      <div
        className="relative bg-white border shadow"
        style={{
          width: "653px",
          height: "429px",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
          borderTopRightRadius: borderTopRightRadius,
          borderColor: borderColor,
          borderWidth: "1px",
        }}
      >
        <div className="w-full h-full flex items-center justify-center p-6">
          {renderActiveComponent()}
        </div>
      </div>

      <div
        className="w-[179px] h-[37px] mt-[8px] flex items-center justify-between relative"
        dir="rtl"
      >
        <span className="w-[61px] text-[#626262] text-[14px] font-light font-['IRANYekan'] leading-none text-right">
          زبان گفتار:
        </span>
        <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`   flex flex-col items-center
            rounded-4xl border-2 border-[#00BA9F] bg-white
            cursor-pointer
            transition-all duration-300
            overflow-visible
            ${open ? "w-[121px] h-[81px] px-4" : "w-[121px] h-[37px] px-6"}`}
      >
        <div className="flex items-center gap-2 justify-center w-full h-[37px]">
          <img src={drop_Icon} alt="drop_Icon" 
            className={`w-[9.8px] h-[6.5px] text-[#00BA9F] transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />

          <span
            className="text-[#00BA9F] font-['IRANYekan'] font-medium fw-400 text-[15px] leading-[100%]"
            style={{ lineHeight: "100%" }}
          >
            فارسی
          </span>

        </div>

        {open && (
          <div className="mt-[4px] w-full border-t border-[#00BA9F] pt-1">
            <div className="flex items-center justify-center gap-2">
              <span
                className="text-[#00BA9F] font-['IRANYekan'] font-normal text-[14px] leading-[100%]"
                style={{ lineHeight: "100%" }}
              >
                اینگیلیسی
              </span>

            </div>
          </div>
        )}
      </button>
      </div>
      </div>
    </div>
  );
}

export default MainContent;
