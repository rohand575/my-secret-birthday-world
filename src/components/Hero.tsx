import { config } from "@/data/config";
import { Countdown } from "./Countdown";

interface HeroProps {
  onCountdownComplete?: () => void;
  showHeader?: boolean;
}

/**
 * Hero Section Component
 * 
 * Displays birthday greeting with live countdown timer
 */
export const Hero = ({ onCountdownComplete, showHeader = true}: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Birthday message */}
        {showHeader && (
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="text-shimmer">Happy Birthday,</span>
            </h1>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary animate-[fadeIn_1s_ease-in]">
              {config.girlfriendName} 🎉
            </h2>
          </div>
        )}

        {/* Countdown timer */}
        <div className="glass-card p-8 rounded-3xl shadow-glow max-w-2xl mx-auto">
          <Countdown targetDate={config.birthdayDate} onComplete={onCountdownComplete} />
        </div>

        {/* Decorative hearts */}
        <div className="mt-12 text-6xl animate-bounce">
          💝
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
