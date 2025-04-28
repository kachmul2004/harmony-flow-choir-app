
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share, Heart, Play, Pause, Music, Mic, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import { usePlayer } from "@/context/PlayerContext";
import { music } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const MusicDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();
  
  const track = music.find(item => item.id === id);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    if (!track) {
      navigate("/music");
    }
  }, [track, navigate]);
  
  if (!track) {
    return null;
  }
  
  const isCurrentTrack = currentTrack?.id === track.id;
  
  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: `${track.title} will be downloaded to your device.`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing options opened",
    });
  };
  
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${track.title} removed from your favorites.` 
        : `${track.title} added to your favorites.`,
    });
  };
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header 
        title={track.title}
        leftIcon={<ArrowLeft size={24} />}
        onLeftIconClick={() => navigate(-1)}
      />
      
      <main className="p-4 space-y-6">
        <div className="relative">
          <div className="h-60 rounded-xl overflow-hidden shadow-md mb-4">
            <img 
              src={track.coverArt}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Music info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">{track.title}</h1>
            <p className="text-gray-600 mb-3">
              {track.composer}
              {track.arranger && ` • Arr. ${track.arranger}`}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {track.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <Button 
                className="flex-1"
                onClick={handlePlayPause}
              >
                {isCurrentTrack && isPlaying ? 
                  <><Pause size={18} className="mr-2" /> Pause</> : 
                  <><Play size={18} className="mr-2" /> Play</>
                }
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleToggleFavorite}
              >
                <Heart 
                  size={18} 
                  className={isFavorite ? "fill-primary text-primary" : ""} 
                />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleDownload}
              >
                <Download size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
              >
                <Share size={18} />
              </Button>
            </div>
          </div>
          
          {/* Tabs for details, lyrics, and notes */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="lyrics">Lyrics</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <p className="text-gray-700">{track.description}</p>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="choir-info">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center">
                      <Music size={18} className="mr-2 text-primary" />
                      Choir Information
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <p>This piece is performed by {track.choir}.</p>
                    <p className="mt-2">Duration: {track.duration || "3:45"}</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="voice-parts">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center">
                      <Mic size={18} className="mr-2 text-primary" />
                      Voice Parts
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Soprano</li>
                      <li>Alto</li>
                      <li>Tenor</li>
                      <li>Bass</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sheet-music">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center">
                      <FileText size={18} className="mr-2 text-primary" />
                      Sheet Music
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <Button variant="outline" className="w-full" onClick={handleDownload}>
                      <Download size={16} className="mr-2" /> Download Sheet Music
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            
            {/* Lyrics Tab */}
            <TabsContent value="lyrics" className="space-y-4">
              {track.lyrics ? (
                <div className="whitespace-pre-line text-gray-700">
                  {track.lyrics}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText size={40} className="mx-auto mb-4 opacity-20" />
                  <p>No lyrics available for this track.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <FileText size={40} className="mx-auto mb-4 opacity-20" />
                <p>Performance notes will be available soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default MusicDetails;
