"use client"

import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    navegacion: [
      { label: 'Tratamientos', href: '#tratamientos' },
      { label: 'Blog', href: '#blog' },
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Contacto', href: '#contacto' },
    ],
    legal: [
      { label: 'Términos y Condiciones', href: '#terminos' },
      { label: 'Política de Privacidad', href: '#privacidad' },
    ],
  };

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      text: 'Av. Salvador 95, Of. 402, Providencia',
    },
    {
      icon: <Phone size={18} />,
      text: '+56 2 2345 6789',
    },
    {
      icon: <Mail size={18} />,
      text: 'hola@clinicamiro.cl',
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Logo y Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🦷</span>
              <span className="text-2xl font-display font-bold text-white">
                Clínica Miró
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Odontología con Inteligencia Artificial
            </p>
            <p className="text-gray-500 text-xs mt-3">
              Primera clínica dental en Chile con asesor IA disponible 24/7
            </p>
          </div>

          {/* Columna 2: Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navegación</h3>
            <ul className="space-y-3">
              {footerLinks.navegacion.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary-500 mt-0.5">
                    {info.icon}
                  </span>
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Clínica Miró. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-500 hover:text-primary-500 transition-colors duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
