import ElegantLotus from './ElegantLotus.jsx'

export default function Header() {
  return (
    <header className="text-center mb-28 space-y-6 flex flex-col items-center">
      <div className="mb-6">
        <ElegantLotus />
      </div>
      <h1 className="text-5xl md:text-7xl font-light tracking-wide text-slate-800 drop-shadow-sm font-serif">
        Para ti, mi amorcito
      </h1>
      <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto tracking-wide">
        Feliz dia amorcito, no solo hoy sino todos los dias, gracias por ser mi compañera de vida, por hacerme reir, por apoyarme en mis locuras y por ser la persona maravillosa que eres.
      </p>
    </header>
  )
}
