import React, { useState, useEffect } from 'react';
import './PuzzleGame.css';

const PuzzleGame = ({ image }) => {
  const gridSize = 4;
  const [pieces, setPieces] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);

  useEffect(() => {
    const shuffledPieces = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        shuffledPieces.push({
          id: `${row}-${col}`,
          row,
          col,
          currentRow: Math.floor(Math.random() * gridSize),
          currentCol: Math.floor(Math.random() * gridSize),
        });
      }
    }
    setPieces(shuffledPieces);
  }, []);

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece);
  };

  const handleDrop = (e, targetPiece) => {
    e.preventDefault();
    if (draggedPiece) {
      const updatedPieces = pieces.map((p) => {
        if (p.id === draggedPiece.id) {
          return { ...p, currentRow: targetPiece.row, currentCol: targetPiece.col };
        } else if (p.id === targetPiece.id) {
          return { ...p, currentRow: draggedPiece.row, currentCol: draggedPiece.col };
        }
        return p;
      });
      setPieces(updatedPieces);
      setDraggedPiece(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const isPieceInCorrectPosition = (piece) => {
    return piece.row === piece.currentRow && piece.col === piece.currentCol;
  };

  return (
    <div className="puzzle-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`puzzle-piece ${isPieceInCorrectPosition(piece) ? 'correct' : ''}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `${-piece.row * 100}px ${-piece.col * 100}px`,
            gridRow: piece.currentRow + 1,
            gridColumn: piece.currentCol + 1,
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, piece)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, piece)}
        ></div>
      ))}
    </div>
  );
};

export default PuzzleGame;