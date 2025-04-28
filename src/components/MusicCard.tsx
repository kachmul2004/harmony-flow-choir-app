
import React from "react";
import { Play, Pause } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";

interface MusicCardProps {
  music: Music;
  onClick?: () => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ music, onClick }) => {
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();
  
  const isCurrentTrack = currentTrack?.id === music.id;
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentTrack && isPlaying) {
      pauseTrack();
    } else {
      playTrack(music);
    }
  };
  
  return (
    <Card 
      className="overflow-hidden h-full cursor-pointer transition-all hover:shadow-md" 
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={music.coverArt} 
          alt={music.title} 
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute bottom-3 right-3 bg-primary text-white rounded-full p-2"
          onClick={handlePlayClick}
        >
          {isCurrentTrack && isPlaying ? 
            <Pause size={16} /> : 
            <Play size={16} className="ml-0.5" />
          }
        </button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1 line-clamp-1">{music.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{music.composer}</p>
        <div className="flex flex-wrap gap-1">
          {music.tags.slice(0, 2).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {music.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{music.tags.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicCard;
