
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children, className }) => {
  return (
    <ScrollArea className={cn("w-full whitespace-nowrap", className)}>
      <div className="flex w-full space-x-4 pb-4">
        {children}
      </div>
    </ScrollArea>
  );
};

export default HorizontalScroll;
