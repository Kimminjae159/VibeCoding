
import React from 'react';

interface StatRadarProps {
  stats: {
    points: number;
    rebounds: number;
    assists: number;
    defense: number; // calculated from blocks/steals
    efficiency: number;
  };
  size?: number;
}

const StatRadar: React.FC<StatRadarProps> = ({ stats, size = 150 }) => {
  const categories = ['PTS', 'REB', 'AST', 'DEF', 'EFF'];
  const max = 25; // Normalize scale
  
  const values = [
    Math.min(stats.points, max),
    Math.min(stats.rebounds, max),
    Math.min(stats.assists, max),
    Math.min(stats.defense, max),
    Math.min(stats.efficiency / 4, max) // Scaling efficiency down for display
  ];

  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const angleStep = (Math.PI * 2) / categories.length;

  const getPoint = (val: number, i: number) => {
    const r = (val / max) * radius;
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const points = values.map((v, i) => getPoint(v, i));
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} className="overflow-visible">
      {/* Background circles */}
      {[0.5, 1].map((scale, i) => (
        <path
          key={i}
          d={categories.map((_, idx) => {
            const p = getPoint(max * scale, idx);
            return `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
          }).join(' ') + ' Z'}
          fill="none"
          stroke="rgba(100, 116, 139, 0.2)"
          strokeWidth="1"
        />
      ))}
      
      {/* Category lines */}
      {categories.map((_, i) => {
        const p = getPoint(max, i);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="rgba(100, 116, 139, 0.2)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data area */}
      <path
        d={pathData}
        fill="rgba(79, 70, 229, 0.3)"
        stroke="rgba(79, 70, 229, 0.8)"
        strokeWidth="2"
        className="animate-[radar_2s_ease-out]"
      />

      {/* Labels */}
      {categories.map((cat, i) => {
        const p = getPoint(max * 1.2, i);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#64748b"
          >
            {cat}
          </text>
        );
      })}

      <style>{`
        @keyframes radar {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </svg>
  );
};

export default StatRadar;
