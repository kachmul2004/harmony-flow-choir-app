
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, User, Share, MessageCircle, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import { events, choirs } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow, format } from "date-fns";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [isAttending, setIsAttending] = useState(false);
  
  const event = events.find(item => item.id === id);
  const choir = event ? choirs.find(choir => choir.name === event.choir) : null;
  
  useEffect(() => {
    if (!event) {
      navigate("/events");
    }
  }, [event, navigate]);
  
  if (!event) {
    return null;
  }
  
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();
  const formattedDate = format(eventDate, "EEEE, MMMM d, yyyy");
  const formattedTime = event.time || "7:00 PM - 9:00 PM";
  const timeUntil = formatDistanceToNow(eventDate, { addSuffix: true });
  
  const handleAttendanceToggle = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to join this event.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }
    
    setIsAttending(!isAttending);
    toast({
      title: isAttending ? "Event RSVP Cancelled" : "Successfully RSVP'd",
      description: isAttending
        ? `You have removed yourself from ${event.title}.`
        : `You will be attending ${event.title}.`,
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Event sharing options opened.",
    });
  };
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header
        title={event.title}
        leftIcon={<ArrowLeft size={24} />}
        onLeftIconClick={() => navigate(-1)}
      />
      
      <main className="pb-6">
        <div className="relative">
          <div className="h-56 w-full">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent">
            {!isPastEvent && (
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-primary text-white text-xs px-2 py-1">
                  {timeUntil}
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-2xl font-bold mb-1">{event.title}</h1>
          <p className="text-gray-600 mb-4">Presented by {event.choir}</p>
          
          <div className="flex flex-col space-y-3 mb-6">
            <div className="flex items-center">
              <Calendar size={18} className="text-primary mr-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="text-primary mr-3" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="text-primary mr-3" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <User size={18} className="text-primary mr-3" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>
          
          <div className="flex space-x-3 mb-6">
            <Button 
              className="flex-1"
              variant={isPastEvent ? "outline" : "default"}
              disabled={isPastEvent}
              onClick={handleAttendanceToggle}
            >
              {isPastEvent ? "Event Ended" : (isAttending ? "Cancel RSVP" : "RSVP to Attend")}
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share size={18} />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="about" className="px-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="program">Program</TabsTrigger>
            <TabsTrigger value="choir">Choir</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-4">
            <p className="text-gray-700">{event.description}</p>
            
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-primary mb-2">Event Details</h3>
              <ul className="text-sm space-y-2">
                <li><span className="font-medium">Type:</span> Concert</li>
                <li><span className="font-medium">Duration:</span> 2 hours</li>
                <li><span className="font-medium">Dress Code:</span> Smart Casual</li>
                <li><span className="font-medium">Ticket Price:</span> Free</li>
              </ul>
            </div>
            
            {isAuthenticated && (
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-2">Attendees ({event.attendees})</h3>
                <div className="flex -space-x-2 overflow-hidden">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Avatar key={i} className="border-2 border-background w-8 h-8">
                      <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.attendees > 5 && (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 border-2 border-background text-xs font-medium">
                      +{event.attendees - 5}
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="program" className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-3">
                <h3 className="font-semibold">Event Program</h3>
              </div>
              <div className="divide-y">
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">7:00 PM</div>
                  <div className="font-medium">Opening Remarks</div>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">7:15 PM</div>
                  <div className="font-medium">Performance: The Way of Peace</div>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">7:40 PM</div>
                  <div className="font-medium">Intermission (15 minutes)</div>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">7:55 PM</div>
                  <div className="font-medium">Performance: Harmony in Motion</div>
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">8:30 PM</div>
                  <div className="font-medium">Closing & Community Meet</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="choir" className="space-y-4">
            {choir ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img src={choir.image} alt={choir.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{choir.name}</h3>
                    <p className="text-sm text-gray-600">{choir.members} members</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  {choir.description || `${choir.name} is a dedicated group of vocalists who perform a variety of musical styles from classical to contemporary pieces.`}
                </p>
                <Button variant="outline" className="w-full" onClick={() => navigate(`/community/${choir.id}`)}>
                  View Choir Profile
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle size={40} className="mx-auto mb-4 opacity-20" />
                <p>Choir information not available.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {!isPastEvent && isAuthenticated && (
          <div className="px-4 mt-6">
            <Button variant="outline" className="w-full" onClick={() => navigate("/events/calendar")}>
              <CalendarIcon size={16} className="mr-2" /> Add to Calendar
            </Button>
          </div>
        )}
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default EventDetails;
