import { NextResponse } from 'next/server';
import { ratelimit } from '@/lib/ratelimit';

// Mock responses del Dr. Claude basadas en palabras clave
const getMockResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  // Respuestas sobre implantes
  if (lowerMessage.includes('implante')) {
    return `Perfecto, los implantes son nuestra especialidad. 🦷

Los implantes dentales son la mejor solución permanente para reemplazar dientes perdidos.

Para darte la mejor evaluación personalizada, necesito saber:
• ¿Cuántas piezas dentales necesitas reemplazar?
• ¿Hace cuánto perdiste el/los diente(s)?
• ¿Tienes alguna condición médica relevante (diabetes, osteoporosis, etc.)?

También puedo ofrecerte:
✓ Evaluación gratuita con radiografía digital
✓ Presupuesto personalizado
✓ Opciones de financiamiento hasta 36 meses
✓ Garantía de 10 años en nuestros implantes

¿Qué te gustaría hacer?`;
  }

  // Respuestas sobre estética/sonrisa
  if (lowerMessage.includes('estética') || lowerMessage.includes('sonrisa') || lowerMessage.includes('mejorar')) {
    return `¡Excelente elección! ✨ Mejorar tu sonrisa puede transformar tu confianza.

Contamos con varias opciones según tus necesidades:

**Carillas de Porcelana**
• Desde $180.000 por pieza
• Resultados inmediatos y naturales
• Duración 10-15 años

**Blanqueamiento Profesional**
• Desde $120.000
• 3-4 tonos más blanco en 1 sesión
• Sin sensibilidad dental

**Diseño de Sonrisa Completo**
• Desde $2.500.000
• Transformación total con tecnología digital
• Visualiza tu nueva sonrisa antes de empezar

¿Cuál de estas opciones te interesa más?`;
  }

  // Respuestas sobre agendar
  if (lowerMessage.includes('agendar') || lowerMessage.includes('hora') || lowerMessage.includes('cita')) {
    return `¡Perfecto! Puedo ayudarte a agendar tu evaluación gratuita. 📅

**Beneficios de tu evaluación:**
✓ Examen completo con el Dr. Carlos Miró
✓ Radiografía panorámica digital (sin costo)
✓ Presupuesto detallado y personalizado
✓ Plan de tratamiento paso a paso

**Horarios disponibles esta semana:**
• Lunes a Viernes: 09:00 - 20:00
• Sábado: 10:00 - 14:00

Para agendar necesito:
1. Tu nombre completo
2. Número de teléfono
3. Email
4. ¿Qué día y hora prefieres?

También puedes llamarnos directamente al +56 2 2345 6789`;
  }

  // Respuestas sobre pacientes existentes
  if (lowerMessage.includes('paciente') || lowerMessage.includes('portal')) {
    return `¡Hola! Como paciente de Clínica Miró tienes acceso a beneficios exclusivos. 👤

**Tu Portal del Paciente incluye:**
✓ Ver y agendar tus próximas citas
✓ Revisar tu historial clínico
✓ Estado de cuenta y pagos
✓ Descargar certificados y boletas
✓ Chat directo con tu odontólogo

**Para acceder:**
1. Ingresa con tu RUT y contraseña
2. Si olvidaste tu contraseña, puedo ayudarte a recuperarla

¿Necesitas ayuda con algo específico de tu tratamiento o cuenta?`;
  }

  // Respuestas sobre precios/financiamiento
  if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('financiamiento')) {
    return `Entiendo que el tema del presupuesto es importante. Déjame darte información clara. 💰

**Nuestros rangos de precio:**
• Implantes: desde $450.000
• Carillas: desde $180.000
• Diseño de sonrisa: desde $2.500.000
• Ortodoncia invisible: desde $1.200.000

**Opciones de financiamiento:**
✓ Hasta 36 meses sin interés
✓ Convenios con principales isapres
✓ Pago con tarjetas de crédito y débito
✓ Transferencia bancaria

Para darte un presupuesto exacto necesito evaluar tu caso específico.

¿Te gustaría agendar una evaluación gratuita?`;
  }

  // Respuesta por defecto
  return `Gracias por tu consulta. 😊

Puedo ayudarte con:

🦷 **Implantes dentales** - Recupera tu sonrisa
✨ **Estética dental** - Carillas y blanqueamiento
📅 **Agendar evaluación** - Gratis y sin compromiso
👤 **Portal pacientes** - Accede a tu información
💰 **Precios y financiamiento** - Opciones flexibles

¿Sobre qué te gustaría saber más?

También puedes:
• Llamarnos: +56 2 2345 6789
• Escribirnos: hola@clinicamiro.cl
• Visitarnos: Av. Salvador 95, Of. 402, Providencia`;
};

export async function POST(req: Request) {
  try {
    // Rate limiting: 10 requests per minute per IP (if configured)
    let rateLimitHeaders = {};
    
    if (ratelimit) {
      const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'anonymous';
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      rateLimitHeaders = {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      };

      if (!success) {
        return NextResponse.json(
          { 
            error: 'Too many requests. Please try again later.',
            limit,
            reset,
            remaining
          },
          { 
            status: 429,
            headers: rateLimitHeaders
          }
        );
      }
    }

    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simular delay de procesamiento (realista)
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    // Obtener respuesta mock basada en el mensaje
    const response = getMockResponse(message);

    return NextResponse.json(
      {
        message: response,
        timestamp: new Date().toISOString(),
      },
      {
        headers: rateLimitHeaders
      }
    );

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
