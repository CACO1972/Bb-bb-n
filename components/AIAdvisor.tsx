"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Calendar, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface para los mensajes
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mensaje inicial del Dr. Claude al montar el componente
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      role: 'assistant',
      content: `¡Hola! 👋

Soy el Dr. Claude, asesor con IA de Clínica Miró.

Estoy aquí para ayudarte a:
✓ Resolver dudas sobre tratamientos
✓ Evaluar si eres candidato para implantes
✓ Agendar tu evaluación gratuita
✓ Conocer precios y financiamiento

¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
    }
  }, [inputValue]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Llamar a la API mock
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(data.timestamp),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor intenta nuevamente.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (text: string) => {
    setInputValue(text);
    // Auto-enviar después de un breve delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { icon: '🦷', label: 'Necesito implantes', text: 'Necesito información sobre implantes dentales' },
    { icon: '✨', label: 'Mejorar mi sonrisa', text: 'Quiero mejorar el aspecto de mi sonrisa' },
    { icon: '📅', label: 'Agendar hora', text: 'Quiero agendar una evaluación' },
    { icon: '👤', label: 'Soy paciente', text: 'Soy paciente de la clínica y necesito ayuda' },
  ];

  return (
    <div className="h-full flex flex-col bg-white rounded-t-3xl lg:rounded-none shadow-2xl lg:shadow-none">
      {/* Header del Asesor - Fixed Top */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Avatar con gradient */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-2xl shadow-lg">
            🤖
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">Dr. Claude Miró</h2>
            <p className="text-sm text-gray-600">Asesor con IA</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 font-medium">Online ahora</span>
          </div>
        </div>
      </div>

      {/* Área de Mensajes - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-custom">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-lg flex-shrink-0">
                    🤖
                  </div>
                )}

                {/* Message Bubble */}
                <div className="flex flex-col">
                  <div
                    className={`px-5 py-3.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white rounded-tr-none'
                        : 'bg-gray-100 text-gray-900 rounded-tl-none'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                  </div>
                  <span
                    className={`text-xs mt-1.5 ${
                      message.role === 'user' ? 'text-gray-500 text-right' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-lg">
                🤖
              </div>
              <div className="px-5 py-3.5 bg-gray-100 rounded-2xl rounded-tl-none">
                <div className="flex gap-1.5">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAction(action.text)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-primary-500 text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <span className="text-lg">{action.icon}</span>
              <span className="hidden lg:inline">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="flex-shrink-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
              disabled={isLoading}
              rows={1}
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400"
              style={{ maxHeight: '96px' }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
