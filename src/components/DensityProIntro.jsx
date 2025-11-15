import React from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

export default function DensityProIntro({ userData, onContinue, onSkip }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full animate-fadeIn">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
              🦴
            </div>
            <div className="inline-block bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 text-sm mb-4">
              RECOMENDACIÓN ESPECIAL
            </div>
            <h2 className="text-3xl font-bold mb-4">DensityPro™ Activado</h2>
            <p className="text-xl text-gray-300">
              Evaluación Avanzada de Salud Ósea
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">¿Por qué esto es importante para ti?</h3>
                <p className="text-gray-300 mb-3">
                  {userData.name}, basándome en tu perfil (mujer, {userData.age} años), la salud de tus huesos 
                  es un factor crítico para el éxito de tu implante dental.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h4 className="font-bold mb-1">Evaluación Personalizada</h4>
                  <p className="text-sm text-gray-300">
                    5 preguntas adicionales sobre tu salud ósea que pueden aumentar 
                    la precisión de tu evaluación hasta un 15%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h4 className="font-bold mb-1">Protocolo Optimizado</h4>
                  <p className="text-sm text-gray-300">
                    Te diremos si necesitas estudios adicionales (como una densitometría) 
                    y ajustaremos el plan de tratamiento
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏱️</div>
                <div>
                  <h4 className="font-bold mb-1">Solo 1 Minuto Más</h4>
                  <p className="text-sm text-gray-300">
                    Vale la pena para una evaluación más completa y precisa
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-xl">💡</div>
              <div className="text-sm text-gray-300">
                <strong className="text-white">Dato científico:</strong> Las mujeres después de la menopausia 
                pierden hasta un 20% de densidad ósea en los primeros 5 años. Esto afecta directamente 
                la osteointegración del implante.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Sí, quiero la evaluación completa
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={onSkip}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium py-4 rounded-xl transition-all"
            >
              Omitir (continuar sin DensityPro)
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            Recomendamos completar DensityPro para obtener la evaluación más precisa
          </p>
        </div>
      </div>
    </div>
  );
}
