
import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsItem } from "@/data/mockData";

interface NewsCardProps {
  news: NewsItem;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  const newsDate = new Date(news.date);
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/news/${news.id}`);
    }
  };
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-md" 
      onClick={handleClick}
    >
      {news.imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={news.imageUrl} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {news.category}
          </Badge>
          <span className="text-xs text-gray-500">
            {format(newsDate, "MMM d, yyyy")}
          </span>
        </div>
        <h3 className="font-semibold mb-2 line-clamp-2">{news.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{news.content}</p>
        <div className="mt-3 text-xs text-gray-500">
          By {news.author}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
