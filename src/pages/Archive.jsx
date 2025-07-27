import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import userIcon from "./../assets/Images/user_Icon.svg";
import logout from "./../assets/Images/logout.png";
import chain_Icon from "./../assets/Images/chain_Icon.svg";
import mic_Icon from "./../assets/Images/mic_Icon.svg";
import upload_Icon from "./../assets/Images/upload_Icon.svg";
import Word_icon from "./../assets/Images/Word_icon.svg";
import copy_Icon from "./../assets/Images/copy_Icon.svg";
import del_Btn from "./../assets/Images/del_Btn.svg";
import download_Icon from "./../assets/Images/download_Icon.svg";
import drop_Icon from "./../assets/Images/drop_Icon.svg";
import download_IconG from "./../assets/Images/download_IconG.svg";
import copy_IconG from "./../assets/Images/copy_IconG.svg";

import TranscriptionTabs from "./../component/upload/TranscriptionTabs";
import { BsSortUpAlt } from "react-icons/bs";

function Archive() {
  const [archiveItems, setArchiveItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const itemPerPage = 9;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("archive") || "[]");
    setArchiveItems(data);
  }, []);

  const handleDelete = (id) => {
    const updatedItems = archiveItems.filter((item) => item.id !== id);
    setArchiveItems(updatedItems);
    localStorage.setItem("archive", JSON.stringify(updatedItems));
  };

  const totalPages = Math.ceil(archiveItems.length / itemPerPage);
  const paginatedItems = archiveItems.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );
  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };
