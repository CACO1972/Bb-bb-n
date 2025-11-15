import React, { useState } from 'react';
import { User, Calendar, Mail, Phone, ChevronRight } from 'lucide-react';
import { validateUserData } from './implantx-utils';

export default function UserDataForm({ userData, setUserData, onContinue }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
    setTouched({ ...touched, [field]: true });
    
    // Clear error for this field
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateUserData(userData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        name: true,
        age: true,
        gender: true,
        email: true,
        phone: true
      });
      return;
    }
    
    onContinue();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full animate-fadeIn">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Cuéntame sobre ti</h2>
            <p className="text-gray-300">
              Esta información me ayuda a personalizar tu evaluación
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre Completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full bg-white/5 border ${
                    touched.name && errors.name ? 'border-red-500' : 'border-white/10'
                  } rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  placeholder="Ej: María García"
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Age and Gender Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Edad *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className={`w-full bg-white/5 border ${
                      touched.age && errors.age ? 'border-red-500' : 'border-white/10'
                    } rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                    placeholder="Ej: 45"
                    min="18"
                    max="100"
                  />
                </div>
                {touched.age && errors.age && (
                  <p className="text-red-400 text-sm mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Género *
                </label>
                <select
                  value={userData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className={`w-full bg-white/5 border ${
                    touched.gender && errors.gender ? 'border-red-500' : 'border-white/10'
                  } rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                >
                  <option value="">Seleccionar</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
                {touched.gender && errors.gender && (
                  <p className="text-red-400 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email (opcional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full bg-white/5 border ${
                    touched.email && errors.email ? 'border-red-500' : 'border-white/10'
                  } rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  placeholder="tu@email.com"
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Para enviarte tu reporte detallado
              </p>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Teléfono (opcional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full bg-white/5 border ${
                    touched.phone && errors.phone ? 'border-red-500' : 'border-white/10'
                  } rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                  placeholder="+56 9 1234 5678"
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Para que un especialista te contacte
              </p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="text-xl">🔒</div>
                <div className="text-sm text-gray-300">
                  <strong className="text-white">Tu privacidad es importante.</strong> Tus datos están protegidos 
                  y nunca serán compartidos sin tu consentimiento.
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
