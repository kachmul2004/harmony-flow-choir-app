
import React from "react";
import { ChevronLeft, Bell, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  showNotification?: boolean;
  onNotificationClick?: () => void;
  transparent?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon = <Menu size={24} />,
  onLeftIconClick,
  rightIcon,
  onRightIconClick,
  showNotification = false,
  onNotificationClick,
  transparent = false,
  className = "",
}) => {
  return (
    <header
      className={`sticky top-0 z-30 w-full px-4 py-3 flex items-center justify-between ${
        transparent
          ? "bg-transparent"
          : "bg-background border-b border-border"
      } ${className}`}
    >
      <div className="flex items-center">
        {leftIcon && (
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={onLeftIconClick}
          >
            {leftIcon}
          </Button>
        )}
        {title && (
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        
        {showNotification && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
          >
            <Bell size={24} />
          </Button>
        )}
        
        {rightIcon && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
