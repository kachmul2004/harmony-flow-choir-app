
import React, { useState } from "react";
import { Search, Bell, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import NewsCard from "@/components/NewsCard";
import { news } from "@/data/mockData";

const News: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Notifications data (mock)
  const notifications = [
    {
      id: "1",
      title: "Rehearsal Reminder",
      message: "Harmony Voices rehearsal tomorrow at 6:30 PM",
      time: "1 hour ago",
      read: false
    },
    {
      id: "2",
      title: "New Music Added",
      message: "3 new scores have been added to your choir folder",
      time: "Yesterday",
      read: true
    },
    {
      id: "3",
      title: "Payment Confirmation",
      message: "Your membership fee payment was successful",
      time: "3 days ago",
      read: true
    }
  ];
  
  const filteredItems = filter === "news" 
    ? news.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : notifications.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase()));
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title={filter === "news" ? "News & Announcements" : "Notifications"} />
      
      <main className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-9"
            placeholder={filter === "news" ? "Search news..." : "Search notifications..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="news" onValueChange={setFilter} className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filter === "news" ? (
          filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <NewsCard key={item.id} news={item as any} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No news found</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                {searchQuery
                  ? `No news matches "${searchQuery}". Try a different search term.`
                  : "There are no news items available right now."}
              </p>
            </div>
          )
        ) : (
          filteredItems.length > 0 ? (
            <div className="space-y-3">
              {filteredItems.map((notification: any) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-primary/5 border-primary/20'}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    {!notification.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No notifications</h3>
              <p className="text-sm text-gray-500 max-w-xs">
                {searchQuery
                  ? `No notifications match "${searchQuery}". Try a different search term.`
                  : "You're all caught up! No new notifications."}
              </p>
            </div>
          )
        )}
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default News;
