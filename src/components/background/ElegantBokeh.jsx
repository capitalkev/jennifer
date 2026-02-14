import { useState } from 'react'

export default function ElegantBokeh() {
  const [particles] = useState(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${20 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${Math.random() * 30 + 10}px`,
      opacity: Math.random() * 0.3 + 0.1,
    })),
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes floatUpBokeh {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0; }
          30% { opacity: var(--max-opacity); }
          70% { opacity: var(--max-opacity); }
          100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
        }
        .bokeh-particle {
          position: absolute;
          bottom: -50px;
          animation: floatUpBokeh linear infinite;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,228,230,0.4) 50%, transparent 100%);
          filter: blur(2px);
        }
      `}</style>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="bokeh-particle"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
            '--max-opacity': particle.opacity,
          }}
        />
      ))}
    </div>
  )
}
