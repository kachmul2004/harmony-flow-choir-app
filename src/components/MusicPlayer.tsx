
import React, { useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Minimize2, X } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const MusicPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    isExpanded,
    progress,
    duration,
    playTrack,
    pauseTrack,
    resumeTrack,
    seekTrack,
    toggleExpand,
    volume,
    setVolume,
  } = usePlayer();
  
  const [formattedProgress, setFormattedProgress] = useState("0:00");
  const [formattedDuration, setFormattedDuration] = useState("0:00");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Start loading state when play is attempted but not yet playing
    setLoading(currentTrack && !isPlaying);
    
    // Format time values
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    
    setFormattedProgress(formatTime(progress));
    setFormattedDuration(formatTime(duration));
  }, [progress, duration, currentTrack, isPlaying]);
  
  if (!currentTrack) return null;
  
  const handlePlayPause = () => {
    setLoading(true);
    if (isPlaying) {
      pauseTrack();
      setLoading(false);
    } else {
      resumeTrack();
      // Loading will be set to false when isPlaying changes
    }
  };
  
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  
  return (
    <div
      className={cn(
        "fixed transition-all duration-300 bg-white shadow-lg rounded-t-xl animate-fade-in",
        isExpanded
          ? "music-player-full flex flex-col"
          : "music-player-mini h-16 flex items-center"
      )}
    >
      {isExpanded ? (
        // Full player
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={toggleExpand} className="p-2">
              <Minimize2 size={24} />
            </button>
            <h2 className="text-lg font-semibold">Now Playing</h2>
            <button className="p-2">
              <X size={24} onClick={() => {
                pauseTrack();
                toggleExpand();
              }} />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-64 h-64 mb-8 rounded-lg overflow-hidden shadow-xl">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-xl font-bold mb-1">{currentTrack.title}</h3>
            <p className="text-gray-600 mb-8">
              {currentTrack.composer}
              {currentTrack.arranger && ` • Arr. ${currentTrack.arranger}`}
            </p>
            
            <div className="w-full mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{formattedProgress}</span>
                <span>{formattedDuration}</span>
              </div>
              <Slider
                value={[progress]}
                max={duration || 100}
                step={1}
                onValueChange={(value) => seekTrack(value[0])}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-center space-x-8 mb-8">
              <button className="p-2 text-gray-600">
                <SkipBack size={28} />
              </button>
              <button
                className={`p-4 bg-primary text-white rounded-full ${loading ? 'animate-pulse' : ''}`}
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </button>
              <button className="p-2 text-gray-600">
                <SkipForward size={28} />
              </button>
            </div>
            
            <div className="w-full flex items-center space-x-4">
              <Volume2 size={20} className="text-gray-600" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        // Mini player
        <div className="flex items-center w-full px-4">
          <div className="h-10 w-10 rounded overflow-hidden mr-3">
            <img
              src={currentTrack.coverArt}
              alt={currentTrack.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 mr-4">
            <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
            <p className="text-xs text-gray-500 truncate">{currentTrack.composer}</p>
            {progress > 0 && 
              <Progress value={progressPercent} className="h-1 mt-1" />
            }
          </div>
          <button 
            className={`p-2 mr-2 ${loading ? 'animate-pulse' : ''}`} 
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <button className="p-2" onClick={toggleExpand}>
            <Maximize2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
