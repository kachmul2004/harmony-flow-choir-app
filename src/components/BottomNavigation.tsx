
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, Music, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Music, label: "Music", path: "/music" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bottom-nav bg-white border-t flex justify-around py-2 px-2 z-30">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-16 py-1",
              isActive ? "text-primary" : "text-gray-500"
            )}
          >
            <item.icon size={22} className={isActive ? "text-primary" : "text-gray-500"} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
