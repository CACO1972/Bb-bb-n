"use client"

import React from 'react';
import { Sparkles, Star, ArrowRight, Smile, Zap, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const DynamicContent: React.FC = () => {
  const tratamientos = [
    {
      icon: '🦷',
      title: 'Implantes Dentales',
      description: 'Recupera tu sonrisa con implantes de última generación',
      price: 'Desde $450.000',
    },
    {
      icon: '✨',
      title: 'Estética Dental',
      description: 'Carillas, blanqueamiento y más tratamientos estéticos',
      price: 'Desde $180.000',
    },
    {
      icon: '😊',
      title: 'Diseño de Sonrisa',
      description: 'Transforma completamente tu sonrisa con tecnología digital',
      price: 'Desde $2.500.000',
    },
    {
      icon: '🔧',
      title: 'Ortodoncia',
      description: 'Alineadores invisibles y brackets de última generación',
      price: 'Desde $1.200.000',
    },
  ];

  const testimonials = [
    {
      name: 'María González',
      initials: 'MG',
      comment: 'Excelente atención y resultados increíbles en mis implantes. El Dr. Claude me orientó perfectamente desde el inicio.',
      rating: 5,
    },
    {
      name: 'Carlos Muñoz',
      initials: 'CM',
      comment: 'El diseño de sonrisa superó mis expectativas. Todo el proceso fue muy profesional y el asesor IA me ayudó a resolver todas mis dudas.',
      rating: 5,
    },
    {
      name: 'Andrea Silva',
      initials: 'AS',
      comment: 'Me encantó el servicio 24/7 del asesor. Pude agendar mi hora desde mi casa sin problemas. La clínica es súper moderna.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-12 py-8 px-6 lg:px-8">
      {/* Tratamientos Destacados */}
      <section id="tratamientos">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Tratamientos Destacados
          </h2>
          <p className="text-gray-600">
            Tecnología de punta y profesionales expertos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tratamientos.map((tratamiento, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{tratamiento.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tratamiento.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {tratamiento.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary-500 font-bold text-lg">
                  {tratamiento.price}
                </span>
                <button className="flex items-center gap-2 text-primary-500 font-semibold hover:gap-3 transition-all duration-200">
                  Ver más
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Predictor IA - Destacado */}
      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 rounded-3xl p-8 lg:p-10 shadow-2xl text-white relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="text-white" size={24} />
              </div>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                IA Avanzada
              </span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-display font-bold mb-3">
              ¿Eres candidato para implantes?
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-xl">
              Descúbrelo en 2 minutos con nuestro Predictor IA. Análisis personalizado basado en inteligencia artificial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-accent-600 transition-all duration-200"
              >
                <Zap size={22} />
                <span>Iniciar Predictor IA</span>
              </motion.button>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Smile className="text-white" size={20} />
                  </div>
                  <span className="font-semibold">95% precisión</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Heart className="text-white" size={20} />
                  </div>
                  <span className="font-semibold">+1.200 evaluaciones</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Reviews Google */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Lo que dicen nuestros pacientes
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <p className="text-2xl font-bold text-gray-900">
            4.9<span className="text-gray-500 font-normal text-lg">/5</span>
          </p>
          <p className="text-gray-600 mt-1">Basado en 247 reseñas de Google</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar con iniciales */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spacer para el footer */}
      <div className="h-8" />
    </div>
  );
};

export default DynamicContent;
