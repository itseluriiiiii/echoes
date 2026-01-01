import * as React from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimeRemainingProps {
  expiresAt: Date;
  className?: string;
}

const TimeRemaining: React.FC<TimeRemainingProps> = ({ expiresAt, className }) => {
  const [timeLeft, setTimeLeft] = React.useState<string>("");

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();
      
      if (diff <= 0) {
        return "Expired";
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        return `${hours}h ${minutes}m left`;
      }
      return `${minutes}m left`;
    };

    setTimeLeft(calculateTimeLeft());
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  const isExpired = timeLeft === "Expired";
  const isUrgent = !isExpired && timeLeft.includes("m") && !timeLeft.includes("h");

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-pixel text-[10px] uppercase",
        isExpired && "text-muted-foreground",
        isUrgent && "text-tough-love",
        !isExpired && !isUrgent && "text-muted-foreground",
        className
      )}
    >
      <Clock className="w-3 h-3" />
      {timeLeft}
    </span>
  );
};

export { TimeRemaining };
