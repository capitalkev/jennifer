import {
  Gift,
  HeartHandshake,
  Map,
  Sparkles,
  Star,
  Ticket,
  Utensils,
} from 'lucide-react'

export const CARTA_MENSAJE =
  'Mi amor, feliz San Valentín. Así como la flor de loto nace y se mantiene inmaculada, mi amor por ti es puro y sincero. Gracias por ser mi compañera de vida, por compartir risas, sueños y momentos inolvidables. Eres mi inspiración diaria y mi refugio seguro. Te amo más de lo que las palabras pueden expresar, y estoy emocionado por seguir construyendo nuestra historia juntos. Con todo mi amor, tu caballito de mar.'

export const RECUERDOS = [
  {
    id: 1,
    fecha: '12 de julio de 2019',
    titulo: 'Nuestro primer hola',
    descripcion:
      'Aunque ya estabamos en el mismo salon y te hablabas con mis compañeros, ese dia decidi romper la punta de mi lapiz para que me puedas prestar tu tajador, y asi poder hablar contigo por primera vez. La mejor decision de mi vida.',
    Icon: Star,
  },
  {
    id: 2,
    fecha: 'Aventuras juntos',
    titulo: 'Descubriendo el mundo',
    descripcion:
      'Cada viaje, cada caminata y cada lugar nuevo que exploramos juntos se convierte en mi lugar favorito si estoy de tu mano.',
    Icon: Map,
  },
  {
    id: 3,
    fecha: 'Hoy y siempre',
    titulo: 'Un amor que florece',
    descripcion:
      'Cada día a tu lado es una oportunidad para seguir creciendo juntos. Mi mayor proyecto de vida es hacerte feliz.',
    Icon: HeartHandshake,
  },
]

export const FOTOS = [
  {
    id: 1,
    url: '/imagen1.jpg',
    caption: 'Nuestro primer San Valentín',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 2,
    url: '/imagen2.jpg',
    caption: 'Paz a tu lado',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 3,
    url: '/imagen3.jpg',
    caption: 'Cenas inolvidables',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 4,
    url: '/imagen4.jpg',
    caption: 'Risas que curan el alma',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 5,
    url: '/imagen5.jpg',
    caption: 'Nuestras escapadas',
    span: 'md:col-span-2 md:row-span-1',
  },
]

export const VALES_INICIALES = [
  {
    id: 1,
    titulo: 'Cocinarte una cena',
    descripcion: 'Válido por una cena casera preparada por mí. ¡Tú eliges el platillo!',
    Icon: Utensils,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 500,
    canjeado: false,
  },
  {
    id: 2,
    titulo: 'Masaje Relajante',
    descripcion:
      'Válido por 30 minutos de masajes. Ideal para relajarte después de un largo día.',
    Icon: Sparkles,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 250,
    canjeado: false,
  },
  {
    id: 3,
    titulo: 'Día a tu manera',
    descripcion: 'Tú decides qué hacemos todo el día de hoy. Sin quejas, soy todo/a tuyo.',
    Icon: Gift,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 400,
    canjeado: false,
  },
  {
    id: 4,
    titulo: 'Cita Sorpresa',
    descripcion:
      'Válido por una salida sorpresa organizada completamente por mí. ¡Solo arréglate y disfruta!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 500,
    canjeado: false,
  },
  {
    id: 5,
    titulo: 'Darte Cariñito',
    descripcion:
      'Válido por un momento de cariño y afecto. ¡Solo relájate y disfruta!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 800,
    canjeado: false,
  },
  {
    id: 6,
    titulo: 'Ver tu película favorita juntos',
    descripcion:
      'Válido por una sesión de cine en casa con tu película favorita. ¡Prepara las palomitas!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 300,
    canjeado: false,
  },
  {
    id: 7,
    titulo: 'Ir al cine todo pagado',
    descripcion:
      'Válido por una salida al cine con todos los gastos cubiertos por mí. ¡Disfruta de la película!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 300,
    canjeado: false,
  },
  {
    id: 8,
    titulo: 'Regalarte flores',
    descripcion:
      'Válido por un ramo de flores sorpresa entregado por mí. ¡Costo de 80 soles!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 10000,
    canjeado: false,
  },
  {
    id: 9,
    titulo: 'Prepararte tu desayuno favorito',
    descripcion:
      'Válido por un desayuno sorpresa preparado por mí. ¡Disfruta de una mañana deliciosa!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 100,
    canjeado: false,
  },
  {
    id: 10,
    titulo: 'Almuerzo para tu familia',
    descripcion:
      'Válido por un almuerzo sorpresa preparado por mí para tu familia. ¡Disfruten juntos!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 500,
    canjeado: false,
  },
  {
    id: 11,
    titulo: 'Regalarate el libro que quieres',
    descripcion:
      'Válido por un libro sorpresa elegido por ti. ¡Disfruta de tu lectura!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 100,
    canjeado: false,
  },
  {
    id: 12,
    titulo: 'Ver Cdramas juntos',
    descripcion:
      'Válido por una sesión de Cdramas juntos. Mientras te doy besitos.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 100,
    canjeado: false,
  },
  {
    id: 13,
    titulo: 'Carita de besos',
    descripcion:
      'Válido por una carita de besos. Te llenare la carita de mis besitos',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 100,
    canjeado: false,
  },
  {
    id: 14,
    titulo: 'Comprate ropa',
    descripcion:
      'Válido por una salida de compras sorpresa organizada completamente por mí. Un aufit nuevo para ti.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 1000,
    canjeado: false,
  },
  {
    id: 15,
    titulo: 'Dormir juntitos',
    descripcion:
      'Valido para una noche juntos donde te abrazare toda la noche para que duermas calentita y segura.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 650,
    canjeado: false,
  },
  {
    id: 16,
    titulo: 'Comprar lo que desees, costo maximo 100 soles',
    descripcion:
      'Válido para una gitcard sorpresa de una tienda que te guste. ¡Disfruta eligiendo tu regalo!',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 500,
    canjeado: false,
  },
  {
    id: 17,
    titulo: 'Comprar lo que desees, costo maximo 200 soles',
    descripcion:
      'Válido por una gitcard sorpresa de una tienda que te guste. Comprate algo bonito para ti, te lo mereces.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 1000,
    canjeado: false,
  },
  {
    id: 18,
    titulo: 'Masaje en los piecitos',
    descripcion:
      'Válido por un masaje relajante en los pies. Perfecto para aliviar el estrés y mimarte un poco.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 100,
    canjeado: false,
  },
  {
    id: 19,
    titulo: 'Ayudarte en lo que necesites',
    descripcion:
      'Válido por cualquier ayuda que necesites. Estoy aquí para apoyarte en lo que sea.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 0,
    canjeado: false,
  },
  {
    id: 20,
    titulo: 'Bailarte una canción',
    descripcion:
      'Válido por una canción dedicada y bailada especialmente para ti. Con anticipacion para prepararme y hacerte un show inolvidable.',
    Icon: Ticket,
    iconClassName: 'w-6 h-6 text-rose-400',
    costo: 300,
    canjeado: false,
  },
]

