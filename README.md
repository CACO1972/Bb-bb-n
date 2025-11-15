# 🦷 Clínica Miró - Odontología Web 3.0 con IA

Primera clínica dental en Chile donde la Inteligencia Artificial es la interfaz principal. El Dr. Claude, nuestro asesor IA, ocupa el 60% del viewport y es el corazón de la experiencia de usuario.

## 🚀 Concepto Revolucionario

Este NO es un sitio web tradicional con un chatbot flotante. La IA es la experiencia principal:
- **60% del viewport** dedicado al asesor IA (desktop)
- Conversación natural y contextual
- Captura de leads desde Meta Ads
- Agendamiento automático vía API Dentalink (próximamente)
- Portal para pacientes existentes

## 🎨 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **State Management**: Zustand (instalado, listo para usar)
- **Iconos**: Lucide React

## 🏗️ Estructura del Proyecto

```
clinica-miro-web3/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API mock del chat
│   ├── layout.tsx                 # Layout principal con metadata
│   ├── page.tsx                   # Homepage con layout 60/40
│   └── globals.css                # Estilos globales + Tailwind
├── components/
│   ├── Header.tsx                 # Header sticky responsivo
│   ├── AIAdvisor.tsx              # ⭐ Componente principal (60%)
│   ├── DynamicContent.tsx         # Contenido lateral (40%)
│   └── Footer.tsx                 # Footer profesional
├── extracted_files/               # Componentes ImplantX (para integrar)
├── tailwind.config.ts             # Configuración con colores custom
├── tsconfig.json
├── next.config.js
├── package.json
└── .env.local                     # Variables de entorno
```

## 🎯 Componentes Principales

### AIAdvisor (Componente Estrella)
- **Ocupación**: 60% del viewport en desktop, 70vh en mobile
- **Características**:
  - Chat conversacional con el Dr. Claude
  - Mensaje de bienvenida automático
  - Typing indicators animados
  - Quick action buttons (Implantes, Estética, Agendar, Soy paciente)
  - Auto-scroll a mensajes nuevos
  - Textarea auto-resize
  - Animaciones con Framer Motion
  - Responsive perfecto

### DynamicContent (Contenido Lateral)
- **Ocupación**: 40% del viewport en desktop
- **Secciones**:
  - Tratamientos destacados (grid 2x2)
  - Predictor IA (destacado con gradient)
  - Reviews de Google (5 estrellas)

### Header & Footer
- Header sticky con navegación responsiva
- Footer profesional con información de contacto

## 🎨 Design System

### Colores
- **Primary**: Turquesa IA (#00B4D8) - Color principal del asesor
- **Secondary**: Azul confianza (#0077B6) - Médico y profesional
- **Accent**: Coral (#FF6B6B) - CTAs y acciones importantes
- **Success**: Verde (#06D6A0) - Confirmaciones

### Tipografía
- **Display**: Space Grotesk (headlines, logos)
- **Body**: Inter (textos, UI)

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [repo-url]

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita .env.local con tus claves reales

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linter
```

## 🔧 Configuración

### Variables de Entorno (.env.local)

```bash
ANTHROPIC_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📱 Responsive Design

### Desktop (>= 1024px)
```
┌────────────────────────────────────┐
│         HEADER (80px)              │
├──────────────┬─────────────────────┤
│              │                     │
│  ASESOR IA   │   CONTENIDO         │
│  (60%)       │   (40%)             │
│  STICKY      │   SCROLLABLE        │
│              │                     │
└──────────────┴─────────────────────┘
│            FOOTER                  │
└────────────────────────────────────┘
```

### Mobile (< 1024px)
```
┌─────────────────┐
│     HEADER      │
├─────────────────┤
│   ASESOR IA     │
│   (70vh)        │
├─────────────────┤
│   CONTENIDO     │
│   SCROLLABLE    │
└─────────────────┘
```

## 🔮 Próximas Funcionalidades

- [ ] Integración real con Anthropic Claude API
- [ ] Integración con API Dentalink para agendamiento
- [ ] Predictor IA para candidatos a implantes (componentes ya disponibles en `/extracted_files`)
- [ ] Portal de pacientes con autenticación
- [ ] Pasarela de pagos online
- [ ] Panel de administración
- [ ] Analytics y tracking de conversiones

## 📦 Componentes ImplantX (Disponibles)

En la carpeta `extracted_files/` encontrarás los componentes del Predictor IA:
- `ImplantXApp.jsx` - App principal del predictor
- `WelcomeScreen.jsx` - Pantalla de bienvenida
- `UserDataForm.jsx` - Formulario de datos del usuario
- `QuestionCard.jsx` - Cards de preguntas
- `DensityProIntro.jsx` - Introducción a DensityPro
- `CalculatingScreen.jsx` - Pantalla de cálculo
- `ResultsScreen.jsx` - Pantalla de resultados
- Y más...

Estos componentes están listos para ser integrados en futuras versiones.

## 🎓 Mejores Prácticas Implementadas

✅ TypeScript strict mode
✅ Componentes funcionales con hooks
✅ Código limpio y comentado
✅ Responsive mobile-first
✅ Animaciones suaves con Framer Motion
✅ Accesibilidad básica (ARIA labels, keyboard navigation)
✅ Performance optimizado (lazy loading, memoization ready)
✅ SEO friendly (metadata completa)

## 👨‍💻 Desarrollo

### Estructura de Componentes
Todos los componentes siguen el patrón:
- `"use client"` cuando necesario
- TypeScript interfaces para props
- Hooks organizados al inicio
- Funciones helper bien nombradas
- Comentarios explicativos

### Estilos
- Tailwind CSS utilities (no CSS custom)
- Clases descriptivas y organizadas
- Responsive breakpoints consistentes
- Colores del design system

## 🐛 Debugging

Si encuentras problemas:

1. **Error de compilación TypeScript**:
   ```bash
   npm run build
   ```

2. **Estilos no se aplican**:
   - Verifica que `globals.css` esté importado en `layout.tsx`
   - Revisa `tailwind.config.ts`

3. **API no responde**:
   - Verifica que `/app/api/chat/route.ts` exista
   - Revisa la consola del navegador

## 📄 Licencia

© 2025 Clínica Miró. Todos los derechos reservados.

---

**Desarrollado con ❤️ por Carlos Montoya**

Para más información: hola@clinicamiro.cl
