
import React from "react";
import { Calendar, MapPin, Music } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/data/mockData";

interface ProfileCardProps {
  user: User;
  onClick?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick }) => {
  const joinDate = new Date(user.joinDate);
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md" 
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <Badge className="mt-1">{user.role}</Badge>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-500">
            <Music size={14} className="mr-2" />
            <span>Interests: {user.interests.join(", ")}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-2" />
            <span>Member since {format(joinDate, "MMMM yyyy")}</span>
          </div>
          {user.choirMemberships.length > 0 && (
            <div className="flex items-center text-gray-500">
              <MapPin size={14} className="mr-2" />
              <span>{user.choirMemberships.join(", ")}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
