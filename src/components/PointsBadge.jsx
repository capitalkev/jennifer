import { Heart } from 'lucide-react'

export default function PointsBadge({ puntos }) {
  return (
    <div className="fixed top-4 right-4 md:top-8 md:right-8 z-50 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-rose-100 flex items-center gap-3">
      <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
      <span className="font-serif font-medium text-slate-700">
        <strong className="text-rose-500 text-lg">{puntos}</strong> Puntos
      </span>
    </div>
  )
}
