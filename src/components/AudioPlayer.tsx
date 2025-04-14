import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingUrl] = useState(
    "https://storage.vapi.ai/9c8f0db0-5f33-4c26-bee0-28c02c4e256d-1744574507138-81770af5-f791-45be-bc3c-7fcb941b2c45-stereo.wav"
  );
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio: HTMLAudioElement = audioRef.current!;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-900 text-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
      <div className="h-16 w-16 rounded-md bg-neutral-700" />

      <div className="flex flex-col flex-1">
        <div className="text-sm font-semibold">Interview Recording</div>
        <div className="mt-2 flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>

          <Volume2 size={20} className="text-neutral-400" />
        </div>
      </div>

      <audio ref={audioRef} src={recordingUrl} preload="auto" />
    </div>
  );
}

export default AudioPlayer;
