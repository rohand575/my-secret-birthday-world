import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { config } from "@/data/config";
import { toast } from "sonner";

interface LoginGateProps {
  onUnlock: () => void;
}

/**
 * Secret Login Gate Component
 * 
 * Only allows access when the correct passphrase is entered.
 * Customize the question and answer in src/data/config.ts
 */
export const LoginGate = ({ onUnlock }: LoginGateProps) => {
  const [answer, setAnswer] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check answer (case-insensitive, trimmed)
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = config.passphrase.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
      toast.success("✨ Welcome to your Birthday World! ✨");
      setTimeout(onUnlock, 500);
    } else {
      setIsShaking(true);
      toast.error("Hmm, that's not quite right. Try again! 💭");
      setTimeout(() => setIsShaking(false), 500);
      setAnswer("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/20 via-background to-accent/20">
      <div 
        className={`glass-card w-full max-w-md p-8 rounded-2xl shadow-glow transition-smooth ${
          isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">
            Birthday World
          </h1>
          <p className="text-muted-foreground">
            A special place for someone special 💝
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {config.passphrase.question}
            </label>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer..."
              className="bg-white/50 border-primary/30 focus:border-primary"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-romantic text-white hover:shadow-glow transition-bounce"
            size="lg"
          >
            Open Our World 🗝️
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Hint: Think about our special moments together 💭
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
};
