
import React from "react";
import { Users, Star, MessageCircle, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import ProfileCard from "@/components/ProfileCard";
import { users, choirs } from "@/data/mockData";

const Community: React.FC = () => {
  // Member of the month
  const memberOfMonth = users[1];
  
  // Mock discussions
  const discussions = [
    {
      id: "1",
      title: "Warm-up techniques for sopranos",
      author: "Sarah Johnson",
      replies: 12,
      lastActivity: "2 hours ago"
    },
    {
      id: "2",
      title: "Sheet music organization tips",
      author: "Michael Brown",
      replies: 8,
      lastActivity: "Yesterday"
    },
    {
      id: "3",
      title: "Recommendations for vocal health",
      author: "Jane Smith",
      replies: 15,
      lastActivity: "3 days ago"
    }
  ];
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header title="Community" />
      
      <main className="p-4 space-y-6">
        {/* Featured Choirs */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Featured Choirs</h2>
          <div className="grid grid-cols-1 gap-4">
            {choirs.map((choir) => (
              <Card key={choir.id}>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={choir.image}
                        alt={choir.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{choir.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">
                        {choir.location || "Various locations"}
                      </p>
                      <div className="flex items-center">
                        <Users size={14} className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{choir.members} members</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      Join
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Member of the Month */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Member of the Month</h2>
          <Card className="bg-gradient-to-br from-primary/10 to-white border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <div className="relative mr-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={memberOfMonth.avatar} alt={memberOfMonth.name} />
                    <AvatarFallback>{memberOfMonth.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full p-1">
                    <Award size={16} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{memberOfMonth.name}</h3>
                  <Badge>{memberOfMonth.role}</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{memberOfMonth.bio}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span>Recognized for outstanding contribution to the Harmony Voices choir</span>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Recent Discussions */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Recent Discussions</h2>
          <Card>
            <CardContent className="p-4 divide-y">
              {discussions.map((discussion, index) => (
                <div 
                  key={discussion.id}
                  className={`${index > 0 ? 'pt-3 mt-3' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{discussion.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {discussion.replies} replies
                    </Badge>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span>Started by {discussion.author}</span>
                    <span className="mx-2">•</span>
                    <span>Last reply {discussion.lastActivity}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
        
        {/* Active Members */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Active Members</h2>
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <ProfileCard key={user.id} user={user} />
            ))}
          </div>
        </section>
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default Community;
