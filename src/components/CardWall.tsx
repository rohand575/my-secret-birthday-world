import { useState } from "react";
import { Card } from "@/components/ui/card";
import notes from "@/data/notes.json";

/**
 * Card Wall Component
 * 
 * Masonry grid of love notes like sticky notes.
 * Click to flip and reveal the full message.
 * 
 * 📝 To customize:
 * - Edit src/data/notes.json to add your own love notes
 */
export const CardWall = () => {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  // Colors for sticky notes
  const colors = [
    "bg-gradient-to-br from-pink-100 to-pink-200",
    "bg-gradient-to-br from-yellow-100 to-yellow-200",
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-purple-100 to-purple-200",
    "bg-gradient-to-br from-green-100 to-green-200",
  ];

  return (
    <section id="notes" className="py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">
            Love Notes Wall
          </h2>
          <p className="text-lg text-muted-foreground">
            Little messages from my heart to yours 💌
          </p>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {notes.map((note, index) => {
            const isFlipped = flippedCards.has(note.id);
            const colorClass = colors[index % colors.length];

            return (
              <Card
                key={note.id}
                onClick={() => toggleCard(note.id)}
                className={`break-inside-avoid cursor-pointer hover-lift transition-smooth ${
                  isFlipped ? "shadow-glow" : "shadow-soft"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: "transform 0.6s",
                }}
              >
                {/* Front of card */}
                <div
                  className={`${colorClass} p-6 rounded-2xl min-h-[150px] flex items-center justify-center ${
                    isFlipped ? "hidden" : "block"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <p className="text-lg font-semibold text-gray-700 text-center">
                    {note.front}
                  </p>
                </div>

                {/* Back of card */}
                <div
                  className={`glass-card p-6 rounded-2xl min-h-[150px] flex items-center ${
                    isFlipped ? "block" : "hidden"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-sm text-foreground leading-relaxed">
                    {note.back}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          💡 Tip: Click any note to read the full message
        </div>
      </div>
    </section>
  );
};
