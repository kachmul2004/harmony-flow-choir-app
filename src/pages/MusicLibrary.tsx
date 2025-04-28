
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Music as MusicIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import MusicCard from "@/components/MusicCard";
import { music } from "@/data/mockData";

const MusicLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  
  const filteredMusic = music.filter((track) => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.composer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === "classical") {
      return matchesSearch && track.tags.includes("Classical");
    } else if (filter === "contemporary") {
      return matchesSearch && 
        (track.tags.includes("Contemporary") || 
         track.tags.includes("Rock") || 
         track.tags.includes("Jazz"));
    } else if (filter === "sacred") {
      return matchesSearch && 
        (track.tags.includes("Sacred") || 
         track.tags.includes("Hymn") || 
         track.tags.includes("Christian"));
    } else {
      return matchesSearch;
    }
  });
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Music Library" />
      
      <main className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-9"
            placeholder="Search music..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="classical">Classical</TabsTrigger>
              <TabsTrigger value="contemporary">Modern</TabsTrigger>
              <TabsTrigger value="sacred">Sacred</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon" className="ml-2">
            <Filter size={18} />
          </Button>
        </div>
        
        {filteredMusic.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredMusic.map((track) => (
              <MusicCard
                key={track.id}
                music={track}
                onClick={() => navigate(`/music/${track.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <MusicIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No music found</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              {searchQuery
                ? `No music matches "${searchQuery}". Try a different search term.`
                : "There is no music in this category right now."}
            </p>
          </div>
        )}
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default MusicLibrary;
