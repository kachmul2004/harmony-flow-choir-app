
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import EventCard from "@/components/EventCard";
import { events } from "@/data/mockData";

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  
  const today = new Date();
  
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.choir.toLowerCase().includes(searchQuery.toLowerCase());
    
    const eventDate = new Date(event.date);
    
    if (filter === "upcoming") {
      return matchesSearch && eventDate >= today;
    } else if (filter === "past") {
      return matchesSearch && eventDate < today;
    } else {
      return matchesSearch;
    }
  });
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Events" />
      
      <main className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-9"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon" className="ml-2">
            <Filter size={18} />
          </Button>
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => navigate(`/events/${event.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Calendar size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">No events found</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              {searchQuery
                ? `No events match "${searchQuery}". Try a different search term.`
                : "There are no events in this category right now."}
            </p>
          </div>
        )}
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default Events;
