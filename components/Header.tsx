"use client"

import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Tratamientos', href: '#tratamientos' },
    { label: 'Nosotros', href: '#nosotros' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#inicio" className="flex items-center gap-2">
              <span className="text-3xl">🦷</span>
              <span className="text-2xl font-display font-bold text-primary-500">
                Clínica Miró
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 active:scale-95">
              <User size={18} />
              <span>Mi Portal</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 active:scale-95">
                <User size={18} />
                <span>Mi Portal</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
