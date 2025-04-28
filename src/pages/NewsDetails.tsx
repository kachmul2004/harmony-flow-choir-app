
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import { news } from "@/data/mockData";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import MusicPlayer from "@/components/MusicPlayer";
import { Badge } from "@/components/ui/badge";

const NewsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const newsItem = news.find(item => item.id === id);
  
  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold mb-2">News not found</h2>
          <p className="text-gray-600 mb-4">The news item you're looking for doesn't exist.</p>
          <button 
            className="text-primary hover:underline"
            onClick={() => navigate('/news')}
          >
            Return to News
          </button>
        </div>
      </div>
    );
  }
  
  const newsDate = new Date(newsItem.date);
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <Header 
        title="News Details" 
        leftIcon={<ChevronLeft size={20} />}
        onLeftIconClick={() => navigate('/news')}
      />
      
      <main className="p-4">
        {newsItem.imageUrl && (
          <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
            <img 
              src={newsItem.imageUrl} 
              alt={newsItem.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <Badge variant="outline" className="mb-3">
          {newsItem.category}
        </Badge>
        
        <h1 className="text-2xl font-bold mb-2">{newsItem.title}</h1>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{format(newsDate, "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <User size={16} className="mr-1" />
            <span>{newsItem.author}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <p className="text-gray-800 whitespace-pre-line">
            {newsItem.content}
          </p>
        </div>
      </main>
      
      <MusicPlayer />
      <BottomNavigation />
    </div>
  );
};

export default NewsDetails;
