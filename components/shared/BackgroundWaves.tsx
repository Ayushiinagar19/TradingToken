"use client";

import React, { useEffect, useRef } from "react";

const BackgroundWaves: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resize();
    window.addEventListener("resize", resize);

    // --- WAVE CONFIGURATION ---
    const waves = [
      {
        color: "rgba(20, 184, 166, 0.5)", // Sea Green (Teal)
        amplitude: 40,
        frequency: 0.01,
        speed: 0.02,
        offset: 100, // Vertical offset
      },
      {
        color: "rgba(59, 130, 246, 0.5)", // Blue
        amplitude: 30,
        frequency: 0.02,
        speed: 0.03,
        offset: 50,
      },
      {
        color: "rgba(6, 182, 212, 0.3)", // Cyan (Mix)
        amplitude: 60,
        frequency: 0.005,
        speed: 0.01,
        offset: 150,
      },
    ];

    const draw = () => {
      // Clear canvas but keep a tiny bit of trail for a "glow" feel (optional)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Loop through each wave configuration defined above
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;

        // Draw the sine curve
        for (let x = 0; x < width; x++) {
          // Math.sin(angle) -> creates the wave
          // x * wave.frequency -> stretches the wave horizontally
          // time * wave.speed -> moves the wave over time
          const y =
            height / 1.5 + // Base vertical position (lower half of screen)
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude; 

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      time += 1; // Advance time
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
};

export default BackgroundWaves;