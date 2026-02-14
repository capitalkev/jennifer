import { useEffect, useState } from 'react'

import {
  CARTA_MENSAJE,
  CHECK_ACTIVIDADES,
  FOTOS,
  JUEGO_IMAGENES,
  LUGARES_INICIALES,
  PLANES_INICIALES,
  PUZZLE_IMAGES,
  QUIZ_PREGUNTAS,
  RECUERDOS,
  VALES_INICIALES,
} from './data/sanvalentinData.js'

import ElegantBokeh from './components/background/ElegantBokeh.jsx'
import AnimatedBackground from './components/background/AnimatedBackground.jsx'
import FloatingPetals from './components/background/FloatingPetals.jsx'
import PointsBadge from './components/PointsBadge.jsx'

import Footer from './components/sections/Footer.jsx'
import GallerySection from './components/sections/GallerySection.jsx'
import Header from './components/sections/Header.jsx'
import LoveLetter from './components/sections/LoveLetter.jsx'
import MiniGamesSection from './components/sections/MiniGamesSection.jsx'
import CheckSection from './components/sections/CheckSection.jsx'
import CountdownSection from './components/sections/CountdownSection.jsx'
import TimelineSection from './components/sections/TimelineSection.jsx'
import ValesSection from './components/sections/ValesSection.jsx'

export default function App() {
  const [vales, setVales] = useState(VALES_INICIALES)
  const [puntos, setPuntos] = useState(() => {
    try {
      const raw = window.localStorage.getItem('sanvalentin:puntos')
      const parsed = Number(raw)
      return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
    } catch {
      return 0
    }
  })

  const [checkActividades, setCheckActividades] = useState(() => {
    try {
      const raw = window.localStorage.getItem('sanvalentin:checkActividadesDoneIds')
      const doneIds = raw ? JSON.parse(raw) : null
      const doneSet = Array.isArray(doneIds) ? new Set(doneIds.filter((id) => Number.isFinite(id))) : null

      if (!doneSet) return CHECK_ACTIVIDADES
      return CHECK_ACTIVIDADES.map((a) => ({ ...a, done: doneSet.has(a.id) }))
    } catch {
      return CHECK_ACTIVIDADES
    }
  })

  const [planes, setPlanes] = useState(() => {
    try {
      const raw = window.localStorage.getItem('sanvalentin:planes')
      const parsed = raw ? JSON.parse(raw) : null
      if (!Array.isArray(parsed)) return PLANES_INICIALES

      const sanitized = parsed
        .filter((p) => p && typeof p === 'object')
        .map((p) => ({
          id: typeof p.id === 'number' ? p.id : null,
          titulo: typeof p.titulo === 'string' ? p.titulo : '',
          fechaISO: typeof p.fechaISO === 'string' ? p.fechaISO : '',
        }))
        .filter((p) => p.id != null && p.titulo && p.fechaISO)

      return sanitized.length ? sanitized : PLANES_INICIALES
    } catch {
      return PLANES_INICIALES
    }
  })

  const lugares = LUGARES_INICIALES

  useEffect(() => {
    try {
      window.localStorage.setItem('sanvalentin:puntos', String(puntos))
    } catch {
      // Ignora si el storage no está disponible.
    }
  }, [puntos])

  useEffect(() => {
    try {
      const doneIds = checkActividades.filter((a) => a.done).map((a) => a.id)
      window.localStorage.setItem('sanvalentin:checkActividadesDoneIds', JSON.stringify(doneIds))
    } catch {
      // Ignora si el storage no está disponible.
    }
  }, [checkActividades])

  useEffect(() => {
    try {
      window.localStorage.setItem('sanvalentin:planes', JSON.stringify(planes))
    } catch {
      // Ignora si el storage no está disponible.
    }
  }, [planes])

  const handleWinGame = () => {
    setPuntos((prev) => prev + 50)
  }

  const canjearVale = (id, costo) => {
    if (puntos < costo) return

    setPuntos((prev) => prev - costo)
    setVales((prev) => prev.map((vale) => (vale.id === id ? { ...vale, canjeado: true } : vale)))
  }

  const toggleCheckActividad = (id) => {
    setCheckActividades((prev) =>
      prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)),
    )
  }

  const addPlan = ({ titulo, fechaISO }) => {
    setPlanes((prev) => {
      const nextId = prev.reduce((max, p) => (typeof p.id === 'number' && p.id > max ? p.id : max), 0) + 1
      return [...prev, { id: nextId, titulo, fechaISO }]
    })
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans relative selection:bg-rose-200 selection:text-slate-900 pb-16 overflow-x-hidden">
      <AnimatedBackground />
      <FloatingPetals />
      <ElegantBokeh />

      <PointsBadge puntos={puntos} />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10 mt-12 md:mt-0">
        <Header />
        <LoveLetter message={CARTA_MENSAJE} />
        <MiniGamesSection
          memoryImages={JUEGO_IMAGENES}
          puzzleImage={PUZZLE_IMAGES}
          quizQuestions={QUIZ_PREGUNTAS}
          onWin={handleWinGame}
        />
        <ValesSection vales={vales} puntos={puntos} onRedeem={canjearVale} />
        <TimelineSection recuerdos={RECUERDOS} />
        <CheckSection activities={checkActividades} onToggle={toggleCheckActividad} />
        <CountdownSection plans={planes} onAddPlan={addPlan} />
        <GallerySection fotos={FOTOS} />
        <Footer />
      </div>
    </div>
  )
}
