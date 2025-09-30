import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";

/**
 * Gift Reveal Component
 * 
 * A playful puzzle that reveals the birthday gift!
 * Click tiles to solve the puzzle.
 * 
 * 📝 To customize:
 * - Change the giftMessage and giftHint below
 * - Optionally add a photo of the gift
 */
export const GiftReveal = () => {
  const [revealProgress, setRevealProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // 🎁 CUSTOMIZE THIS: Your gift message and hint
  const giftMessage = "I've prepared something special for you...";
  const giftHint = "Check under your pillow tonight! 🎁";
  const totalTiles = 9;

  const handleTileClick = (index: number) => {
    if (revealProgress >= totalTiles) return;
    
    const newProgress = revealProgress + 1;
    setRevealProgress(newProgress);

    if (newProgress >= totalTiles) {
      setTimeout(() => setIsRevealed(true), 500);
    }
  };

  const resetPuzzle = () => {
    setRevealProgress(0);
    setIsRevealed(false);
  };

  if (isRevealed) {
    return (
      <section id="gift" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8 md:p-12 text-center shadow-glow animate-[fadeIn_0.5s_ease-in]">
            <div className="mb-8">
              <div className="text-7xl mb-6 animate-bounce">
                🎁
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shimmer">
                Your Gift Awaits!
              </h2>
              <p className="text-xl text-foreground mb-4">
                {giftMessage}
              </p>
              <div className="bg-shine text-white rounded-2xl p-6 my-8">
                <p className="text-2xl font-semibold">
                  {giftHint}
                </p>
              </div>
              <p className="text-muted-foreground">
                I hope you love it as much as I love you! 💝
              </p>
            </div>

            {/* Optional: Add gift image */}
            <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 aspect-video flex items-center justify-center">
              <Gift className="w-24 h-24 text-primary/40" />
              {/* Replace with: <img src="/path/to/gift-photo.jpg" alt="Your gift" className="w-full h-full object-cover" /> */}
            </div>

            <Button
              onClick={resetPuzzle}
              variant="outline"
              className="mt-4"
            >
              Play Again
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="gift" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">
            Unlock Your Gift
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Click the tiles to reveal your surprise! 🎁
          </p>
          <div className="text-sm text-primary font-medium">
            {revealProgress} / {totalTiles} revealed
          </div>
        </div>

        <Card className="glass-card p-8 shadow-soft">
          {/* Puzzle grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: totalTiles }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleTileClick(index)}
                disabled={index < revealProgress}
                className={`aspect-square rounded-2xl transition-smooth ${
                  index < revealProgress
                    ? "bg-romantic scale-95 cursor-not-allowed"
                    : "bg-white/40 hover:bg-white/60 hover:scale-105 cursor-pointer hover-lift"
                }`}
              >
                {index < revealProgress && (
                  <div className="text-3xl animate-[fadeIn_0.3s_ease-in]">
                    {["💝", "🎉", "✨", "🎁", "💕", "🌟", "🎊", "💖", "🎀"][index]}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="bg-white/30 rounded-full h-3 overflow-hidden">
            <div
              className="bg-romantic h-full transition-smooth"
              style={{ width: `${(revealProgress / totalTiles) * 100}%` }}
            />
          </div>
        </Card>
      </div>
    </section>
  );
};
