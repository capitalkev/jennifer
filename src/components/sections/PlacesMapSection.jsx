import { useEffect, useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value)
}

function toDateLabel(fechaISO) {
  const date = new Date(fechaISO)
  if (!Number.isFinite(date.getTime())) return ''
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)
}

function FlyTo({ center }) {
  const map = useMap()

  useEffect(() => {
    if (!center) return
    map.flyTo(center, Math.max(map.getZoom(), 13), { duration: 0.6 })
  }, [center, map])

  return null
}

export default function PlacesMapSection({ places }) {
  const [selectedId, setSelectedId] = useState(null)

  const pinIcon = useMemo(() => {
    // Pin vectorial (inline SVG) sin assets externos.
    const svg = `
      <svg width="26" height="26" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" fill="rgba(244, 63, 94, 0.95)"/>
        <circle cx="12" cy="10" r="3" fill="rgba(255,255,255,0.95)"/>
      </svg>
    `.trim()

    return L.divIcon({
      className: 'leaflet-love-pin',
      html: svg,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
      popupAnchor: [0, -22],
    })
  }, [])

  const ordered = useMemo(() => {
    const copy = [...places]
    copy.sort((a, b) => {
      const ams = new Date(a.fechaISO).getTime()
      const bms = new Date(b.fechaISO).getTime()
      if (!Number.isFinite(ams) && !Number.isFinite(bms)) return 0
      if (!Number.isFinite(ams)) return 1
      if (!Number.isFinite(bms)) return -1
      return bms - ams
    })
    return copy
  }, [places])

  const selected = selectedId == null ? null : places.find((p) => p.id === selectedId) ?? null

  const mapCenter = useMemo(() => {
    const ref = selected ?? places[0] ?? null
    if (!ref) return [-12.04318, -77.02824]
    return [ref.lat, ref.lng]
  }, [places, selected])

  return (
    <section className="mb-32">
      <div className="flex flex-col items-center justify-center gap-4 mb-20 text-center">
        <span className="text-rose-400 uppercase tracking-[0.2em] font-medium text-xs">Paseos</span>
        <h2 className="text-4xl md:text-5xl font-light text-slate-800 font-serif">Mapa de Lugares</h2>
        <div className="w-16 h-[2px] bg-rose-200 mt-2"></div>
        <p className="text-slate-500 max-w-xl mt-6 font-light">
          Aquí están los lugares que han visitado juntos, guardados como recuerdos.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-serif text-slate-800">Lugares</h3>
            <span className="text-xs font-medium text-slate-600 bg-white/70 px-3 py-1.5 rounded-full border border-slate-200">
              {places.length}
            </span>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {ordered.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left px-3 py-2 rounded-2xl border transition ${
                  selectedId === p.id
                    ? 'bg-rose-50 border-rose-200'
                    : 'bg-white border-slate-200 hover:border-rose-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-base text-slate-800 truncate">{p.nombre}</div>
                    <div className="text-xs text-slate-500 font-light mt-0.5">
                      {toDateLabel(p.fechaISO)}
                      {p.nota ? ` • ${p.nota}` : ''}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-xs text-slate-400 font-light">
            Tip: haz click en un lugar de la lista para centrar el mapa.
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-white overflow-hidden">
          <div className="h-[640px]">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={20}
              />

              <FlyTo center={mapCenter} />

              {places
                .filter((p) => isFiniteNumber(p.lat) && isFiniteNumber(p.lng))
                .map((p) => (
                  <Marker key={p.id} position={[p.lat, p.lng]} icon={pinIcon}>
                    <Popup>
                      <div className="font-serif text-slate-800">{p.nombre}</div>
                      <div className="text-xs text-slate-500">{toDateLabel(p.fechaISO)}</div>
                      {p.nota ? <div className="text-xs text-slate-500 mt-1">{p.nota}</div> : null}
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
