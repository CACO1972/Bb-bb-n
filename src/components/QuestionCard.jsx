import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export default function QuestionCard({ question, onAnswer, currentQuestion, totalQuestions }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleSelect = (value) => {
    setSelectedOption(value);
    // Small delay before moving to next question for better UX
    setTimeout(() => {
      onAnswer(value);
      setSelectedOption(null);
    }, 200);
  };

  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Pregunta {currentQuestion + 1} de {totalQuestions}</span>
            <span className="text-purple-400 font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 animate-fadeIn">
          {/* Category Badge */}
          <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-1 text-sm mb-4">
            {question.title}
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {question.question}
          </h2>

          {/* Info Toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{showInfo ? 'Ocultar' : 'Ver'} información adicional</span>
          </button>

          {/* Info Panel */}
          {showInfo && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0">💡</div>
                <div className="text-sm text-gray-300">
                  {question.info}
                </div>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                  selectedOption === option.value
                    ? 'border-purple-500 bg-purple-500/20 scale-[1.02]'
                    : 'border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{option.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-lg">{option.label}</div>
                  </div>
                  {selectedOption === option.value && (
                    <div className="text-purple-400 animate-fadeIn">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Helper Text */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Selecciona la opción que mejor describa tu situación
          </div>
        </div>
      </div>
    </div>
  );
}
