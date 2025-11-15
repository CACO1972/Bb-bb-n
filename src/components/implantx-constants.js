// ImplantX Constants and Data
export const BASELINE_SUCCESS_RATE = 0.964;
export const MIN_SUCCESS_RATE = 0.45;
export const MAX_SUCCESS_RATE = 0.985;
export const CONFIDENCE_INTERVAL = 0.024;

export const QUESTIONS = [
  {
    id: 'smoking',
    title: 'Hábitos de Tabaquismo',
    question: '¿Fumas actualmente?',
    info: 'El tabaco es el factor de riesgo más importante. Reduce el flujo sanguíneo al hueso en un 30%, dificultando la cicatrización.',
    options: [
      { value: 0, label: 'No fumo', emoji: '✅', risk: 1.0 },
      { value: 1, label: 'Ex-fumador (+1 año)', emoji: '💪', risk: 0.97 },
      { value: 2, label: 'Menos de 10 cigarrillos/día', emoji: '⚠️', risk: 0.94 },
      { value: 3, label: '10-20 cigarrillos/día', emoji: '🔶', risk: 0.87 },
      { value: 4, label: 'Más de 20 cigarrillos/día', emoji: '🔴', risk: 0.78 }
    ]
  },
  {
    id: 'diabetes',
    title: 'Control Metabólico',
    question: '¿Tienes diabetes?',
    info: 'La diabetes mal controlada afecta la capacidad de tu cuerpo para sanar. Con buen control (HbA1c <7%), las tasas de éxito son excelentes.',
    options: [
      { value: 0, label: 'No tengo diabetes', emoji: '✅', risk: 1.0 },
      { value: 1, label: 'Pre-diabetes', emoji: '⚠️', risk: 0.96 },
      { value: 2, label: 'Tipo 2 controlada (HbA1c <7%)', emoji: '💊', risk: 0.93 },
      { value: 3, label: 'Tipo 1 controlada', emoji: '💉', risk: 0.88 },
      { value: 4, label: 'Diabetes no controlada', emoji: '🔴', risk: 0.75 }
    ]
  },
  {
    id: 'bruxism',
    title: 'Parafunciones',
    question: '¿Aprietas o rechinas los dientes?',
    info: 'El bruxismo genera fuerzas excesivas sobre el implante. Con una placa oclusal nocturna, podemos proteger tu inversión.',
    options: [
      { value: 0, label: 'No tengo bruxismo', emoji: '😊', risk: 1.0 },
      { value: 1, label: 'Leve, uso placa nocturna', emoji: '🦷', risk: 0.96 },
      { value: 2, label: 'Moderado, con tratamiento', emoji: '⚠️', risk: 0.92 },
      { value: 3, label: 'Severo, sin control', emoji: '🔴', risk: 0.86 }
    ]
  },
  {
    id: 'periodontal',
    title: 'Salud de las Encías',
    question: '¿Cuál es el estado actual de tus encías?',
    info: 'Las bacterias que causan enfermedad periodontal también pueden afectar los implantes. La buena noticia: es 100% prevenible con higiene.',
    options: [
      { value: 0, label: 'Encías sanas', emoji: '💪', risk: 1.0 },
      { value: 1, label: 'Gingivitis ocasional', emoji: '⚠️', risk: 0.95 },
      { value: 2, label: 'Periodontitis tratada', emoji: '💊', risk: 0.88 },
      { value: 3, label: 'Periodontitis activa', emoji: '🔴', risk: 0.76 }
    ]
  },
  {
    id: 'hygiene',
    title: 'Higiene Oral',
    question: '¿Cómo describirías tu rutina de higiene oral?',
    info: 'Los implantes requieren MÁS cuidado que los dientes naturales. Una buena higiene es la clave del éxito a largo plazo.',
    options: [
      { value: 0, label: '2-3 veces/día + hilo + enjuague', emoji: '⭐', risk: 1.0 },
      { value: 1, label: '2 veces/día + hilo dental', emoji: '✅', risk: 0.98 },
      { value: 2, label: '2 veces/día básico', emoji: '💪', risk: 0.95 },
      { value: 3, label: '1 vez/día', emoji: '⚠️', risk: 0.89 },
      { value: 4, label: 'Irregular', emoji: '🔴', risk: 0.79 }
    ]
  },
  {
    id: 'bone_loss',
    title: 'Tiempo sin Diente',
    question: '¿Cuánto tiempo llevas sin el/los diente(s)?',
    info: 'El hueso se reabsorbe progresivamente sin el diente. Cuanto antes actuemos, mejor será el hueso disponible.',
    options: [
      { value: 0, label: 'Aún tengo el diente', emoji: '🦷', risk: 1.0 },
      { value: 1, label: 'Menos de 3 meses', emoji: '🆕', risk: 0.98 },
      { value: 2, label: '3-12 meses', emoji: '⏱️', risk: 0.96 },
      { value: 3, label: '1-3 años', emoji: '⚠️', risk: 0.92 },
      { value: 4, label: 'Más de 3 años', emoji: '🔴', risk: 0.87 }
    ]
  },
  {
    id: 'previous_implants',
    title: 'Experiencia Previa',
    question: '¿Has tenido implantes dentales anteriormente?',
    info: 'Tu historial nos ayuda a personalizar el tratamiento. Si tuviste complicaciones, identificaremos la causa.',
    options: [
      { value: 0, label: 'Primera vez', emoji: '🆕', risk: 1.0 },
      { value: 1, label: 'Sí, exitosos', emoji: '✅', risk: 1.03 },
      { value: 2, label: 'Sí, con complicaciones menores', emoji: '⚠️', risk: 0.88 },
      { value: 3, label: 'Sí, fracasaron', emoji: '🔴', risk: 0.71 }
    ]
  },
  {
    id: 'tooth_loss_cause',
    title: 'Causa de Pérdida Dental',
    question: '¿Por qué perdiste el/los diente(s)?',
    info: 'La causa nos indica el estado del hueso y tejidos. Cada situación requiere un enfoque específico.',
    options: [
      { value: 0, label: 'Caries', emoji: '🦷', risk: 1.0 },
      { value: 1, label: 'Golpe o accidente', emoji: '💥', risk: 0.98 },
      { value: 2, label: 'Enfermedad de las encías', emoji: '⚠️', risk: 0.88 },
      { value: 3, label: 'Otra razón', emoji: '❓', risk: 0.95 }
    ]
  },
  {
    id: 'location',
    title: 'Ubicación del Implante',
    question: '¿Dónde necesitas el implante?',
    info: 'La ubicación afecta la complejidad. El maxilar posterior tiene menos densidad ósea, requiriendo más cuidado.',
    options: [
      { value: 0, label: 'Anterior superior (dientes de adelante arriba)', emoji: '😁', risk: 0.98 },
      { value: 1, label: 'Posterior superior (muelas arriba)', emoji: '🦷', risk: 0.91 },
      { value: 2, label: 'Anterior inferior (dientes de adelante abajo)', emoji: '💪', risk: 1.0 },
      { value: 3, label: 'Posterior inferior (muelas abajo)', emoji: '🦴', risk: 0.95 }
    ]
  }
];

