import { useRef, useState, useEffect } from "react";
import pauseIcon from "./../../assets/Images/pause.svg";
import playIcon from "./../../assets/Images/Stop.svg";
import volumeIcon from "./../../assets/Images/volume_icon.svg";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="flex items-center justify-between w-full max-w-[529px] h-[34px] rounded-[10px] bg-[#F8F8F8] mt-6 px-3 relative">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Play/Pause Toggle */}
      <div className="flex items-center gap-3">
  {/* دکمه پخش (Play) */}
  <button
    onClick={() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }}
    className="w-[12px] h-[12px] flex items-center justify-center rounded-[2px] bg-[#3D3D3D]"
  >
    <img src={playIcon} alt="Play" className="w-[12px] h-[12px]" />
  </button>

  {/* دکمه توقف (Pause) */}
  <button
    onClick={() => {
      audioRef.current?.pause();
      setIsPlaying(false);
    }}
    className="w-[12px] h-[12px] flex items-center justify-center rounded-[5px]"
  >
    <img src={pauseIcon} alt="Pause" className="w-[7px] h-[12px]" />
  </button>
</div>


{/* Seek Bar */}
<div className="relative flex-1 mx-4">
  <input
    type="range"
    min="0"
    max={duration}
    step="0.01"
    value={currentTime}
    onChange={handleSeek}
    className="w-[345px] h-[2px] appearance-none bg-transparent mb-1"
    style={{
      background: `linear-gradient(to right, #118AD3 ${(currentTime / duration) * 100}%, #C6C6C6 ${(currentTime / duration) * 100}%)`,
    }}
  />
  <style>
    {`
      input[type="range"]::-webkit-slider-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #118AD3;
        border: 1px solid #118AD3;
        margin-top: -6px;
        cursor: pointer;
      }
      input[type="range"]::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #118AD3;
        border: 1px solid #118AD3;
        cursor: pointer;
      }
    `}
  </style>
</div>


      {/* Time Display */}
      <span className="text-sm text-[#3D3D3D] w-[65px] text-center">
        {formatTime(currentTime)}
      </span>

      {/* Volume */}
      <div className="flex items-center gap- w-[80px] ml-2">
        <img src={volumeIcon} alt="volume" className="w-[13px] h-[13px]" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-[40px] h-[2px] bg-transparent appearance-none"
          style={{
            background: `linear-gradient(to right, #118AD3 ${volume * 100}%, #C6C6C6 ${volume * 100}%)`,
          }}
        />
        <style>
          {`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              height: 0px;
              width: 0px;
              background: transparent;
              border: none;
            }
            input[type="range"]::-moz-range-thumb {
              height: 0px;
              width: 0px;
              background: transparent;
              border: none;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default AudioPlayer;
