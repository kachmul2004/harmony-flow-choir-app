
import React from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/data/mockData";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();
  
  return (
    <Card 
      className="overflow-hidden h-full cursor-pointer transition-all hover:shadow-md" 
      onClick={onClick}
    >
      <div className="relative h-36 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-md px-2 py-1 text-xs font-medium dark:text-white">
          {event.choir}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-300 mb-2">
          <Calendar size={14} className="mr-1" />
          <span>{format(eventDate, "MMM d, yyyy")} • {event.time}</span>
        </div>
        <h3 className="font-semibold mb-1 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">{event.attendees} attending</span>
          {!isPastEvent && (
            <Button 
              variant={event.isAttending ? "secondary" : "default"} 
              size="sm"
              className="text-xs h-8"
            >
              {event.isAttending ? "Attending" : "Join"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
