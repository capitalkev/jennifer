import { useState } from 'react'
import { Gift, Heart, RefreshCw } from 'lucide-react'

export default function MemoryGame({ images, onWin }) {
  const createDeck = () =>
    [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((imageUrl, index) => ({
        id: index,
        imageUrl,
        isFlipped: false,
        isMatched: false,
      }))

  const [cards, setCards] = useState(() => createDeck())
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  const initializeGame = () => {
    setCards(createDeck())
    setFlippedIndices([])
    setMatchedPairs(0)
    setIsWon(false)
    setIsLocked(false)
  }

  const handleCardClick = (index) => {
    if (isLocked || cards[index]?.isFlipped || cards[index]?.isMatched) return

    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)

    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)

    if (newFlippedIndices.length === 2) {
      setIsLocked(true)
      const [firstIndex, secondIndex] = newFlippedIndices

      if (newCards[firstIndex].imageUrl === newCards[secondIndex].imageUrl) {
        setTimeout(() => {
          const matchedCards = [...newCards]
          matchedCards[firstIndex].isMatched = true
          matchedCards[secondIndex].isMatched = true
          setCards(matchedCards)
          setFlippedIndices([])
          setIsLocked(false)

          const nextMatchedPairs = matchedPairs + 1
          setMatchedPairs(nextMatchedPairs)

          if (nextMatchedPairs === images.length) {
            setIsWon(true)
            onWin(100)
          }
        }, 500)
      } else {
        setTimeout(() => {
          const resetCards = [...newCards]
          resetCards[firstIndex].isFlipped = false
          resetCards[secondIndex].isFlipped = false
          setCards(resetCards)
          setFlippedIndices([])
          setIsLocked(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.05)] border border-white max-w-2xl mx-auto relative overflow-hidden">
      {isWon ? (
        <div className="text-center py-12 px-4 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-rose-500 animate-bounce" />
          </div>
          <h3 className="text-3xl font-serif text-slate-800 mb-4">¡Felicidades mi amor!</h3>
          <p className="text-slate-600 mb-8 text-lg font-light">
            Has encontrado todas las parejas y has ganado{' '}
            <span className="font-bold text-rose-500">100 Puntos de Amor</span>.
          </p>
          <button
            onClick={initializeGame}
            className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" /> Jugar de nuevo
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-serif text-slate-800">Encuentra las parejas</h3>
            <span className="text-sm font-medium text-rose-400 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              {matchedPairs} / {images.length} Encontradas
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-xl transition-all duration-300 transform perspective-1000 flex items-center justify-center border-2 overflow-hidden ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white border-rose-200 rotate-y-180 shadow-inner'
                    : 'bg-rose-50 border-rose-100 hover:bg-rose-100 hover:-translate-y-1 hover:shadow-md'
                } ${card.isMatched ? 'opacity-50 grayscale' : ''}`}
              >
                <div
                  className={`transition-all duration-300 w-full h-full p-1 ${
                    card.isFlipped || card.isMatched ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'
                  }`}
                >
                  <img src={card.imageUrl} alt="Recuerdo" className="w-full h-full object-cover rounded-lg" />
                </div>
                {!(card.isFlipped || card.isMatched) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-200 opacity-50" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
