import React from 'react';
import { MapPin, Star, Calendar, TrendingUp, Award } from 'lucide-react';

export default function SpecialistCard({ specialist, onSelect, isSelected }) {
  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (score >= 80) return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    if (score >= 70) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  };

  const matchColorClass = getMatchColor(specialist.matchScore);

  return (
    <div
      onClick={() => onSelect(specialist)}
      className={`bg-white/5 rounded-xl p-6 border-2 transition-all cursor-pointer hover:scale-[1.02] ${
        isSelected
          ? 'border-purple-500 bg-purple-500/10'
          : 'border-white/10 hover:border-purple-500/50'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Photo */}
        <div className="text-5xl flex-shrink-0">
          {specialist.photo}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-bold text-lg">{specialist.name}</h3>
              <p className="text-sm text-gray-400">{specialist.clinic}</p>
            </div>
            
            {/* Match Score Badge */}
            <div className={`px-3 py-1 rounded-full border text-sm font-bold flex items-center gap-1 ${matchColorClass}`}>
              <TrendingUp className="w-4 h-4" />
              {specialist.matchScore}% match
            </div>
          </div>

          {/* Specialty & Experience */}
          <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              {specialist.specialty}
            </div>
            <div>• {specialist.experience} experiencia</div>
          </div>

          {/* Strengths */}
          <div className="flex flex-wrap gap-2 mb-3">
            {specialist.strengths.map((strength, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs"
              >
                {strength}
              </span>
            ))}
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold">{specialist.rating}</span>
              <span className="text-gray-400">({specialist.reviews} reseñas)</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              {specialist.distance}
            </div>

            <div className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-4 h-4" />
              {specialist.availability}
            </div>

            <div className="text-gray-400">
              {specialist.price_range}
            </div>
          </div>

          {/* Why Matched */}
          {specialist.matchScore >= 90 && (
            <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-2">
              <p className="text-xs text-green-400">
                ⭐ Altamente recomendado para tu caso específico
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-purple-500/30">
          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
              ✓
            </div>
            Seleccionado - Recibirás información de contacto
          </div>
        </div>
      )}
    </div>
  );
}
