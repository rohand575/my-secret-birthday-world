import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import moments from "@/data/moments.json";

/**
 * Interactive Timeline Component
 * 
 * Displays a horizontal scrollable timeline of special moments.
 * Click any moment card to expand and read the full story.
 * 
 * 📝 To customize:
 * - Edit src/data/moments.json to add your own memories
 * - Replace photos in src/assets/photos/ directory
 */
export const Timeline = () => {
  const [selectedMoment, setSelectedMoment] = useState<typeof moments[0] | null>(null);

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">
            Our Journey Together
          </h2>
          <p className="text-lg text-muted-foreground">
            Every moment with you is a treasure 💎
          </p>
        </div>

        {/* Horizontal scrollable timeline */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {moments.map((moment, index) => (
              <Card
                key={moment.id}
                onClick={() => setSelectedMoment(moment)}
                className="glass-card flex-shrink-0 w-80 p-6 cursor-pointer hover-lift snap-center group"
              >
                {/* Photo */}
                <div className="relative mb-4 rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={moment.photo}
                    alt={moment.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white/90 text-sm font-medium">
                    {moment.date}
                  </div>
                </div>

                {/* Title and caption */}
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {moment.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {moment.caption}
                </p>

                <div className="text-xs text-primary font-medium">
                  Click to read more →
                </div>
              </Card>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            ← Scroll to explore our memories →
          </div>
        </div>
      </div>

      {/* Expanded moment dialog */}
      <Dialog open={!!selectedMoment} onOpenChange={() => setSelectedMoment(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-shimmer">
              {selectedMoment?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              {selectedMoment?.date}
            </div>
            <div className="rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
              <img
                src={selectedMoment?.photo}
                alt={selectedMoment?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {selectedMoment?.fullStory}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
