import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

/**
 * Photo Gallery with Audio Notes
 * 
 * Grid of photos with lightbox view.
 * Each photo can have an optional audio memory note.
 * 
 * 📝 To customize:
 * - Add photos to src/assets/photos/
 * - Record audio notes and save to src/assets/audio/
 * - Update the photos array below with your own photos and audio files
 */

// 🖼️ CUSTOMIZE THIS: Add your own photos and audio notes
const photos = [
  {
    id: 1,
    src: "/placeholder.svg",
    alt: "Beautiful memory together",
    audio: null, // Add path like "/audio/note1.mp3" if you have audio
    caption: "One of my favorite moments with you 💕",
  },
  {
    id: 2,
    src: "/placeholder.svg",
    alt: "Adventure time",
    audio: null,
    caption: "That amazing adventure we had!",
  },
  {
    id: 3,
    src: "/placeholder.svg",
    alt: "Silly moments",
    audio: null,
    caption: "Being silly together is my favorite thing",
  },
  {
    id: 4,
    src: "/placeholder.svg",
    alt: "Sunset together",
    audio: null,
    caption: "Watching sunsets with you never gets old",
  },
  {
    id: 5,
    src: "/placeholder.svg",
    alt: "Food adventures",
    audio: null,
    caption: "Trying new foods together",
  },
  {
    id: 6,
    src: "/placeholder.svg",
    alt: "Just us",
    audio: null,
    caption: "My favorite person in the whole world",
  },
];

export const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const handleAudioToggle = () => {
    if (!selectedPhoto?.audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.src = selectedPhoto.audio;
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const handleCloseDialog = () => {
    audio.pause();
    setIsPlaying(false);
    setSelectedPhoto(null);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">
            Our Gallery
          </h2>
          <p className="text-lg text-muted-foreground">
            Captured moments of our beautiful journey 📸
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer hover-lift group"
            >
              <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-accent/20">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                {photo.audio && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary">
                    🎧 Audio
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          💡 Tip: Click any photo to view it larger
        </div>
      </div>

      {/* Lightbox dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20">
              <img
                src={selectedPhoto?.src}
                alt={selectedPhoto?.alt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 space-y-4">
              <p className="text-lg text-foreground text-center">
                {selectedPhoto?.caption}
              </p>
              {selectedPhoto?.audio && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleAudioToggle}
                    variant="outline"
                    className="gap-2"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause Memory Note
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Play Memory Note
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
