import { useState } from "react";
import { LoginGate } from "@/components/LoginGate";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Quiz } from "@/components/Quiz";
import { GiftReveal } from "@/components/GiftReveal";
import { CardWall } from "@/components/CardWall";
import { Navigation } from "@/components/Navigation";

/**
 * Birthday World - Main Page
 * 
 * A romantic single-page website for a special birthday celebration.
 * 
 * 🎨 To customize this website:
 * 1. Edit src/data/config.ts - Update name, birthday date, and passphrase
 * 2. Edit src/data/moments.json - Add your timeline memories
 * 3. Edit src/data/notes.json - Add your love notes
 * 4. Edit src/data/quiz.json - Customize quiz questions
 * 5. Add photos to src/assets/photos/
 * 6. (Optional) Add audio notes to src/assets/audio/
 * 
 * 🚀 To deploy:
 * - GitHub Pages: Connect your repo and deploy
 * - Netlify: Drag and drop your build folder
 * - Vercel: Import from GitHub
 */
const Index = () => {
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGift, setShowGift] = useState(false);

  // Show countdown first
  if (!countdownComplete) {
    return <Hero onCountdownComplete={() => setCountdownComplete(true)} />;
  }

  // Show login gate after countdown
  if (!isUnlocked) {
    return <LoginGate onUnlock={() => setIsUnlocked(true)} />;
  }

  // Main birthday world experience
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Add padding to account for fixed header */}
      <div className="pt-16">
        <div id="home">
          <Hero onCountdownComplete={() => {}} />
        </div>
        
        <Timeline />
        
        <Gallery />
        
        {!showGift ? (
          <Quiz onUnlockGift={() => setShowGift(true)} />
        ) : (
          <GiftReveal />
        )}
        
        <CardWall />
      </div>
    </div>
  );
};

export default Index;
