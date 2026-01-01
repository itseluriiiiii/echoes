import React from "react";
import { Link } from "react-router-dom";
import { PixelButton } from "@/components/ui/PixelButton";
import { PixelCard } from "@/components/ui/PixelCard";
import { Disclaimer } from "@/components/Disclaimer";
import { MessageCircle, PenLine, Users } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-3 sm:px-4 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
          {/* Pixel art decorative element */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary animate-float" style={{ animationDelay: "0s" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emotional animate-float" style={{ animationDelay: "0.2s" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-practical animate-float" style={{ animationDelay: "0.4s" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-tough-love animate-float" style={{ animationDelay: "0.6s" }} />
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary animate-float" style={{ animationDelay: "0.8s" }} />
          </div>

          <h1 className="font-pixel text-base sm:text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed">
            Life Advice<br />
            <span className="text-primary">From Strangers</span>
          </h1>

          <p className="font-body text-sm sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Ask the question you can't ask the people you know. 
            Receive anonymous advice from strangers who understand.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Link to="/ask">
              <PixelButton size="sm" className="gap-2 w-full sm:w-auto sm:min-w-[160px]">
                <PenLine className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">Ask a Question</span>
              </PixelButton>
            </Link>
            <Link to="/browse">
              <PixelButton variant="secondary" size="sm" className="gap-2 w-full sm:w-auto sm:min-w-[160px]">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">Browse & Advise</span>
              </PixelButton>
            </Link>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-8 sm:pt-12">
            <PixelCard className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto flex items-center justify-center bg-primary/20 text-primary">
                <PenLine className="w-4 h-4" />
              </div>
              <h3 className="font-pixel text-[10px] text-foreground">Ask</h3>
              <p className="font-body text-sm text-muted-foreground">
                One anonymous question. 150 characters.
              </p>
            </PixelCard>

            <PixelCard className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto flex items-center justify-center bg-emotional/20 text-emotional">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-pixel text-[10px] text-foreground">Receive</h3>
              <p className="font-body text-sm text-muted-foreground">
                Strangers share advice. Honest and kind.
              </p>
            </PixelCard>

            <PixelCard className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto flex items-center justify-center bg-practical/20 text-practical">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h3 className="font-pixel text-[10px] text-foreground">Reflect</h3>
              <p className="font-body text-sm text-muted-foreground">
                Read perspectives you'd never hear otherwise.
              </p>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-foreground/10">
        <div className="max-w-2xl mx-auto space-y-4">
          <Disclaimer />
          <p className="text-center font-pixel text-[8px] text-muted-foreground uppercase">
            No usernames • No likes • No followers • Just humans
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
