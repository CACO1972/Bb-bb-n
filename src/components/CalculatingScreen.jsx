import React, { useState, useEffect } from 'react';
import { Brain, Activity } from 'lucide-react';

export default function CalculatingScreen({ userData }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { text: 'Analizando tus respuestas...', emoji: '📊', duration: 800 },
    { text: 'Calculando factores de riesgo...', emoji: '🔬', duration: 700 },
    { text: 'Evaluando interacciones sinérgicas...', emoji: '🧬', duration: 600 },
    { text: 'Comparando con 17,025 casos...', emoji: '📈', duration: 700 },
    { text: 'Generando recomendaciones personalizadas...', emoji: '💡', duration: 600 },
    { text: 'Finalizando tu reporte...', emoji: '✨', duration: 500 }
  ];

  useEffect(() => {
    const stepDuration = 3500 / steps.length;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / steps.length);
        return newProgress > 100 ? 100 : newProgress;
      });
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-fadeIn">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8">
          {/* AI Brain Animation */}
          <div className="text-center mb-8">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center">
                <Brain className="w-16 h-16 text-purple-400 animate-bounce" />
              </div>
              {/* Orbiting particles */}
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
              <div className="absolute top-1/4 right-0 w-2 h-2 bg-cyan-400 rounded-full animate-spin" style={{ animationDuration: '2.5s' }}></div>
            </div>

            <h2 className="text-3xl font-bold mb-2">
              Río está analizando tu caso, {userData.name}
            </h2>
            <p className="text-gray-300">
              Procesando con inteligencia artificial avanzada
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-sm text-purple-400 font-bold">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl animate-bounce">
                {steps[currentStep].emoji}
              </div>
              <div className="flex-1">
                <div className="font-medium text-lg">
                  {steps[currentStep].text}
                </div>
              </div>
              <Activity className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>

          {/* Steps Checklist */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {index < currentStep ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ) : index === currentStep ? (
                  <div className="w-6 h-6 border-2 border-purple-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-white/20 rounded-full flex-shrink-0"></div>
                )}
                <span className={`text-sm ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-xl">💡</div>
              <div className="text-sm text-gray-300">
                <strong className="text-white">¿Sabías que?</strong> Los implantes dentales tienen una tasa 
                de éxito promedio del 96.4% cuando se realiza una evaluación adecuada del paciente. 
                ¡Estás dando el primer paso correcto!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
