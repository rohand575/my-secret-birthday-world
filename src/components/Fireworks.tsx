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
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 80;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04; // gravity
        this.life -= 1;
      }

      // draw(ctx: CanvasRenderingContext2D) {
      //   ctx.beginPath();
      //   ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      //   ctx.fillStyle = this.color;
      //   ctx.globalAlpha = this.life / 100;
      //   ctx.fill();
      // }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        ctx.globalAlpha = Math.min(1, 0.85 * (this.life / 80));
        // ctx.globalAlpha = this.life / 100;   // fade out smoothly
        ctx.arc(this.x, this.y, 1.6, 0, Math.PI * 2); // smaller dots
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

    }

    const particles: Particle[] = [];
    const colors = ["#ff003cff", "#ffc744ff", "#00d5ffff", "#ff9a9e", "#62ff00ff", "#ff8800ff"];
    // const colors = ["#ff6f91", "#ffd166", "#7bdff2", "#ff9a9e", "#ffd97d"];

    // Create firework burst
    const createFirework = (x: number, y: number) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 35; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    // Animation loop
    // const animate = () => {
    //   ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);

    //   particles.forEach((particle, index) => {
    //     particle.update();
    //     particle.draw(ctx);

    //     if (particle.life <= 0) {
    //       particles.splice(index, 1);
    //     }
    //   });

    //   requestAnimationFrame(animate);
    // };

    // Animation loop
    let rafId = 0;
    const animate = () => {
      // fade previous frame **without** adding black
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)"; // alpha controls trail length
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw new particles as light that "glows"
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        if (particle.life <= 0) particles.splice(index, 1);
      });

      rafId = requestAnimationFrame(animate);
    };


    // Launch fireworks at intervals
    const interval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5; // Upper half of screen
      createFirework(x, y);
    }, 700);

    // after ctx is created
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.floor(rect?.width ?? window.innerWidth);
      const h = Math.floor(rect?.height ?? window.innerHeight);
      canvas.width = w > 0 ? w : window.innerWidth;
      canvas.height = h > 0 ? h : window.innerHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);


    // Initial firework
    createFirework(canvas.width / 2, canvas.height / 3);

    animate();

    // Cleanup
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none -z-10 fireworks-canvas"
        style={{ mixBlendMode: "normal" }}
      />
  );
};
