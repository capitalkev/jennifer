export default function ElegantLotus() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className="absolute inset-0 bg-rose-200 rounded-full blur-[40px] opacity-40 animate-pulse"></div>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible z-10">
        <defs>
          <linearGradient id="petal-light" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>
          <linearGradient id="petal-dark" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#ffe4e6" />
          </linearGradient>
          <linearGradient id="petal-center" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#ffe4e6" />
          </linearGradient>
        </defs>
        <g className="animate-[pulse_5s_ease-in-out_infinite] origin-bottom">
          <path
            d="M50 85 C25 85, 10 60, 15 40 C30 55, 45 70, 50 85"
            fill="url(#petal-dark)"
            className="opacity-90"
          />
          <path
            d="M50 85 C75 85, 90 60, 85 40 C70 55, 55 70, 50 85"
            fill="url(#petal-dark)"
            className="opacity-90"
          />
          <path d="M50 88 C30 80, 15 45, 25 20 C40 45, 45 65, 50 88" fill="url(#petal-light)" />
          <path d="M50 88 C70 80, 85 45, 75 20 C60 45, 55 65, 50 88" fill="url(#petal-light)" />
          <path
            d="M50 90 C40 60, 35 15, 50 2 C65 15, 60 60, 50 90"
            fill="url(#petal-center)"
            className="drop-shadow-md"
          />
        </g>
        <ellipse cx="50" cy="94" rx="35" ry="3" fill="#fecdd3" className="opacity-50" />
        <ellipse cx="50" cy="94" rx="15" ry="1.5" fill="#f43f5e" className="opacity-30" />
      </svg>
    </div>
  )
}
