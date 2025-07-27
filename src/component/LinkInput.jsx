import { useState } from "react";
import chain_Icon from "./../assets/Images/chain_Icon.svg";
import TranscriptionTabs from "./upload/TranscriptionTabs";

function LinkInput({onSuccess }){
  const [link,setLink]= useState('');
  const [previewLink,setPreviewLink] = useState(null);
  const [transcription,setTranscription] = useState(null);
  const [loadging,setLoading] = useState(false);
  const [error,setError] = useState(null);


  const API_TOKEN = "a85d08400c622b50b18b61e239b9903645297196";

  const formatTime = (timeString)=>{
    const totalSeconds = parseFloat(timeString);
    if(isNaN(totalSeconds)) return "00:00";
    const minutes= Math.floor(totalSeconds /60);
    const seconds = Math.floor(totalSeconds %60);
    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

  };


  const handleSubmit = async ()=>{
    if (!link.trim()){
      setError("لطفا لینک معتبر وارد کنید");
      return;
    }
    try{
      new URL(link);
    }catch{
      setError("لطفا یک URL معتبر وارد کنید");
      return;
    }

    try{
      setLoading(true);
      setError(null);
      setTranscription(null);

      const res = await fetch("/api/transcribe_files/",{
        method : "POST",
        headers:{
          "Content-type":"application/json",
          Authorization : `Token ${API_TOKEN}`,
        },
        body:JSON.stringify({
          media_urls: [link],
        }),
      });

      if (!res.ok){
        throw new Error(`خطا در ارسال لینک: ${res.status}`);
      }
      const data = await res.json();
      const requestId = Array.isArray(data)? data[0]?.id : data?.id;

      let finalData = null;

      if(!requestId){
        finalData = Array.isArray(data)? data[0] :data;
      }else{
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts<maxAttempts){
          await new  Promise((r)=> setTimeout(r,5000));
          const statusRes = await fetch(`/api/requests/${requestId}/`,{
            headers:{Authorization : `Token ${API_TOKEN}`},
          });
          if (!statusRes.ok){
            attempts++;
            continue;
          }
          const statusData = await status.json();
          if (statusData.status === "completed"){
            finalData = statusData;
            break;
          }else if (statusData.status === "failed"){
            throw new Error("پردازش API ناموفق بود");
          }
          attempts ++;
        }
        if(!finalData){
          throw new Error("هیچ متنی پس از حداکثر تلاش‌ها دریافت نشد");
        }
      }
      const preparedTranscription ={
        simple:
        finalData.transcription_text ||
        finalData.segments?.map((s)=>s.text).join(" ") ||
        "",
        timed : finalData.segments
        ? finalData.segments.map((seg)=>({
          startTime :  seg.startTime || seg.start || 0,
          endTime: seg.endTime || seg.end || 0,
          text: seg.text || "",
        }))
        : [],
      };

      const urlParts = link.split('/');
      const fileName = decodeURIComponent(urlParts[urlParts.length -1]) || "فایل صوتی";


      const lastSegment = preparedTranscription.timed.at(-1);
      const durationSeconds = lastSegment?.endTime || 0;
      const duration = formatTime(durationSeconds);

      const archiveItem = {
        id: Date.now(),
        name : fileName,
        date:new Date().toLocaleDateString('fa-IR'),
        format :"mp3",
        duration,
        url:link,
        type:"link",
        content:preparedTranscription.simple,
        transcription:preparedTranscription,
      };

      const existingArchive = JSON.parse(localStorage.getItem('archive')|| "[]");
      const updatedArchive = [archiveItem,...existingArchive];
      localStorage.setItem("archive",JSON.stringify(updatedArchive));

      setTranscription(preparedTranscription);
      setPreviewLink(link);
      setLink("");

      if(onSuccess) onSuccess();
    }catch(err){
      setError(`خطا در پردازش لینک صوتی: ${err.message}`);
      if (onSuccess) onSuccess();
    }finally{
      setLoading(false);
    }
  };

  if (transcription){
    return(
      <div className="w-full max-w-4xl mx-auto mt-3">
<TranscriptionTabs
  transcription={transcription}
  audioSrc={previewLink}
  onRestart={() => {
    setTranscription(null);
    setPreviewLink(null);
  }}
/>

      </div>
    );
  
}


  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div
        className={`flex items-center border rounded-full pl-5 pr-20 ${
          error ? "border-red-500" : "border-[#FF1654]"
        }`}
        style={{ width: "328px", height: "46px" }}
      >
        <button
          onClick={handleSubmit}
          disabled={loadging}
          className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${
            loadging ? "bg-gray-400" : "bg-[#FF1654]"
          }`}
        >
          <img src={chain_Icon} alt="chain" className="w-[14px] h-[14px]" />
        </button>

        <input
          type="text"
          placeholder="example.com/sample.mp3"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={loadging}
          className="flex-1 text-center placeholder-[#626262] bg-transparent outline-none font-[IRANYekan] font-light text-[16px]"
        />
      </div>
      <p
        className="mt-6 text-center text-[#626262] font-[IRANYekan] font-light text-[16px] leading-[100%]"
        style={{ width: "415px" }}
      >
        نشانی اینترنتی فایل حاوی گفتار را وارد و دکمه را فشار دهید
      </p>

      {error && (
        <p className="mt-4 text-red-500 font-[IRANYekan] text-[14px]">
          {error}
        </p>
      )}

      {previewLink && (
        <div className="mt-4 text-[#FF1654] font-[IRANYekan] text-[14px]">
          {previewLink}
        </div>
        
      )}
      {loadging && (
  <p className="mt-4 text-[#626262] font-[IRANYekan] text-[14px]">
    در حال بررسی لینک و استخراج متن... لطفاً صبر کنید
  </p>
)}

    </div>
  );
}

export default LinkInput;
