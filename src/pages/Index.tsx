import { useEffect, useState } from "react";
import { LoginGate } from "@/components/LoginGate";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Quiz } from "@/components/Quiz";
import { GiftReveal } from "@/components/GiftReveal";
import { CardWall } from "@/components/CardWall";
import { Navigation } from "@/components/Navigation";
// import { Countdown } from "@/components/Countdown"; // not needed directly here

/**
 * Flow:
 * 1) Countdown (Hero) ➜ 2) LoginGate ➜ 3) Main site
 */
const Index = () => {
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showGift, setShowGift] = useState(false);

  // Lock scroll while gated (countdown or login)
  useEffect(() => {
    const gated = !countdownComplete || !isUnlocked;
    document.documentElement.classList.toggle("overflow-hidden", gated);
    document.body.classList.toggle("overflow-hidden", gated);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [countdownComplete, isUnlocked]);

  // 1) COUNTDOWN PAGE ONLY
  if (!countdownComplete) {
    return (
      <div className="min-h-screen">
      <Hero
        onCountdownComplete={() => setCountdownComplete(true)}
        showHeader={false}     // Hides “Happy Birthday, Maaike”
      />
    </div>
    );
  }

  // 2) LOGIN GATE ONLY (after countdown)
  if (!isUnlocked) {
    return (
      <div className="min-h-screen">
        <LoginGate onUnlock={() => setIsUnlocked(true)} />
      </div>
    );
  }

  // 3) MAIN EXPERIENCE (now everything is accessible)
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* offset for fixed header */}
      <main className="pt-16">
        {/* Optional: if your Hero also contains the countdown, it’s done now.
            It will just render the "special day" banner. If you prefer a 
            lighter banner without countdown, swap this with a simple Banner component. */}
        <section id="home">
          <Hero onCountdownComplete={() => {}} />
        </section>

        <Timeline />
        <Gallery />

        {!showGift ? (
          <Quiz onUnlockGift={() => setShowGift(true)} />
        ) : (
          <GiftReveal />
        )}

        <CardWall />
      </main>
    </div>
  );
};

export default Index;
