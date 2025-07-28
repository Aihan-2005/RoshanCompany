// src/components/VoiceRecorder.jsx
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mic_Icon from './../assets/Images/mic_Icon.svg';
import {
  startRecording,
  stopRecording,
  setAudioURL,
  setTranscript,
  setDuration,
  addToArchive,
} from '../redux/slices/voiceSlice';

const API_TOKEN = 'a85d08400c622b50b18b61e239b9903645297196';

function VoiceRecorder() {
  const dispatch = useDispatch();
  const { isRecording, audioURL, transcript, duration } = useSelector((state) => state.voice);

  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const startTimeRef = useRef(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];
      startTimeRef.current = Date.now();

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const stopTime = Date.now();
        const totalSeconds = Math.floor((stopTime - startTimeRef.current) / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        dispatch(setDuration(`${minutes}:${seconds}`));

        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const localURL = URL.createObjectURL(blob);
        dispatch(setAudioURL(localURL));
        dispatch(setTranscript('⏳ در حال ارسال به سرور حَرْف...'));

        await sendToHarfAPI(blob, localURL, `${minutes}:${seconds}`);
      };

      mediaRecorderRef.current.start();
      dispatch(startRecording());
    } catch (err) {
      console.error('❌ خطا در دسترسی به میکروفون:', err);
      dispatch(setTranscript('❌ دسترسی به میکروفون ممکن نیست.'));
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      dispatch(stopRecording());
    }
  };

  const sendToHarfAPI = async (blob, localURL, duration) => {
    try {
      const formData = new FormData();
      const file = new File([blob], 'voice.webm', { type: 'audio/webm' });
      formData.append('files', file); 
      const response = await fetch("/api/transcribe_files/", {
        method: 'POST',
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`خطا در پاسخ: ${response.status}`);
      }

      const text = await response.text();
      if (!text) {
        throw new Error('بدنه پاسخ خالی است');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('❌ JSON Parse Error:', e, 'محتوا:', text);
        dispatch(setTranscript('❌ پاسخ معتبر از سرور دریافت نشد.'));
        saveToArchive('❌ پاسخ معتبر از سرور دریافت نشد.', localURL, duration);
        return;
      }

      console.log('✅ پاسخ از حَرْف:', data);

      let directText = '';
      if (Array.isArray(data) && data[0]?.segments) {
        directText = data[0].segments.map((s) => s.text).join(' ');
      } else if (data.segments) {
        directText = data.segments.map((s) => s.text).join(' ');
      } else if (Array.isArray(data) && data[0]?.transcription_text) {
        directText = data[0].transcription_text;
      } else if (data.transcription_text) {
        directText = data.transcription_text;
      }

      const finalText = directText || '✅ فایل ارسال شد، اما متنی دریافت نشد.';
      dispatch(setTranscript(finalText));
      saveToArchive(finalText, localURL, duration);
    } catch (error) {
      console.error('❌ خطا در ارتباط با API حرف:', error);
      const fallback = '❌ خطا در دریافت پاسخ از حَرْف.';
      dispatch(setTranscript(fallback));
      saveToArchive(fallback, localURL, duration);
    }
  };

  const saveToArchive = (text, url, duration) => {
    const item = {
      id: Date.now(),
      type: 'voice',
      name: 'ضبط جلسه',
      date: new Date().toLocaleDateString('fa-IR'),
      duration,
      url,
      content: text,
    };
    dispatch(addToArchive(item));
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-full">
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`w-[62px] h-[62px] rounded-full flex items-center justify-center transition-all duration-200 ${
          isRecording
            ? 'bg-red-600 animate-pulse'
            : 'bg-[#00B3A1] hover:bg-[#00A090]'
        }`}
      >
        <img src={mic_Icon} alt="mic" className="w-[20px] h-[33px]" />
      </button>

      <p className="mt-6 text-center text-[#626262] text-[16px] font-light leading-[100%] w-[276px] min-h-[56px]">
        {isRecording
          ? 'در حال ضبط... برای توقف دکمه را فشار دهید.'
          : transcript
          ? transcript
          : 'برای شروع صحبت، روی دکمه کلیک کنید. متن در اینجا نمایش داده می‌شود.'}
      </p>

      {duration !== '00:00' && !isRecording && (
        <p className="text-sm text-[#00BA9F] mt-1 font-medium">
          {`مدت زمان: ${duration}`}
        </p>
      )}

      {audioURL && !isRecording && (
        <audio controls src={audioURL} className="mt-4 w-[400px]" />
      )}
    </div>
  );
}

export default VoiceRecorder;
