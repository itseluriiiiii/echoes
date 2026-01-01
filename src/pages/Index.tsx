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
      <section className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Pixel art decorative element */}
          <div className="flex justify-center gap-2 mb-6">
            <span className="w-2 h-2 bg-primary animate-float" style={{ animationDelay: "0s" }} />
            <span className="w-2 h-2 bg-emotional animate-float" style={{ animationDelay: "0.2s" }} />
            <span className="w-2 h-2 bg-practical animate-float" style={{ animationDelay: "0.4s" }} />
            <span className="w-2 h-2 bg-tough-love animate-float" style={{ animationDelay: "0.6s" }} />
            <span className="w-2 h-2 bg-primary animate-float" style={{ animationDelay: "0.8s" }} />
          </div>

          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed">
            Life Advice<br />
            <span className="text-primary">From Strangers</span>
          </h1>

          <p className="font-body text-xl sm:text-2xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Ask the question you can't ask the people you know. 
            Receive anonymous advice from strangers who understand.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/ask">
              <PixelButton className="gap-2 min-w-[160px]">
                <PenLine className="w-4 h-4" />
                Ask a Question
              </PixelButton>
            </Link>
            <Link to="/browse">
              <PixelButton variant="secondary" className="gap-2 min-w-[160px]">
                <MessageCircle className="w-4 h-4" />
                Browse & Advise
              </PixelButton>
            </Link>
          </div>

          {/* How it works */}
          <div className="grid sm:grid-cols-3 gap-4 pt-12">
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
