import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import userIcon from "./../assets/Images/user_Icon.svg";
import logout from "./../assets/Images/logout.png";
import drop_Icon from "./../assets/Images/drop_Icon.svg"



function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative text-center py-10 mr-24">
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-[48px] left-[47px] flex flex-col items-center
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
            مهمان
          </span>
          <img
            src={userIcon}
            alt="user icon"
            className="w-[19px] h-[19px] t-[60px]"
          />
        </div>

        {open && (
          <div className="mt-[4px] w-full border-t border-[#00BA9F] pt-1">
            <div className="flex items-center justify-center gap-2">
              <span
                className="text-[#00BA9F] font-['IRANYekan'] font-normal text-[14px] leading-[100%]"
                style={{ lineHeight: "100%" }}
              >
                خروجی
              </span>
              <img
                src={logout}
                alt="logout icon"
                className="w-[11.6px] h-[13px]"
                style={{ border: "1px solid #00BA9F", borderRadius: 2 }}
              />
            </div>
          </div>
        )}
      </button>

      
      <div className="mt-[20px]">
        <h2
          className="mx-auto w-[227px] h-[48px] text-[#00BA9F] text-[28px] font-bold font-['IRANYekan'] 
                              flex items-center justify-center rounded-md leading-[100%]"
        >
          تبدیل گفتار به متن
        </h2>

        <p className="mx-auto mt-1 w-[434px] h-[56px] text-[#969696] text-[16px]  font-normal font-['IRANYekan'] flex   flex-col items-center justify-center text-center px-3 rounded-md leading-[100%]">
          آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف ، زبان فارسی را
          یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسید
        </p>
      </div>
    </header>
  );
}

export default Header;
