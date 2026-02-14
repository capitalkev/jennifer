import { useState } from 'react'
import { Check, HelpCircle, RefreshCw, X } from 'lucide-react'

export default function LoveQuiz({ questions, onWin }) {
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('The "questions" prop must be a non-empty array.');
  }

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(index)
    const isCorrect = index === questions[currentQuestion].respuestaCorrecta
    const nextScore = score + (isCorrect ? 1 : 0)
    if (isCorrect) setScore(nextScore)

    setTimeout(() => {
      setIsAnimating(true)
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion((prev) => prev + 1)
          setSelectedAnswer(null)
        } else {
          setShowResult(true)
          if (nextScore > 0) onWin(nextScore * 50)
        }
        setIsAnimating(false)
      }, 300)
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  if (showResult) {
    return (
      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.05)] border border-white max-w-2xl mx-auto relative overflow-hidden text-center animate-in fade-in duration-700 mt-8">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-10 h-10 text-rose-500" />
        </div>
        <h3 className="text-3xl font-serif text-slate-800 mb-4">
          {score === questions.length ? '¡Puntaje Perfecto!' : '¡Buen intento, mi amor!'}
        </h3>
        <p className="text-slate-600 mb-8 text-lg font-light">
          Acertaste <strong className="text-rose-500">{score}</strong> de {questions.length} preguntas.
          <br />
          Has ganado <strong className="text-rose-500">{score * 50} Puntos</strong> extra.
        </p>
        <button
          onClick={resetQuiz}
          className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg active:scale-95 mx-auto flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" /> Volver a jugar
        </button>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.05)] border border-white max-w-2xl mx-auto relative overflow-hidden mt-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-serif text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-rose-400" /> ¿Cuánto nos conocemos?
        </h3>
        <span className="text-sm font-medium text-rose-400 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">
          Pregunta {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <h4 className="text-2xl text-slate-800 font-serif mb-8 text-center leading-relaxed">{question.pregunta}</h4>

        <div className="space-y-4">
          {question.opciones.map((opcion, index) => {
            let buttonClass =
              'bg-white border-rose-100 text-slate-700 hover:bg-rose-50 hover:border-rose-300'
            let Icon = null

            if (selectedAnswer !== null) {
              if (index === question.respuestaCorrecta) {
                buttonClass = 'bg-green-50 border-green-400 text-green-800 shadow-inner'
                Icon = Check
              } else if (index === selectedAnswer) {
                buttonClass = 'bg-red-50 border-red-400 text-red-800 shadow-inner'
                Icon = X
              } else {
                buttonClass = 'bg-white border-slate-100 text-slate-400 opacity-50'
              }
            }

            return (
              <button
                key={index}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-300 flex items-center justify-between font-medium ${buttonClass} ${
                  selectedAnswer === null ? 'active:scale-[0.98] shadow-sm' : ''
                }`}
              >
                <span className="text-lg">{opcion}</span>
                {Icon && <Icon className="w-6 h-6" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
