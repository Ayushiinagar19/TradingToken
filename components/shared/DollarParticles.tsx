"use client";

import React, { useEffect, useState } from "react";

const dollarPattern = [
  // Vertical Line (center)
  { x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 },
  // Top Curve (S shape)
  { x: 4, y: 1 }, { x: 5, y: 1 }, 
  { x: 2, y: 1 }, { x: 1, y: 1 }, 
  { x: 1, y: 2 }, 
  // Middle Curve
  { x: 2, y: 4 }, { x: 1, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
  { x: 5, y: 5 }, 
  // Bottom Curve
  { x: 4, y: 7 }, { x: 5, y: 7 }, 
  { x: 2, y: 7 }, { x: 1, y: 7 }, 
];

const DollarParticles = () => {
  const [isScattered, setIsScattered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [particles] = useState(() => 
    dollarPattern.map((pos) => ({
      id: Math.random(),
      // -------------------------------------------------------
      // CHANGE 1: Increased Multiplier from 20 to 35
      // This spreads the dots out, making the symbol taller and wider
      // -------------------------------------------------------
      targetX: pos.x * 35, 
      targetY: pos.y * 35,
      
      // Increased scatter range slightly since the symbol is bigger
      scatterX: (Math.random() - 0.5) * 500, 
      scatterY: (Math.random() - 0.5) * 500,
      delay: Math.random() * 0.5,
    }))
  );

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setIsScattered((prev) => !prev);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    // -------------------------------------------------------
    // CHANGE 2: Increased Container Size
    // w-[200px] -> w-[350px] and h-[250px] -> h-[400px]
    // -------------------------------------------------------
    <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[350px] h-[400px] z-20 hidden md:block">
      {particles.map((p) => (
        <div
          key={p.id}
          // -------------------------------------------------------
          // CHANGE 3: Increased Dot Size
          // w-3 h-3 -> w-5 h-5 (makes the crystals chunkier)
          // -------------------------------------------------------
          className={`absolute w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all duration-[1500ms] ease-in-out`}
          style={{
            transform: isScattered
              ? `translate(${p.scatterX}px, ${p.scatterY}px) scale(0.5)`
              : `translate(${p.targetX}px, ${p.targetY}px) scale(1)`,
            opacity: isScattered ? 0.3 : 1,
            transitionDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default DollarParticles;