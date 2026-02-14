import { useState } from 'react'

export default function FloatingPetals() {
  const [petals] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 15}s`,
      animationDelay: `-${Math.random() * 15}s`,
      size: `${Math.random() * 15 + 15}px`,
      rotate: `${Math.random() * 360}deg`,
    })),
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(var(--start-rot)) translateX(0px); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(calc(var(--start-rot) + 200deg)) translateX(50px); opacity: 0; }
        }
        .petal {
          position: absolute;
          top: -50px;
          animation: fall linear infinite;
          fill: url(#petal-grad);
        }
      `}</style>
      <svg className="hidden">
        <defs>
          <linearGradient id="petal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>
      </svg>
      {petals.map((p) => (
        <svg
          key={p.id}
          className="petal drop-shadow-sm"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            '--start-rot': p.rotate,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 2C12 2 21 6 21 13C21 20 12 22 12 22C12 22 3 20 3 13C3 6 12 2 12 2Z" />
        </svg>
      ))}
    </div>
  )
}
