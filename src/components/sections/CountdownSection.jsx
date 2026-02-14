import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Timer } from 'lucide-react'

function toTargetMs(fechaISO) {
  const ms = new Date(fechaISO).getTime()
  return Number.isFinite(ms) ? ms : null
}

function getTimeLeft(targetMs, nowMs) {
  const diff = targetMs - nowMs
  const total = Math.max(0, diff)

  const minutesTotal = Math.floor(total / 60000)
  const days = Math.floor(minutesTotal / (60 * 24))
  const hours = Math.floor((minutesTotal - days * 60 * 24) / 60)
  const minutes = minutesTotal - days * 60 * 24 - hours * 60

  return {
    isPast: diff <= 0,
    days,
    hours,
    minutes,
  }
}

function formatFecha(fechaISO) {
  const date = new Date(fechaISO)
  if (!Number.isFinite(date.getTime())) return 'Fecha inválida'
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function PlanCard({ plan, nowMs }) {
  const targetMs = toTargetMs(plan.fechaISO)
  const timeLeft = targetMs ? getTimeLeft(targetMs, nowMs) : null

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 shadow-[0_10px_40px_rgba(225,29,72,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-xl text-slate-800 truncate">{plan.titulo}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 font-light">
            <CalendarDays className="w-4 h-4 text-rose-400" />
            <span className="truncate">{formatFecha(plan.fechaISO)}</span>
          </div>
        </div>

        <div className="shrink-0">
          <div
            className={`text-xs font-medium px-3 py-1.5 rounded-full border flex items-center gap-2 ${
              timeLeft?.isPast
                ? 'bg-slate-50 text-slate-500 border-slate-200'
                : 'bg-rose-50 text-rose-500 border-rose-100'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            {timeLeft ? (timeLeft.isPast ? '¡Es hoy!' : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`) : '—'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CountdownSection({ plans, onAddPlan }) {
  const [titulo, setTitulo] = useState('')
  const [fechaISO, setFechaISO] = useState('')
  const [nowMs, setNowMs] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 30000)
    return () => window.clearInterval(id)
  }, [])

  const ordered = useMemo(() => {
    const withMs = plans
      .map((p) => ({ plan: p, ms: toTargetMs(p.fechaISO) }))
      .filter((x) => x.ms != null)

    withMs.sort((a, b) => a.ms - b.ms)
    return withMs.map((x) => x.plan)
  }, [plans])

  const submit = (e) => {
    e.preventDefault()
    const titleTrimmed = titulo.trim()
    if (!titleTrimmed) return
    if (!fechaISO) return

    onAddPlan({ titulo: titleTrimmed, fechaISO })
    setTitulo('')
    setFechaISO('')
  }

  return (
    <section className="mb-32">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Planes</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Cuenta Regresiva</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
        <p className="text-slate-500 max-w-xl mt-6 font-light">
          Actividades programadas con contador. Puedes agregar varias.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <form onSubmit={submit} className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">Actividad</div>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Ir al zoológico"
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-rose-200"
              />
            </label>

            <label className="block">
              <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-widest">Fecha y hora</div>
              <input
                type="datetime-local"
                value={fechaISO}
                onChange={(e) => setFechaISO(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-rose-200"
              />
            </label>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-2xl font-medium transition-all shadow-lg shadow-rose-200 active:scale-[0.98]"
              >
                Agregar
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 font-light mt-4">
            Tip: se ordena automáticamente por fecha.
          </p>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ordered.map((plan) => (
            <PlanCard key={plan.id} plan={plan} nowMs={nowMs} />
          ))}
        </div>
      </div>
    </section>
  )
}
