import { Link, useLocation } from "react-router-dom";
import SidebarBg from "./../assets/Images/SidebarBg.png";
import LogoIcon from "./../assets/Images/Icon.png";
import MicIcon from "./../assets/Images/speech_Icon.svg";
import ArchiveIcon from "./../assets/Images/archive_Icon.svg";

function Sidebar() {
  const location = useLocation();
  const isSpeechActive = location.pathname === "/";
  const isArchiveActive = location.pathname === "/archive";

  return (
<aside
  className="fixed right-0 top-0 w-[166px] min-h-screen z-50 overflow-hidden rounded-tl-[10px] rounded-bl-[10px]"
  style={{
    fontFamily: "IRANYekan",
    backgroundColor: "#00C69B",
  }}
>

  <div
    className="absolute inset-0 z-15"

 
    style={{
  backgroundImage: `url(${SidebarBg})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: "contain",     
  backgroundPosition: "center",
}}

  />


  <div
    className="absolute inset-0 z-10"
    style={{
      background: "linear-gradient(178.67deg, #00B5A0 11%, #00C69B 92.51%)",
      opacity: 0.9,
    }}
  />

  <div className="relative z-20 flex flex-col items-center w-full mt-6 gap-6">
    
    <div className="flex items-center justify-center gap-2">
      <span className="text-white text-[24px] font-bold">آوا</span>
      <img src={LogoIcon} alt="logo" className="w-[19px] h-[38px]" />
    </div>


    <Link
      to="/"
      className={`mt-[100px] w-[150px] h-[48px] flex items-center justify-between gap-4 px-7 rounded-[10px] transition-all ${
        isSpeechActive ? "bg-[#02816E]" : "bg-transparent"
      }`}
    >
      <span className="text-white text-[16px] font-bold">تبدیل گفتار</span>
      <img src={MicIcon} alt="mic" className="w-[22px] h-[25px]" />
    </Link>


    <Link
      to="/archive"
      className={`w-[150px] h-[48px] flex items-center justify-between gap-2 px-8 rounded-[10px] transition-all ${
        isArchiveActive ? "bg-[#02816E]" : "bg-transparent"
      }`}
    >
      <span className="text-white text-[16px] font-bold">آرشیو</span>
      <img src={ArchiveIcon} alt="archive" className="w-[22px] h-[22px]" />
    </Link>
  </div>
</aside>

  );
}

export default Sidebar;