return (
  <div className="flex">
    <Sidebar />
    <main className="flex-1 bg-white min-h-screen pr-[80px]">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative">
        <button
          onClick={() => setOpen(!open)}
          className={`absolute top-[48px] left-[47px] flex flex-col items-center rounded-4xl border-2 border-[#00BA9F] bg-white cursor-pointer transition-all duration-300 overflow-visible ${
            open ? "w-[121px] h-[81px] px-4" : "w-[121px] h-[37px] px-6"
          }`}
        >
          <div className="flex items-center gap-2 justify-center w-full h-[37px]">
            <img
              src={drop_Icon}
              alt="drop_Icon"
              className={`w-[9.8px] h-[6.5px] text-[#00BA9F] transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
            <span className="text-[#00BA9F] font-['IRANYekan'] text-[15px]">
              مهمان
            </span>
            <img src={userIcon} alt="user icon" className="w-[19px] h-[19px]" />
          </div>
          {open && (
            <div className="mt-[4px] w-full border-t border-[#00BA9F] pt-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[#00BA9F] font-['IRANYekan'] text-[14px]">
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
        <h1 className="text-[24px] font-[IRANYekan] text-[#00BA9F] mt-[80px] pr-[180px] text-right w-full">
          آرشیو من
        </h1>
      </div>

      {/* Table Header */}
      <div className="rounded pr-[40px] pl-[60px]">
        <div className="grid grid-cols-14 text-right py-0 pr-[150px] pl-[15px] gap-3 items-center font-bold text-[14px] text-black">
          <div className="col-span-3"></div>
          <div className="text-center col-span-2">مدت زمان</div>
          <div className="text-center col-span-2">نوع فایل</div>
          <div className="text-center col-span-2">تاریخ برگزاری</div>
          <div className="text-right col-span-4 pr-[45px]">نام فایل</div>
          <div className="col-span-1 pr-[45px]"></div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-y-3 mt-2 pl-[25px] pr-[150px] mx-w-auto ">
          {paginatedItems.map((item) => {
            const type = (item.type || "").toLowerCase().trim();
            const borderColor =
              type === "link"
                ? "border-[#FF1654]"
                : type === "voice"
                ? "border-[#40C6B8]"
                : "border-[#118AD3]";

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-md transition-all duration-200  ${
                  selectedItemId === item.id
                    ? borderColor
                    : "border-transparent"
                } hover:shadow-[0px_1px_5px_0px_#0000001A]`}
              >
                <div
                  className="grid grid-cols-14 items-center gap-4 pr-[0px] py-2"
                  style={{ minHeight: "40px" }}
                >
                  {/* Action Buttons */}
                  <div className="flex justify-start gap-1 col-span-3 pl-[100px]">
                    <button
                      className="w-[25px] h-[25px] rounded-full flex items-center justify-center hover:bg-[#DC3545]"
                      onClick={() => handleDelete(item.id)}
                    >
                      <img
                        src={del_Btn}
                        alt="del"
                        className="w-[9px] h-[14px]"
                      />
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.content || "");
                        alert("متن کپی شد ✅");
                      }}
                      className="group w-[30px] h-[30px] relative flex items-center justify-center"
                    >
                      <img
                        src={copy_Icon}
                        alt="copy"
                        className="w-[16px] h-[17px] absolute opacity-100 group-hover:opacity-0"
                      />
                      <img
                        src={copy_IconG}
                        alt="copy-hover"
                        className="w-[16px] h-[17px] absolute opacity-0 group-hover:opacity-100"
                      />
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([item.content || ""], {
                          type: "application/msword",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${item.name || "document"}.docx`;
                        a.click();
                        URL.revokeObjectURL(url);
                        alert("فایل Word دانلود شد ✅");
                      }}
                    >
                      <img
                        src={Word_icon}
                        alt="Word"
                        className="w-[13px] h-[16px]"
                      />
                    </button>
                    <button
                      onClick={() => {
                        const a = document.createElement("a");
                        a.href = item.url;
                        a.download = item.name || "file";
                        a.click();
                        alert("دانلود فایل شروع شد ✅");
                      }}
                      className="group w-[30px] h-[30px] relative flex items-center justify-center"
                    >
                      <img
                        src={download_Icon}
                        alt="download"
                        className="w-[13.5px] h-[14.5px] absolute opacity-100 group-hover:opacity-0"
                      />
                      <img
                        src={download_IconG}
                        alt="download-hover"
                        className="w-[13.5px] h-[14.5px] absolute opacity-0 group-hover:opacity-100"
                      />
                    </button>
                  </div>

                  {/* مدت زمان */}
                  <div className="text-center text-[12px] col-span-2">
                    {item.duration || "00:00"}
                  </div>

                  {/* نوع فایل */}
                  <div className="text-center text-[12px] col-span-2">
                    {item.format || "-"}
                  </div>

                  {/* تاریخ */}
                  <div className="text-center text-[12px] col-span-2">
                    {item.date}
                  </div>

                  {/* نام فایل */}
                  <div
                    onClick={() =>
                      setSelectedItemId(
                        selectedItemId === item.id ? null : item.id
                      )
                    }
                    className="cursor-pointer truncate text-right text-[#118AD3] text-[16px] pr-[40px] font-[IRANYekan] font-light col-span-4"
                  >
                    {item.name.length > 50
                      ? `${item.name.slice(0, 50)}...`
                      : item.name}
                  </div>

                  {/* آیکون دایره */}
                  <div className="flex justify-center col-span-1 pr-[30px]">
                    <div
                      className={`w-[32px] h-[32px] rounded-full flex items-center justify-center ${
                        type === "link"
                          ? "bg-[#FF1654]"
                          : type === "voice"
                          ? "bg-[#40C6B8]"
                          : "bg-[#118AD3]"
                      }`}
                    >
                      <img
                        src={
                          type === "link"
                            ? chain_Icon
                            : type === "voice"
                            ? mic_Icon
                            : upload_Icon
                        }
                        className="w-[16px] h-[16px]"
                        alt="type icon"
                      />
                    </div>
                  </div>
                </div>

                {/* نمایش تب‌ها */}
                {selectedItemId === item.id && item.transcription && (
                  <div className="pl-[50px] pr-[10px] pb-0 pt-0">
                    <TranscriptionTabs
                      transcription={item.transcription}
                      audioSrc={item.url}
                      showHeaderActions={false}
                      showHeaderBorder={false}
                      isArchiveView={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 mb-4 gap-2 text-[14px] font-[IRANSansXFaNum]">
          <button
            className="w-[25px] h-[25px] flex justify-center items-center text-[#000] hover:text-[#00BA9F]"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            &lt;
          </button>
          {generatePagination().map((page, index) =>
            page === "..." ? (
              <span key={index} className="text-[#999] mx-1">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(page)}
                className={`w-[22px] h-[21px] flex items-center justify-center rounded-full ${
                  currentPage === page
                    ? "bg-[#00BA9F] text-white"
                    : "bg-white text-black"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            className="w-[25px] h-[25px] flex justify-center items-center text-[#000] hover:text-[#00BA9F]"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            &gt;
          </button>
        </div>
      )}
    </main>
  </div>
);

}

export default Archive;