export const DENSITY_QUESTIONS = [
  {
    id: 'fractures',
    question: '¿Has tenido fracturas de hueso después de una caída leve?',
    info: 'Las fracturas por trauma mínimo son la señal más clara de huesos débiles.',
    options: [
      { value: 0, label: 'No, nunca', emoji: '✅' },
      { value: 1, label: 'Sí, una vez', emoji: '⚠️' },
      { value: 2, label: 'Sí, múltiples veces', emoji: '🔴' }
    ]
  },
  {
    id: 'height_loss',
    question: '¿Has notado pérdida de estatura en los últimos años?',
    info: 'Perder más de 3cm puede indicar fracturas vertebrales por osteoporosis.',
    options: [
      { value: 0, label: 'No', emoji: '✅' },
      { value: 1, label: 'Sí, notablemente', emoji: '⚠️' },
      { value: 2, label: 'No estoy segura', emoji: '❓' }
    ]
  },
  {
    id: 'family_history',
    question: '¿Alguno de tus padres tuvo osteoporosis o fractura de cadera?',
    info: 'Los antecedentes familiares aumentan tu riesgo 2-3 veces.',
    options: [
      { value: 0, label: 'No', emoji: '✅' },
      { value: 1, label: 'Sí', emoji: '⚠️' },
      { value: 2, label: 'Desconozco', emoji: '❓' }
    ]
  },
  {
    id: 'corticoids',
    question: '¿Has tomado corticoides (prednisona) por más de 3 meses?',
    info: 'Los corticoides pueden debilitar los huesos significativamente.',
    options: [
      { value: 0, label: 'Nunca', emoji: '✅' },
      { value: 1, label: 'Sí, en el pasado', emoji: '⚠️' },
      { value: 2, label: 'Actualmente', emoji: '🔴' }
    ]
  },
  {
    id: 'menopause',
    question: '¿Hace cuánto tiempo pasaste por la menopausia?',
    info: 'Los primeros 5 años post-menopausia son críticos para la salud ósea.',
    options: [
      { value: 0, label: 'Pre-menopausia', emoji: '✅' },
      { value: 1, label: 'Menos de 5 años', emoji: '⚠️' },
      { value: 2, label: 'Más de 5 años', emoji: '🔴' }
    ]
  }
];

export const COST_BASE = {
  implant_surgery: 680000,
  abutment: 150000,
  crown: 420000,
  bone_graft: 350000,
  occlusal_plate: 150000,
  periodontal_treatment: 180000,
  complex_zone_fee: 220000
};
