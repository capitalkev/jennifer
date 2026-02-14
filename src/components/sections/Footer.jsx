import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="text-center mt-40 pt-16 border-t border-rose-100/50 text-slate-400 font-light flex flex-col items-center justify-center gap-6 relative z-10">
      <p className="font-serif italic text-2xl text-slate-500">El destino nos volvio a unir.</p>
      <div className="flex items-center gap-2 text-sm tracking-widest uppercase">
        <span>Hecho con</span>
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400 opacity-80" />
        <span>para ti, de tu novio, futuro esposo y padre de tus hijos, Kevin</span>
      </div>
    </footer>
  )
}
