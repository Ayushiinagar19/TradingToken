"use client";

export default function Sparkline({ data, isPositive }: { data: number[]; isPositive: boolean }) {
  // Calculate SVG path
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 30;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="100" height="30" viewBox="0 0 100 30" className="overflow-visible">
      <polyline
        fill="none"
        stroke={isPositive ? "#22c55e" : "#ef4444"} // Green or Red
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}