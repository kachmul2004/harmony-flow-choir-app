
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Music, Bell, TrendingUp, ArrowRight, Users, Award, Mic2, Headphones, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import EventCard from "@/components/EventCard";
import MusicCard from "@/components/MusicCard";
import NewsCard from "@/components/NewsCard";
import HorizontalScroll from "@/components/HorizontalScroll";
import { useAuth } from "@/context/AuthContext";
import { events, music, news, choirs } from "@/data/mockData";

const Index = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  ).slice(0, 4);
  
  const featuredMusic = music.slice(0, 6);
  const latestNews = news.slice(0, 1);
  const trendingChoirs = choirs.slice(0, 6);
  
  return (
    <div className="pb-20 min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <Header title="Voice of Unity" />
      
      <main className="p-4 space-y-8">
        {isAuthenticated && user && (
          <div className="bg-gradient-to-r from-primary/80 to-primary rounded-lg p-4 text-white mb-6 animate-fade-in">
            <h2 className="font-semibold text-lg">Welcome back, {user.name.split(' ')[0]}!</h2>
            <p className="text-sm opacity-90">Your musical journey continues here</p>
          </div>
        )}

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 hover:to-purple-600/20 transition-all">
            <CardContent className="p-3 text-center">
              <Mic2 className="w-5 h-5 mx-auto mb-1 text-primary" />
              <h3 className="text-xl font-bold">{choirs.length}</h3>
              <p className="text-xs text-muted-foreground">Choirs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 hover:to-blue-600/20 transition-all">
            <CardContent className="p-3 text-center">
              <Music className="w-5 h-5 mx-auto mb-1 text-primary" />
              <h3 className="text-xl font-bold">{music.length}</h3>
              <p className="text-xs text-muted-foreground">Songs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 hover:to-green-600/20 transition-all">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
              <h3 className="text-xl font-bold">2.5K</h3>
              <p className="text-xs text-muted-foreground">Members</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 hover:to-orange-600/20 transition-all">
            <CardContent className="p-3 text-center">
              <Star className="w-5 h-5 mx-auto mb-1 text-primary" />
              <h3 className="text-xl font-bold">180</h3>
              <p className="text-xs text-muted-foreground">Events</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Music Section with Horizontal Scroll */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <Headphones className="w-5 h-5 mr-2 text-primary" />
                Featured Music
              </h2>
              <p className="text-sm text-muted-foreground">Top picks for you</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate('/music')}>
              View All
            </Button>
          </div>
          <HorizontalScroll>
            {featuredMusic.map((track) => (
              <div key={track.id} className="w-[280px] shrink-0">
                <MusicCard music={track} onClick={() => navigate(`/music/${track.id}`)} />
              </div>
            ))}
          </HorizontalScroll>
        </section>

        {/* Upcoming Events Grid */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Upcoming Events
              </h2>
              <p className="text-sm text-muted-foreground">Don't miss out</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate('/events')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="h-[200px]">
                <EventCard event={event} onClick={() => navigate(`/events/${event.id}`)} />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Choirs */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Trending Choirs
              </h2>
              <p className="text-sm text-muted-foreground">Popular this week</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate('/community')}>
              View All
            </Button>
          </div>
          <HorizontalScroll>
            {trendingChoirs.map((choir) => (
              <Card key={choir.id} className="w-[200px] shrink-0">
                <CardContent className="p-4">
                  <div className="h-24 w-full rounded-md overflow-hidden mb-3">
                    <img
                      src={choir.image}
                      alt={choir.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium truncate">{choir.name}</h4>
                  <p className="text-xs text-muted-foreground">{choir.members} members</p>
                </CardContent>
              </Card>
            ))}
          </HorizontalScroll>
        </section>

        {/* Latest Updates */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary" />
                Latest Updates
              </h2>
              <p className="text-sm text-muted-foreground">Stay informed</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate('/news')}>
              View All
            </Button>
          </div>
          {latestNews.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onClick={() => navigate(`/news/${item.id}`)}
            />
          ))}
        </section>
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default Index;
