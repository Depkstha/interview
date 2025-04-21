import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AudioPlayerProps } from "@/types";

const formatTime = (time: number) => {
  
  if(time > 0) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
      return `${minutes}:${seconds}`;
  }

  return "00:00";
};

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setIsBuffering(true));
      setIsPlaying(true);
    }
  };

  // Smooth time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    const setAudioDuration = () => setDuration(audio.duration);

    console.log(duration);

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleBuffering = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);

    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleBuffering);
    audio.addEventListener("canplay", handleCanPlay);

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleBuffering);
      audio.removeEventListener("canplay", handleCanPlay);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-900 text-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6 transition-all duration-300">
  <div className="flex items-center gap-5">
    <div className="h-16 w-16 rounded-lg bg-neutral-700 animate-pulse" />
    <div className="flex flex-col flex-1">
      <div className="text-base font-semibold tracking-wide">Interview Recording</div>

      <div className="flex items-center gap-3 text-xs text-neutral-400 mt-5">
        <span className="w-12 text-center font-mono">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 appearance-none h-2 bg-neutral-800 rounded-lg accent-green-500 transition-all duration-300 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-green-500 
            [&::-webkit-slider-thumb]:hover:scale-125 
            [&::-webkit-slider-thumb]:active:scale-100 
            [&::-webkit-slider-thumb]:transition-all 
            [&::-webkit-slider-thumb]:duration-200 
            [&::-webkit-slider-runnable-track]:bg-neutral-700 
            [&::-webkit-slider-runnable-track]:rounded-full"
        />
        <span className="w-12 text-center font-mono">{formatTime(duration)}</span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <button
          onClick={togglePlay}
          disabled={isBuffering}
          className="p-3 bg-green-500 rounded-full shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          {isPlaying ? (
            <Pause size={22} className="transition-transform" />
          ) : (
            <Play size={22} className="transition-transform" />
          )}
        </button>

        <div className="flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX size={20} className="text-neutral-400" />
          ) : (
            <Volume2 size={20} className="text-neutral-400" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 appearance-none h-1 bg-neutral-800 rounded-lg accent-green-500 transition-all duration-300 
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:w-3 
              [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-green-500 
              [&::-webkit-slider-thumb]:hover:scale-125 
              [&::-webkit-slider-thumb]:transition-all 
              [&::-webkit-slider-thumb]:duration-200"
          />
        </div>
      </div>
    </div>
  </div>

  <audio ref={audioRef} src={audioUrl} preload="auto" />
</div>

  );
};

export default AudioPlayer;