export const JUEGO_IMAGENES = [
    '/imagen1.jpg',
    '/imagen2.jpg',
    '/imagen3.jpg',
    '/imagen4.jpg',
    '/imagen5.jpg',
    '/imagen6.jpg',
]

export const PUZZLE_IMAGE = '/ciervo.jpg'

export const CHECK_ACTIVIDADES = [
  { id: 1, titulo: 'Ir al zoológico', done: false },
  { id: 2, titulo: 'Hacer un picnic', done: false },
  { id: 3, titulo: 'Ver el atardecer juntos', done: true },
  { id: 4, titulo: 'Cocinar una receta nueva', done: false },
  { id: 5, titulo: 'Ir a un museo', done: false },
  { id: 6, titulo: 'Noche de películas (maratón)', done: true },
  { id: 7, titulo: 'Viaje improvisado de un día', done: false },
  { id: 8, titulo: 'Ir a un concierto', done: false },
  { id: 9, titulo: 'Tomarnos una foto en un lugar bonito', done: true },
  { id: 10, titulo: 'Escribirnos una carta', done: false },
  { id: 11, titulo: 'Cita sorpresa', done: false },
  { id: 12, titulo: 'Ir por un postre juntos', done: true },
]

export const PLANES_INICIALES = [
  {
    id: 1,
    titulo: 'Cuenta regresiva de ejemplo',
    fechaISO: '2026-02-17T00:00',
  },
  {
    id: 2,
    titulo: 'Ir a ver una película (noviembre)',
    fechaISO: '2026-11-01T19:00',
  },
]

export const LUGARES_INICIALES = [
  {
    id: 1,
    nombre: 'Zócalo (ejemplo)',
    nota: 'Un paseo bonito para empezar el mapa.',
    fechaISO: '2026-02-01T18:00',
    lat: -12.04318,
    lng: -77.02824,
  },
]

export const QUIZ_PREGUNTAS = [
  {
    pregunta: '¿Qué detalle tuyo me cautivó por completo desde el primer día?',
    opciones: ['Tu forma de reír', 'Tus ojos hermosos', 'Tu inteligencia', 'Absolutamente todo'],
    respuestaCorrecta: 3,
  },
  {
    pregunta:
      "Como mi nutricionista favorita... ¿Cuál es el 'gustito culposo' que más me cuesta dejar?",
    opciones: ['El helado a medianoche', 'La pizza de los fines de semana', 'El exceso de café', 'Los postres dulces'],
    respuestaCorrecta: 1,
  },
  {
    pregunta: '¿Cuál dirías que es mi momento favorito del día cuando estamos juntos?',
    opciones: ['Al despertar a tu lado', 'A la hora de cenar', 'Viendo películas abrazados', 'Cualquier instante si es contigo'],
    respuestaCorrecta: 3,
  },
]
