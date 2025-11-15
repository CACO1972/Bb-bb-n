import React from 'react';
import { Heart, Brain, Calculator, MapPin, DollarSign, Users } from 'lucide-react';

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fadeIn">
      <div className="max-w-4xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-3">ImplantX™</h1>
            <p className="text-xl opacity-90">Tu Evaluación Inteligente de Implantes Dentales</p>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                🦷
              </div>
              <h2 className="text-3xl font-bold mb-4">¡Hola! Soy Río, tu asistente dental con IA</h2>
              <p className="text-xl text-gray-300 mb-6">
                En solo 3 minutos, te daré una evaluación personalizada con:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">📊</div>
                <div className="font-bold mb-2">Tu Probabilidad de Éxito</div>
                <div className="text-sm text-gray-400">Basada en 17,025 casos reales</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">💰</div>
                <div className="font-bold mb-2">Costo Estimado</div>
                <div className="text-sm text-gray-400">Personalizado para tu caso</div>
              </div>
              <div className="bg-white/5 rounded-xl p-6 text-center transform hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">👨‍⚕️</div>
                <div className="font-bold mb-2">Especialistas Ideales</div>
                <div className="text-sm text-gray-400">Cerca de ti, según tu caso</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 mb-6 border border-purple-500/20">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔬</div>
                <div>
                  <h3 className="font-bold mb-2">Respaldado por Ciencia</h3>
                  <p className="text-sm text-gray-300">
                    Nuestro algoritmo está basado en estudios clínicos publicados y datos de más de 17,000 implantes. 
                    Te daremos una evaluación honesta y precisa.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">✓</div>
                <span>100% confidencial y seguro</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">✓</div>
                <span>Sin compromiso, solo información</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">✓</div>
                <span>Resultados instantáneos y detallados</span>
              </div>
            </div>

            <button
              onClick={onStart}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-5 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
            >
              Comenzar Evaluación →
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              ⏱️ Tiempo estimado: 3 minutos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
