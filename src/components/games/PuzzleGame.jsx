import { useState, useEffect } from 'react'
import { RefreshCw, CheckCircle2, Puzzle, RotateCcw, Image as ImageIcon, Grid3X3 } from 'lucide-react'
import './PuzzleGame.css'

export default function PuzzleGame({ images, onWin }) {
  const [difficulty, setDifficulty] = useState(3) // 3x3, 4x4, 5x5
  const [currentImage, setCurrentImage] = useState(images[0].src)
  
  const [availablePieces, setAvailablePieces] = useState([])
  const [board, setBoard] = useState([])
  const [isWon, setIsWon] = useState(false)
  const [draggingId, setDraggingId] = useState(null)

  // Tamaño de la pieza en píxeles
  const PIECE_SIZE = 90

  useEffect(() => {
    startNewGame()
  }, [difficulty, currentImage])

  const startNewGame = () => {
    const totalPieces = difficulty * difficulty
    const newBoard = Array(totalPieces).fill(null)
    const pieces = []

    for (let row = 0; row < difficulty; row++) {
      for (let col = 0; col < difficulty; col++) {
        pieces.push({
          id: `piece-${row}-${col}`,
          correctRow: row,
          correctCol: col,
        })
      }
    }

    const shuffled = [...pieces].sort(() => Math.random() - 0.5)
    setAvailablePieces(shuffled)
    setBoard(newBoard)
    setIsWon(false)
    setDraggingId(null)
  }

  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData('pieceId', piece.id)
    e.dataTransfer.effectAllowed = "move"
    setTimeout(() => setDraggingId(piece.id), 0)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDropOnBoard = (e, targetIndex) => {
    e.preventDefault()
    if (board[targetIndex]) return 

    const droppedPieceId = e.dataTransfer.getData('pieceId')
    const pieceInBank = availablePieces.find(p => p.id === droppedPieceId)
    
    if (pieceInBank) {
        setAvailablePieces(prev => prev.filter(p => p.id !== droppedPieceId))
        setBoard(prev => {
            const newBoard = [...prev]
            newBoard[targetIndex] = pieceInBank
            checkWin(newBoard)
            return newBoard
        })
    } else {
        const oldIndex = board.findIndex(p => p && p.id === droppedPieceId)
        if (oldIndex !== -1) {
            const pieceToMove = board[oldIndex]
            setBoard(prev => {
                const newBoard = [...prev]
                newBoard[oldIndex] = null 
                newBoard[targetIndex] = pieceToMove 
                checkWin(newBoard)
                return newBoard
            })
        }
    }
  }

  const handleDropOnBank = (e) => {
    e.preventDefault()
    const droppedPieceId = e.dataTransfer.getData('pieceId')
    const oldIndex = board.findIndex(p => p && p.id === droppedPieceId)
    
    if (oldIndex !== -1) {
        const pieceToMove = board[oldIndex]
        setBoard(prev => {
            const newBoard = [...prev]
            newBoard[oldIndex] = null
            return newBoard
        })
        setAvailablePieces(prev => [...prev, pieceToMove])
    }
  }

  const checkWin = (currentBoard) => {
    const isCorrect = currentBoard.every((piece, index) => {
      if (!piece) return false 
      const targetRow = Math.floor(index / difficulty)
      const targetCol = index % difficulty
      return piece.correctRow === targetRow && piece.correctCol === targetCol
    })

    if (isCorrect) {
      setIsWon(true)
      if (onWin) onWin() 
    }
  }

  const puzzleStyleVars = {
    '--grid-size': difficulty,
    '--piece-size': `${PIECE_SIZE}px`
  }

  return (
    <div className={`flex flex-col items-center ${isWon ? 'game-won' : ''}`} style={puzzleStyleVars}>
      
      <div className="game-controls">
        <div className="control-group">
          <label className="control-label flex items-center gap-1"><Grid3X3 className="w-3 h-3"/> Dificultad</label>
          <select 
            className="control-select"
            value={difficulty} 
            onChange={(e) => setDifficulty(Number(e.target.value))}
            disabled={isWon && availablePieces.length === 0}
          >
            <option value={3}>Fácil (3x3)</option>
            <option value={4}>Intermedio (4x4)</option>
            <option value={5}>Difícil (5x5)</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Imagen</label>
          <select 
            className="control-select"
            value={currentImage} 
            onChange={(e) => setCurrentImage(e.target.value)}
          >
            {images.map((img) => (
              <option key={img.id} value={img.src}>{img.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
            <button
                onClick={startNewGame}
                className="bg-rose-100 hover:bg-rose-200 text-rose-600 p-2.5 rounded-lg transition-colors"
                title="Reiniciar"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
        </div>
      </div>

      {isWon && (
        <div className="mb-6 bg-green-100 text-green-700 px-8 py-4 rounded-xl flex items-center gap-3 animate-bounce font-serif text-lg border border-green-200 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
          <span>¡Lo lograste! Eres increíble ❤️</span>
        </div>
      )}

      <div className="game-area-container">
        <div className="board-section">
          <h4 className="text-rose-500 font-serif font-medium mb-3 flex items-center gap-2">
            <Puzzle className="w-5 h-5"/> Arma aquí
          </h4>
          
          <div className={`puzzle-board-frame ${isWon ? 'is-won' : ''}`}>
            <div className="puzzle-board-grid">
              {board.map((piece, index) => (
                <div
                  key={index}
                  className="board-slot-target"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropOnBoard(e, index)}
                >
                  {piece && (
                    <div
                      className={`puzzle-piece placed-piece ${draggingId === piece.id ? 'is-being-dragged' : ''}`}
                      draggable={!isWon}
                      onDragStart={(e) => handleDragStart(e, piece)}
                      onDragEnd={handleDragEnd}
                      style={{
                        backgroundImage: `url(${currentImage})`,
                        backgroundPosition: `${-piece.correctCol * PIECE_SIZE}px ${-piece.correctRow * PIECE_SIZE}px`,
                        /* CORRECCIÓN DE IMAGEN: */
                        backgroundSize: `${difficulty * PIECE_SIZE}px ${difficulty * PIECE_SIZE}px`,
                        backgroundRepeat: 'no-repeat'
                      }}
                    />
                  )}
                  {!piece && !isWon && <div className="slot-guide">+</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pieces-section">
          <h4 className="text-slate-500 font-serif font-medium mb-3 flex items-center gap-2">
             Piezas <span className="text-xs text-slate-300 font-normal">(Arrastra aquí para sacar)</span>
          </h4>
          
          <div 
            className="pieces-bank-container"
            onDragOver={handleDragOver}
            onDrop={handleDropOnBank}
          >
            {availablePieces.map((piece) => (
              <div
                key={piece.id}
                className={`puzzle-piece draggable-piece ${draggingId === piece.id ? 'is-being-dragged' : ''}`}
                draggable={!isWon}
                onDragStart={(e) => handleDragStart(e, piece)}
                onDragEnd={handleDragEnd}
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundPosition: `${-piece.correctCol * PIECE_SIZE}px ${-piece.correctRow * PIECE_SIZE}px`,
                  /* CORRECCIÓN DE IMAGEN: */
                  backgroundSize: `${difficulty * PIECE_SIZE}px ${difficulty * PIECE_SIZE}px`,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            ))}
            
            {availablePieces.length === 0 && !isWon && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-slate-300 text-sm italic">¡Casi listo!</span>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}