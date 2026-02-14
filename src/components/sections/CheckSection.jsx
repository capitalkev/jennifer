import { CheckCircle2, Circle } from 'lucide-react'

function ActivityRow({ activity, onToggle }) {
  const Icon = activity.done ? CheckCircle2 : Circle

  return (
    <button
      type="button"
      onClick={() => onToggle(activity.id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border transition-all text-left ${
        activity.done
          ? 'bg-white/40 border-slate-200'
          : 'bg-white border-rose-100 hover:border-rose-200 shadow-[0_10px_40px_rgba(225,29,72,0.05)]'
      }`}
      aria-pressed={activity.done}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${
          activity.done
            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
            : 'bg-white border-slate-200 text-slate-400'
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div
          className={`font-serif text-base ${activity.done ? 'text-slate-700' : 'text-slate-800'}`}
        >
          {activity.titulo}
        </div>
      </div>
    </button>
  )
}

export default function CheckSection({ activities, onToggle }) {
  const ordered = [...activities].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    <section className="mb-32">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Nuestro juego</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Check</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
        <p className="text-slate-500 max-w-xl mt-6 font-light">
          Lista de cosas que queremos hacer juntos. Toca una actividad para marcarla como hecha.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-serif text-slate-800">Actividades</h3>
            <span className="text-xs font-medium text-slate-600 bg-white/70 px-3 py-1.5 rounded-full border border-slate-200">
              {activities.filter((a) => a.done).length}/{activities.length}
            </span>
          </div>

          <div className="space-y-2">
            {ordered.map((activity) => (
              <ActivityRow key={activity.id} activity={activity} onToggle={onToggle} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
