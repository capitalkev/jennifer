export default function TimelineSection({ recuerdos }) {
  return (
    <section className="mb-32 max-w-4xl mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Nuestro Recorrido</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Nuestra Historia</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
      </div>

      <div className="relative wrap overflow-hidden p-4 md:p-10">
        <div className="absolute border-opacity-30 border-rose-300 h-full border-[1px] left-[28px] md:left-1/2 md:-ml-[0.5px] top-0"></div>

        {recuerdos.map((recuerdo, index) => {
          const isEven = index % 2 === 0
          const Icon = recuerdo.Icon

          return (
            <div
              key={recuerdo.id}
              className={`mb-16 flex justify-between items-center w-full ${
                isEven ? 'md:flex-row-reverse' : 'flex-row'
              } flex-row group`}
            >
              <div className="hidden md:block w-5/12"></div>

              <div className="z-20 flex items-center order-1 bg-white shadow-md border border-rose-100 w-12 h-12 rounded-full justify-center text-rose-400 absolute left-[4px] md:relative md:left-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-rose-50">
                <Icon className="w-5 h-5" />
              </div>

              <div
                className={`order-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-white w-full md:w-5/12 px-8 py-8 ml-14 md:ml-0 group-hover:-translate-y-2 ${
                  isEven ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <span className="text-xs font-medium text-rose-400 mb-2 block tracking-widest uppercase">
                  {recuerdo.fecha}
                </span>
                <h3 className="font-medium text-slate-800 text-2xl mb-4 font-serif">{recuerdo.titulo}</h3>
                <p className="text-slate-600 font-light leading-relaxed">{recuerdo.descripcion}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
