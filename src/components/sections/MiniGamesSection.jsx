import { useState } from 'react'
import MemoryGame from '../games/MemoryGame.jsx'
import LoveQuiz from '../games/LoveQuiz.jsx'
import PuzzleGame from "../games/PuzzleGame.jsx"
import { JUEGO_IMAGENES, QUIZ_PREGUNTAS } from '../../data/sanvalentinData'

const MiniGamesSection = ({ image }) => {
    const [gameState, setGameState] = useState('memory')

    const handleGameChange = (game) => {
        setGameState(game)
    }

    return (
        <section>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => handleGameChange('memory')}>Memory Game</button>
                <button onClick={() => handleGameChange('love')}>Love Quiz</button>
                <button onClick={() => handleGameChange('puzzle')}>Puzzle Game</button>
            </div>

            <div>
                {gameState === 'memory' && <MemoryGame images={JUEGO_IMAGENES} onWin={() => alert('You won the Memory Game!')} />}
                {gameState === 'love' && <LoveQuiz questions={QUIZ_PREGUNTAS} onWin={() => alert('You completed the Love Quiz!')} />}
                {gameState === 'puzzle' && <PuzzleGame image={image} />}
            </div>
        </section>
    )
}

export default MiniGamesSection
