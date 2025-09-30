import { useEffect, useRef } from "react";

/**
 * Fireworks Canvas Animation
 * 
 * Creates a beautiful fireworks display using HTML5 Canvas
 * Triggered when countdown reaches zero
 */
export const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Firework particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.life = 100;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.life -= 1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const colors = ["#ff6f91", "#ffd166", "#7bdff2", "#ff9a9e", "#ffd97d"];

    // Create firework burst
    const createFirework = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);

        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    // Launch fireworks at intervals
    const interval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5; // Upper half of screen
      createFirework(x, y);
    }, 500);

    // Initial firework
    createFirework(canvas.width / 2, canvas.height / 3);

    animate();

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: "screen" }}
    />
  );
};
