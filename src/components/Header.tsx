import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MessageCircle, PenLine, Home } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/browse", label: "Browse", icon: MessageCircle },
    { path: "/ask", label: "Ask", icon: PenLine },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-foreground/10">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-pixel text-[10px] text-primary hover:text-primary/80 transition-colors">
            LAFAS
          </Link>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 font-pixel text-[8px] uppercase transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export { Header };
