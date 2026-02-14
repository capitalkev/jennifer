import { useState } from 'react'

function PolaroidCard({ foto }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`relative h-full w-full perspective-1000 cursor-pointer ${foto.span || ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Lado Frontal: La Foto */}
        <div className="absolute inset-0 backface-hidden bg-white p-3 pb-12 shadow-xl border border-slate-100 rounded-sm">
          <img
            src={foto.url}
            alt={foto.caption}
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="font-serif text-slate-500 text-sm italic">{foto.caption}</span>
          </div>
        </div>

        {/* Lado Trasero: El Mensaje */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-rose-50 p-6 flex flex-col items-center justify-center shadow-xl border border-rose-100 rounded-sm text-center">
           <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center mb-4">
              <span className="text-rose-400">❤️</span>
           </div>
           <p className="font-serif text-slate-700 italic text-lg leading-relaxed">
             "{foto.mensaje || 'Un momento inolvidable...'}"
           </p>
        </div>
      </div>
    </div>
  )
}

export default function GallerySection({ fotos }) {
  return (
    <section className="mb-20 px-4">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Nuestros instantes</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Álbum de Recuerdos</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto auto-rows-[320px]">
        {fotos.map((foto) => (
          <PolaroidCard key={foto.id} foto={foto} />
        ))}
      </div>
    </section>
  )
}