import { CheckCircle, Heart, Lock } from 'lucide-react'

export default function ValesSection({ vales, puntos, onRedeem }) {
  return (
    <section className="mb-32">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Recompensas</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Vales de Amor</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
        <p className="text-slate-500 max-w-lg mt-6 font-light">
          Utiliza tus puntos acumulados para canjear estas experiencias exclusivas.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {vales.map((vale) => {
          const puedeComprar = puntos >= vale.costo
          const Icon = vale.Icon
          const notchBg = vale.canjeado ? 'bg-slate-50' : 'bg-rose-50'
          const ticketBorder = vale.canjeado ? 'border-slate-200' : 'border-rose-200'
          const ticketShadow = vale.canjeado
            ? 'shadow-[0_10px_35px_rgba(15,23,42,0.06)]'
            : 'shadow-[0_12px_45px_rgba(225,29,72,0.10)]'

          return (
            <div
              key={vale.id}
              className={`relative transition-all duration-500 ${vale.canjeado ? '' : 'hover:-translate-y-1'}`}
            >
              <div
                className={`relative rounded-2xl bg-white border ${ticketBorder} ${ticketShadow} ${
                  vale.canjeado ? 'opacity-80' : ''
                }`}
              >

                {vale.canjeado && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none overflow-hidden">
                    <div className="text-rose-900/10 -rotate-12 text-5xl md:text-6xl font-black tracking-widest uppercase font-serif select-none">
                      CANJEADO
                    </div>
                  </div>
                )}

                <div className={`relative p-6 ${vale.canjeado ? 'grayscale opacity-70' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="p-3 bg-rose-50 rounded-2xl shrink-0">
                        <Icon className={vale.iconClassName} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-medium text-slate-800 font-serif leading-snug break-words">
                          {vale.titulo}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 tracking-wide uppercase">Ticket</p>
                      </div>
                    </div>

                    {!vale.canjeado && (
                      <div className="bg-rose-50 text-rose-500 px-3 py-1.5 rounded-full text-xs font-medium font-serif border border-rose-100 flex items-center gap-1 shrink-0">
                        <Heart className="w-3.5 h-3.5 fill-rose-500" /> {vale.costo} pts
                      </div>
                    )}
                  </div>

                  <div className="relative mt-5">
                    <div
                      className={`pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${notchBg} border ${ticketBorder}`}
                    ></div>
                    <div
                      className={`pointer-events-none absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${notchBg} border ${ticketBorder}`}
                    ></div>
                    <div className={`border-t border-dashed ${vale.canjeado ? 'border-slate-200' : 'border-rose-200'}`}></div>
                  </div>

                  <p
                    className={`text-slate-600 font-light text-sm leading-relaxed mt-5 min-h-[3.5rem] ${
                      vale.canjeado ? 'opacity-70' : ''
                    }`}
                  >
                    {vale.descripcion}
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => onRedeem(vale.id, vale.costo)}
                      disabled={vale.canjeado || (!puedeComprar && !vale.canjeado)}
                      className={`w-full py-3.5 px-5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all tracking-wide ${
                        vale.canjeado
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : puedeComprar
                            ? 'bg-rose-400 hover:bg-rose-500 text-white shadow-md shadow-rose-200 active:scale-[0.98]'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      }`}
                    >
                      {vale.canjeado ? (
                        <>
                          <CheckCircle className="w-5 h-5" /> Utilizado
                        </>
                      ) : puedeComprar ? (
                        <>
                          <Heart className="w-4 h-4" /> Canjear
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" /> Faltan {vale.costo - puntos} pts
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
