import { useState } from 'react'
import { Heart, Quote } from 'lucide-react'

export default function LoveLetter({ message }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="mb-32 flex flex-col items-center">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative transition-all duration-700 hover:scale-[1.02] active:scale-95 w-full max-w-xl"
      >
        <div
          className={`flex flex-col items-center gap-6 transition-all duration-700 ${
            isOpen ? 'opacity-0 absolute pointer-events-none scale-90' : 'opacity-100 scale-100'
          }`}
        >
          <div className="bg-white p-12 rounded-2xl shadow-[0_20px_50px_rgba(225,29,72,0.08)] border border-rose-100 group-hover:shadow-[0_20px_50px_rgba(225,29,72,0.15)] transition-all duration-500 flex flex-col items-center justify-center min-h-[220px] w-80 relative overflow-hidden">
            <div className="w-16 h-16 bg-rose-300 rounded-full flex items-center justify-center mb-4 shadow-inner border border-rose-200">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h3 className="text-slate-700 font-serif italic text-xl">Una carta para ti</h3>
          </div>
          <span className="text-rose-400 font-medium text-sm tracking-widest uppercase animate-pulse">
            Haz clic para abrir
          </span>
        </div>

        <div
          className={`bg-white/70 backdrop-blur-2xl p-10 md:p-14 rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.1)] border border-white transition-all duration-1000 w-full ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 absolute pointer-events-none translate-y-12 scale-95'
          }`}
        >
          <Quote className="w-10 h-10 text-rose-200 mb-8 mx-auto" />
          <p className="text-center text-slate-700 text-xl md:text-2xl leading-relaxed font-serif italic font-light">
            "{message}"
          </p>
          <div className="mt-10 flex justify-center">
            <div className="w-16 h-[1px] bg-rose-300"></div>
          </div>
        </div>
      </button>
    </section>
  )
}
