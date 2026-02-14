export default function GallerySection({ fotos }) {
  return (
    <section className="mb-20">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Nuestros instantes</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Galería</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[280px] max-w-5xl mx-auto">
        {fotos.map((foto) => (
          <div
            key={foto.id}
            className={`relative overflow-hidden rounded-2xl group shadow-sm hover:shadow-2xl transition-all duration-700 ${
              foto.span || ''
            }`}
          >
            <img
              src={foto.url}
              alt={foto.caption}
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-white font-serif text-2xl font-light italic tracking-wide">{foto.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
