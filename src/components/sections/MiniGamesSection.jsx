/* src/components/sections/MiniGamesSection.jsx */
import { useState } from 'react'
import MemoryGame from '../games/MemoryGame.jsx'
import LoveQuiz from '../games/LoveQuiz.jsx'
import PuzzleGame from "../games/PuzzleGame.jsx"
import { JUEGO_IMAGENES, QUIZ_PREGUNTAS, PUZZLE_IMAGES } from '../../data/sanvalentinData.js'

const MiniGamesSection = ({ onWin }) => {
    const [gameState, setGameState] = useState('memory')

    const handleGameChange = (game) => {
        setGameState(game)
    }

    return (
        <section className="mb-20">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['memory', 'love', 'puzzle'].map((game) => (
                    <button
                        key={game}
                        onClick={() => handleGameChange(game)}
                        className={`px-6 py-2 rounded-full font-serif transition-all ${
                            gameState === game 
                            ? 'bg-rose-400 text-white shadow-lg scale-105' 
                            : 'bg-white text-slate-500 hover:bg-rose-50 border border-rose-100'
                        }`}
                    >
                        {game === 'memory' && 'Memoria'}
                        {game === 'love' && 'Quiz'}
                        {game === 'puzzle' && 'Puzzle'}
                    </button>
                ))}
            </div>

            <div className="min-h-[500px]">
                {gameState === 'memory' && (
                    <MemoryGame images={JUEGO_IMAGENES} onWin={onWin} />
                )}
                {gameState === 'love' && (
                    <LoveQuiz questions={QUIZ_PREGUNTAS} onWin={onWin} />
                )}
                {/* CAMBIO AQUÍ: Pasamos el array de imágenes importado de la data */}
                {gameState === 'puzzle' && (
                    <PuzzleGame images={PUZZLE_IMAGES} onWin={onWin} />
                )}
            </div>
        </section>
    )
}

export default MiniGamesSection