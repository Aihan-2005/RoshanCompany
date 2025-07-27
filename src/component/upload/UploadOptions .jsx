// import { useState, useRef } from "react";
// import {
//   FaRedo,
//   FaClipboard,
//   FaDownload,
//   FaFileAlt,
//   FaClock,
//   FaPlay,
//   FaPause,
// } from "react-icons/fa";

// const mockSimpleText = `این یک متن تستی است که به عنوان نسخه ساده پیاده‌سازی شده است. برای بررسی نحوه نمایش، این متن استفاده می‌شود.
// این متن می‌تواند طولانی باشد و باید اسکرول شود. ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن
// ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن ادامه متن
// `;

// function UploadOptions() {
//   const [activeTextType, setActiveTextType] = useState("simple");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const audioRef = useRef(null);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.play();
//       setIsPlaying(true);
//     }
//   };

//   const handleTimeUpdate = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       setCurrentTime(audio.currentTime);
//     }
//   };

//   const handleLoadedMetadata = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       setDuration(audio.duration);
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = Math.floor(time % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto mt-8 p-4 border rounded-xl shadow-sm bg-white font-sans">
//       {/* بالا */}
//       <div className="flex justify-between items-center mb-4">
//         {/* سمت چپ: دکمه شروع دوباره */}
//         <button className="flex items-center gap-2 bg-blue-700 text-white px-4 py-1.5 rounded-full hover:bg-blue-800">
//           شروع دوباره <FaRedo className="text-sm" />
//         </button>

//         {/* سمت راست: تب‌ها */}
//         <div className="flex gap-1">
//           <button
//             onClick={() => setActiveTextType("timed")}
//             className={`flex items-center gap-2 px-3 py-1 text-sm border-b-2 ${
//               activeTextType === "timed"
//                 ? "border-blue-700 text-blue-700"
//                 : "border-transparent text-gray-600"
//             }`}
//           >
//             <FaClock /> متن زمان‌بندی 
//           </button>
//           <button
//             onClick={() => setActiveTextType("simple")}
//             className={`flex items-center gap-2 px-3 py-1 text-sm border-b-2 ${
//               activeTextType === "simple"
//                 ? "border-blue-700 text-blue-700"
//                 : "border-transparent text-gray-600"
//             }`}
//           >
//             <FaFileAlt /> متن ساده
//           </button>
//         </div>
//       </div>

//       {/* متن ساده */}
//       {activeTextType === "simple" && (
//         <div className="border rounded-md p-3 max-h-64 overflow-y-auto text-sm leading-7 text-gray-800 font-serif whitespace-pre-line">
//           {mockSimpleText}
//         </div>
//       )}

//       {/* صوت و پلیر */}
//       <audio
//         ref={audioRef}
//         src="Chikar Kardi Ba Delam Vay.mp3"
//         onTimeUpdate={handleTimeUpdate}
//         onLoadedMetadata={handleLoadedMetadata}
//       />
//       <div className="flex items-center justify-between gap-4 mt-6 border-t pt-4">
//         {/* پخش / توقف */}
//         <button
//           onClick={togglePlay}
//           className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//         >
//           {isPlaying ? <FaPause /> : <FaPlay />}
//         </button>

//         {/* تایمر */}
//         <span className="text-sm font-mono w-20 text-center">
//           {formatTime(currentTime)} / {formatTime(duration)}
//         </span>

//         {/* نوار پیشرفت */}
//         <div className="flex-1 mx-2 h-1 bg-gray-300 rounded relative overflow-hidden">
//           <div
//             className="h-1 bg-blue-700 absolute top-0 left-0"
//             style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
//           ></div>
//         </div>

//         {/* دکمه‌های کپی و دانلود */}
//         <div className="flex gap-2">
//           <button className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
//             <FaClipboard />
//             کپی
//           </button>
//           <button className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">
//             <FaDownload />
//             دانلود
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadOptions;
