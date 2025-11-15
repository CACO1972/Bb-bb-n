import React, { useState } from 'react';
import { Download, Share2, ChevronRight, CheckCircle, AlertCircle, DollarSign, Clock, TrendingUp, Award, Calendar } from 'lucide-react';
import SpecialistCard from './SpecialistCard';
import { formatCurrency } from './implantx-utils';

export default function ResultsScreen({ results, userData, onRestart, onSelectSpecialist }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const handleSelectSpecialist = (specialist) => {
    setSelectedSpecialist(specialist.id === selectedSpecialist?.id ? null : specialist);
    if (onSelectSpecialist) {
      onSelectSpecialist(specialist);
    }
  };

  const handleDownload = () => {
    alert('Función de descarga de PDF en desarrollo');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mi Evaluación ImplantX',
        text: `Mi probabilidad de éxito con implantes dentales es de ${results.probabilityPercent}%`,
        url: window.location.href
      });
    } else {
      alert('Compartir no está disponible en este navegador');
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-1 mb-4">
            <div className="bg-slate-900 rounded-full px-6 py-2">
              <span className="text-sm font-bold">REPORTE COMPLETO</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {userData.name}, aquí está tu evaluación
          </h1>
          <p className="text-xl text-gray-300">
            Análisis personalizado basado en tus respuestas
          </p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 mb-6 animate-fadeIn">
          <div className="text-center mb-6">
            <div className={`inline-block text-7xl md:text-8xl font-black mb-4 bg-gradient-to-r ${results.riskLevel.color} bg-clip-text text-transparent`}>
              {results.probabilityPercent}%
            </div>
            <div className="text-2xl mb-2">Probabilidad de Éxito</div>
            <div className="text-gray-400 text-sm">
              Intervalo de confianza: {(results.ciLower * 100).toFixed(1)}% - {(results.ciUpper * 100).toFixed(1)}%
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className={`bg-gradient-to-r ${results.riskLevel.color} rounded-2xl p-6 text-center mb-6`}>
            <div className="text-5xl mb-2">{results.riskLevel.emoji}</div>
            <div className="text-2xl font-bold mb-2">{results.riskLevel.level}</div>
            <div className="text-lg mb-2">{results.riskLevel.message}</div>
            <div className="text-sm opacity-90">{results.riskLevel.description}</div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold">{formatCurrency(results.estimatedCost.average)}</div>
              <div className="text-sm text-gray-400">Costo estimado</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold">{results.timeline.estimate}</div>
              <div className="text-sm text-gray-400">Tiempo total</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold">{results.specialists.length}</div>
              <div className="text-sm text-gray-400">Especialistas compatibles</div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-2 mb-6 flex gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Resumen', icon: TrendingUp },
            { id: 'recommendations', label: 'Recomendaciones', icon: CheckCircle },
            { id: 'costs', label: 'Costos', icon: DollarSign },
            { id: 'timeline', label: 'Cronograma', icon: Calendar },
            { id: 'specialists', label: 'Especialistas', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  Resumen de tu Evaluación
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">📊</div>
                      <div>
                        <h3 className="font-bold mb-2">Tu Perfil de Riesgo</h3>
                        <p className="text-gray-300 text-sm">
                          Basado en el análisis de tus 9 factores de salud, tu probabilidad de éxito es de <strong>{results.probabilityPercent}%</strong>.
                          Esto te coloca en la categoría <strong>{results.riskLevel.level}</strong>.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <h3 className="font-bold mb-2">Próximos Pasos</h3>
                        <p className="text-gray-300 text-sm mb-2">
                          Hemos identificado {results.recommendations.length} acción(es) para optimizar tu tratamiento:
                        </p>
                        <ul className="space-y-1 text-sm text-gray-300">
                          {results.recommendations.slice(0, 3).map((rec, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="text-purple-400">•</span>
                              {rec.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <h3 className="font-bold mb-2">¿Qué significa esto?</h3>
                        <p className="text-gray-300 text-sm">
                          {results.probability >= 0.92 ? (
                            'Tu caso es ideal para implantes. Con los cuidados estándar, tienes excelentes posibilidades de éxito a largo plazo.'
                          ) : results.probability >= 0.85 ? (
                            'Eres un buen candidato. Siguiendo las recomendaciones simples que te damos, alcanzarás resultados excelentes.'
                          ) : results.probability >= 0.75 ? (
                            'Tu caso es viable con preparación. Necesitarás algunos tratamientos previos, pero definitivamente puedes lograr el éxito.'
                          ) : (
                            'Tu caso requiere atención especializada. Con el protocolo correcto y el especialista adecuado, podemos lograr resultados satisfactorios.'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-purple-400" />
                Recomendaciones Personalizadas
              </h2>
              
              {results.recommendations.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✨</div>
                  <p className="text-gray-300">¡Excelente! No hay recomendaciones críticas.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`rounded-xl p-5 border-2 ${
                        rec.color === 'red'
                          ? 'bg-red-500/10 border-red-500/30'
                          : rec.color === 'orange'
                          ? 'bg-orange-500/10 border-orange-500/30'
                          : 'bg-green-500/10 border-green-500/30'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{rec.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg">{rec.title}</h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                rec.priority === 'CRÍTICA'
                                  ? 'bg-red-500 text-white'
                                  : rec.priority === 'IMPORTANTE'
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-green-500 text-white'
                              }`}
                            >
                              {rec.priority}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-3">{rec.description}</p>
                          <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="text-gray-400 mb-1">Impacto</div>
                              <div className="font-medium">{rec.impact}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="text-gray-400 mb-1">Plazo</div>
                              <div className="font-medium">{rec.timeline}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-xl">💡</div>
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Importante:</strong> Estas recomendaciones están priorizadas según su impacto en tu caso. 
                    Consulta con el especialista para crear un plan de acción específico.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Costs Tab */}
          {activeTab === 'costs' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-purple-400" />
                Estimación de Costos
              </h2>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <div className="text-gray-400 mb-2">Rango de Inversión</div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {formatCurrency(results.estimatedCost.min)} - {formatCurrency(results.estimatedCost.max)}
                  </div>
                  <div className="text-lg text-gray-300">
                    Promedio: <strong>{formatCurrency(results.estimatedCost.average)}</strong>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold mb-3">Desglose Detallado</h3>
                <div className="space-y-2">
                  {results.estimatedCost.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-white/5 rounded-lg p-3">
                      <span className="text-gray-300">{item.item}</span>
                      <span className="font-bold">{formatCurrency(item.cost)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-5">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Opciones de Financiamiento
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">6 cuotas</div>
                    <div className="text-xl font-bold">{formatCurrency(results.estimatedCost.financing.months6)}</div>
                    <div className="text-xs text-gray-500">por mes</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">12 cuotas</div>
                    <div className="text-xl font-bold">{formatCurrency(results.estimatedCost.financing.months12)}</div>
                    <div className="text-xs text-gray-500">por mes</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-gray-400 text-sm mb-1">24 cuotas</div>
                    <div className="text-xl font-bold">{formatCurrency(results.estimatedCost.financing.months24)}</div>
                    <div className="text-xs text-gray-500">por mes</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-xl">ℹ️</div>
                  <div className="text-sm text-gray-300">
                    Los costos pueden variar según la clínica, materiales utilizados y complejidad del caso. 
                    Esta es una estimación basada en promedios del mercado chileno.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                Cronograma del Tratamiento
              </h2>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 mb-6 text-center">
                <div className="text-gray-400 mb-2">Duración Total Estimada</div>
                <div className="text-4xl font-bold">{results.timeline.estimate}</div>
              </div>

              <div className="space-y-4">
                {results.timeline.phases.map((phase, index) => (
                  <div key={index} className="relative">
                    {index < results.timeline.phases.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 bg-white/5 rounded-xl p-4">
                        <h3 className="font-bold mb-1">{phase.phase}</h3>
                        <p className="text-sm text-gray-400">{phase.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-xl">⚠️</div>
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Nota:</strong> Los tiempos pueden variar según tu capacidad de cicatrización 
                    y cumplimiento de las recomendaciones. El especialista ajustará el cronograma en tu primera consulta.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specialists Tab */}
          {activeTab === 'specialists' && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-400" />
                Especialistas Recomendados
              </h2>

              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div className="text-sm text-gray-300">
                    <strong className="text-white">Matching Inteligente:</strong> Hemos seleccionado estos especialistas 
                    basándonos en tu perfil de riesgo, ubicación, y las necesidades específicas de tu caso.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {results.specialists.map((specialist) => (
                  <SpecialistCard
                    key={specialist.id}
                    specialist={specialist}
                    onSelect={handleSelectSpecialist}
                    isSelected={selectedSpecialist?.id === specialist.id}
                  />
                ))}
              </div>

              {selectedSpecialist && (
                <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2">¡Excelente elección!</h3>
                      <p className="text-sm text-gray-300 mb-3">
                        Has seleccionado a <strong>{selectedSpecialist.name}</strong>. 
                        Te enviaremos la información de contacto a tu email.
                      </p>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all">
                    Solicitar Consulta
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-bold transition-all transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Descargar Reporte PDF
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-medium transition-all"
          >
            <Share2 className="w-5 h-5" />
            Compartir
          </button>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all"
          >
            Nueva Evaluación
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Esta evaluación es solo informativa. Consulta siempre con un profesional calificado para diagnóstico y tratamiento.
          </p>
        </div>
      </div>
    </div>
  );
}
