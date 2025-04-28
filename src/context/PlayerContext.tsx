
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Music } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface PlayerContextType {
  currentTrack: Music | null;
  isPlaying: boolean;
  isExpanded: boolean;
  progress: number;
  duration: number;
  playTrack: (track: Music) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  seekTrack: (value: number) => void;
  toggleExpand: () => void;
  volume: number;
  setVolume: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          setProgress(audioRef.current.currentTime);
        }
      });
      
      audioRef.current.addEventListener("loadedmetadata", () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });
      
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setProgress(0);
      });
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const playTrack = (track: Music) => {
    const isSameTrack = currentTrack && currentTrack.id === track.id;
    
    if (isSameTrack && isPlaying) {
      pauseTrack();
      return;
    }
    
    if (isSameTrack && !isPlaying) {
      resumeTrack();
      return;
    }
    
    setCurrentTrack(track);
    
    if (audioRef.current) {
      // First pause any currently playing audio
      audioRef.current.pause();
      
      // Set the new source
      audioRef.current.src = track.audioUrl;
      
      // Start loading the audio
      audioRef.current.load();
      
      // Play the audio once it's loadeddata
      audioRef.current.onloadeddata = () => {
        audioRef.current?.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio playing successfully");
          })
          .catch(err => {
            console.error("Error playing track:", err);
            setIsPlaying(false);
            toast({
              title: "Playback Error",
              description: "There was an error playing this track. Please try again.",
            });
          });
      };
      
      // Handle loading errors
      audioRef.current.onerror = () => {
        console.error("Audio source error:", track.audioUrl);
        setIsPlaying(false);
        toast({
          title: "Audio Error",
          description: "This audio file cannot be played. It may be unavailable.",
        });
      };
    }
  };
  
  const pauseTrack = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const resumeTrack = () => {
    if (audioRef.current && !isPlaying && currentTrack) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error("Error resuming track:", err);
          toast({
            title: "Playback Error",
            description: "Unable to resume playback. Please try again.",
          });
        });
    }
  };
  
  const seekTrack = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <PlayerContext.Provider
      value={{
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
