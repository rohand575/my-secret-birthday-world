import { useState, useEffect } from "react";
import { Fireworks } from "./Fireworks";
import { toast } from "sonner";

interface CountdownProps {
  targetDate: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Countdown Timer Component
 * 
 * Counts down to the target birthday date/time.
 * When it reaches zero, launches fireworks! 🎆
 */
export const Countdown = ({ targetDate, onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [hasTriggeredBirthday, setHasTriggeredBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return null;
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Birthday arrived!
      if (!newTimeLeft && !hasTriggeredBirthday) {
        setHasTriggeredBirthday(true);
        setShowFireworks(true);
        toast.success("🎉 HAPPY BIRTHDAY! 🎉", {
          description: "It's finally here! Make a wish! 🌟",
          duration: 10000,
        });
        
        // Trigger the next screen after fireworks display
        setTimeout(() => {
          onComplete?.();
        }, 5000);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, hasTriggeredBirthday]);

  if (!timeLeft) {
    return (
      <div className="relative">
        <div className="text-center py-8">
          <h3 className="text-4xl md:text-5xl font-bold text-shimmer mb-4">
            It's Your Special Day! 🎂
          </h3>
          <p className="text-lg text-muted-foreground">
            May all your wishes come true! ✨
          </p>
        </div>
        {showFireworks && <Fireworks />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground/90">
        Counting down to your special day...
      </h3>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Seconds" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-soft hover-lift"
          >
            <div className="text-3xl md:text-5xl font-bold text-primary mb-2">
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        🎈 Every second brings us closer to celebrating you! 🎈
      </p>
    </div>
  );
};
