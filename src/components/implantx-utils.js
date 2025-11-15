import { 
  BASELINE_SUCCESS_RATE, 
  MIN_SUCCESS_RATE, 
  MAX_SUCCESS_RATE, 
  CONFIDENCE_INTERVAL,
  QUESTIONS,
  COST_BASE 
} from './implantx-constants';

/**
 * Calculate success probability with improved synergistic interactions
 */
export const calculateSuccessProbability = (answers, densityAnswers, hasDensityPro) => {
  let successProb = BASELINE_SUCCESS_RATE;
  
  // Apply individual risk factors
  Object.entries(answers).forEach(([key, value]) => {
    const question = QUESTIONS.find(q => q.id === key);
    if (question && question.options[value]) {
      successProb *= question.options[value].risk;
    }
  });

  // Apply density factor if DensityPro was used
  if (hasDensityPro && Object.keys(densityAnswers).length > 0) {
    const densityScore = Object.values(densityAnswers).reduce((a, b) => a + b, 0);
    // Improved non-linear density impact
    const densityFactor = Math.max(0.75, 1.0 - (densityScore * 0.045));
    successProb *= densityFactor;
  }

  // Synergistic interactions (improved logic)
  const interactions = calculateInteractions(answers);
  successProb *= interactions.totalFactor;

  // Age-related adjustments
  const ageFactor = calculateAgeFactor(answers);
  successProb *= ageFactor;

  // Clamp to realistic bounds
  return Math.max(MIN_SUCCESS_RATE, Math.min(MAX_SUCCESS_RATE, successProb));
};

/**
 * Calculate synergistic interactions between risk factors
 */
const calculateInteractions = (answers) => {
  let totalFactor = 1.0;
  const interactions = [];

  // Smoking + Diabetes: Compounded vascular issues
  if (answers.smoking >= 2 && answers.diabetes >= 2) {
    totalFactor *= 0.92;
    interactions.push({
      factors: ['smoking', 'diabetes'],
      impact: 0.92,
      description: 'Compromiso vascular compuesto'
    });
  }

  // Smoking + Poor Hygiene: Increased infection risk
  if (answers.smoking >= 2 && answers.hygiene >= 3) {
    totalFactor *= 0.91;
    interactions.push({
      factors: ['smoking', 'hygiene'],
      impact: 0.91,
      description: 'Mayor riesgo de infección'
    });
  }

  // Periodontal Disease + Poor Hygiene: Critical combination
  if (answers.periodontal >= 2 && answers.hygiene >= 3) {
    totalFactor *= 0.88;
    interactions.push({
      factors: ['periodontal', 'hygiene'],
      impact: 0.88,
      description: 'Ambiente bacteriano comprometido'
    });
  }

  // Diabetes + Periodontal: Bidirectional worsening
  if (answers.diabetes >= 2 && answers.periodontal >= 2) {
    totalFactor *= 0.93;
    interactions.push({
      factors: ['diabetes', 'periodontal'],
      impact: 0.93,
      description: 'Deterioro bidireccional'
    });
  }

  // Bruxism + Bone Loss: Mechanical stress on compromised bone
  if (answers.bruxism >= 2 && answers.bone_loss >= 3) {
    totalFactor *= 0.94;
    interactions.push({
      factors: ['bruxism', 'bone_loss'],
      impact: 0.94,
      description: 'Estrés mecánico en hueso comprometido'
    });
  }

  return { totalFactor, interactions };
};

/**
 * Calculate age-related adjustment factor
 */
const calculateAgeFactor = (answers) => {
  // Previous failed implants significantly impact prognosis
  if (answers.previous_implants === 3) {
    return 0.95; // Need to understand why previous failure occurred
  }
  
  // Successful previous implants slightly boost confidence
  if (answers.previous_implants === 1) {
    return 1.01;
  }
  
  return 1.0;
};

/**
 * Determine risk level category
 */
export const getRiskLevel = (prob) => {
  if (prob >= 0.92) return {
    level: 'EXCELENTE',
    color: 'from-emerald-500 to-green-600',
    emoji: '🌟',
    message: '¡Eres un candidato ideal para implantes!',
    description: 'Tu perfil es excelente. Tienes muy alta probabilidad de éxito a largo plazo.'
  };
  
  if (prob >= 0.85) return {
    level: 'BUENO',
    color: 'from-blue-500 to-cyan-600',
    emoji: '✅',
    message: 'Muy buen candidato con preparación mínima',
    description: 'Tu perfil es favorable. Con algunos ajustes simples, tendrás resultados excelentes.'
  };
  
  if (prob >= 0.75) return {
    level: 'MODERADO',
    color: 'from-yellow-500 to-orange-500',
    emoji: '⚠️',
    message: 'Buen candidato con optimización necesaria',
    description: 'Tu caso requiere preparación específica, pero definitivamente es viable.'
  };
  
  if (prob >= 0.65) return {
    level: 'ALTO',
    color: 'from-orange-500 to-red-500',
    emoji: '🔶',
    message: 'Necesitas protocolo especializado',
    description: 'Tu caso es complejo pero tratable con el especialista adecuado y preparación.'
  };
  
  return {
    level: 'MUY ALTO',
    color: 'from-red-500 to-red-700',
    emoji: '🔴',
    message: 'Requiere evaluación multidisciplinaria',
    description: 'Tu caso necesita preparación extensa, pero no imposible. Trabajaremos en equipo.'
  };
};

/**
 * Generate personalized recommendations
 */
export const generateRecommendations = (answers, densityAnswers, hasDensityPro) => {
  const recs = [];
  
  // Critical: Smoking cessation
  if (answers.smoking >= 2) {
    recs.push({
      priority: 'CRÍTICA',
      icon: '🚭',
      title: 'Dejar de Fumar',
      description: 'Dejar el tabaco al menos 2 semanas antes de la cirugía y 8 semanas después',
      impact: '+11% probabilidad de éxito',
      timeline: '2 semanas antes de cirugía',
      color: 'red',
      urgency: 10
    });
  }

  // Critical: Diabetes control
  if (answers.diabetes >= 3) {
    recs.push({
      priority: 'CRÍTICA',
      icon: '🩸',
      title: 'Control de Diabetes',
      description: 'HbA1c debe estar <7% antes de la cirugía. Coordinar con endocrinólogo',
      impact: '+8% probabilidad de éxito',
      timeline: '4-8 semanas antes',
      color: 'red',
      urgency: 9
    });
  }

  // Critical: Periodontal treatment
  if (answers.periodontal >= 2) {
    recs.push({
      priority: 'CRÍTICA',
      icon: '🦠',
      title: 'Tratamiento Periodontal',
      description: 'Controlar enfermedad de encías antes del implante. Raspado y alisado radicular',
      impact: '+12% probabilidad de éxito',
      timeline: '6-12 semanas antes',
      color: 'red',
      urgency: 9
    });
  }

  // Important: Occlusal guard for bruxism
  if (answers.bruxism >= 2) {
    recs.push({
      priority: 'IMPORTANTE',
      icon: '🦷',
      title: 'Placa Oclusal',
      description: 'Usar placa de descarga nocturna obligatoriamente para proteger el implante',
      impact: 'Protege inversión a largo plazo',
      timeline: 'Desde ahora y de por vida',
      color: 'orange',
      urgency: 7
    });
  }

  // Important: Hygiene improvement
  if (answers.hygiene >= 3) {
    recs.push({
      priority: 'IMPORTANTE',
      icon: '🪥',
      title: 'Mejorar Higiene Oral',
      description: 'Aprender técnica correcta de cepillado + hilo dental diario + irrigador',
      impact: '+6% probabilidad de éxito',
      timeline: 'Comenzar inmediatamente',
      color: 'orange',
      urgency: 8
    });
  }

  // Bone density evaluation
  if (hasDensityPro) {
    const densityScore = Object.values(densityAnswers).reduce((a, b) => a + b, 0);
    if (densityScore >= 4) {
      recs.push({
        priority: 'CRÍTICA',
        icon: '🦴',
        title: 'Evaluación de Densidad Ósea',
        description: 'Realizar densitometría ósea (DEXA) para confirmar salud ósea y ajustar protocolo',
        impact: 'Protocolo personalizado necesario',
        timeline: '2-4 semanas antes',
        color: 'red',
        urgency: 8
      });
    }
  }

  // Bone grafting evaluation
  if (answers.bone_loss >= 3) {
    recs.push({
      priority: 'IMPORTANTE',
      icon: '🏗️',
      title: 'Evaluación de Injerto Óseo',
      description: 'Probablemente necesites regeneración ósea antes o durante la colocación del implante',
      impact: 'Aumenta superficie de contacto',
      timeline: 'Evaluar en consulta',
      color: 'orange',
      urgency: 7
    });
  }

  // Default recommendation if no issues
  if (recs.length === 0) {
    recs.push({
      priority: 'MANTENIMIENTO',
      icon: '✨',
      title: 'Mantén tu Salud Actual',
      description: 'Continúa con tus excelentes hábitos de salud oral y general',
      impact: 'Mantiene alta probabilidad de éxito',
      timeline: 'Siempre',
      color: 'green',
      urgency: 1
    });
  }

  // Sort by urgency
  return recs.sort((a, b) => b.urgency - a.urgency);
};

/**
 * Calculate estimated costs with detailed breakdown
 */
export const calculateCost = (answers) => {
  let baseCost = COST_BASE.implant_surgery + COST_BASE.abutment + COST_BASE.crown;
  const breakdown = [
    { item: 'Implante + Cirugía', cost: COST_BASE.implant_surgery },
    { item: 'Pilar protésico', cost: COST_BASE.abutment },
    { item: 'Corona cerámica', cost: COST_BASE.crown }
  ];
  
  // Bone grafting if needed
  if (answers.bone_loss >= 3) {
    baseCost += COST_BASE.bone_graft;
    breakdown.push({ item: 'Injerto óseo', cost: COST_BASE.bone_graft });
  }

  // Occlusal guard for bruxism
  if (answers.bruxism >= 2) {
    baseCost += COST_BASE.occlusal_plate;
    breakdown.push({ item: 'Placa oclusal', cost: COST_BASE.occlusal_plate });
  }

  // Periodontal treatment
  if (answers.periodontal >= 2) {
    baseCost += COST_BASE.periodontal_treatment;
    breakdown.push({ item: 'Tratamiento periodontal', cost: COST_BASE.periodontal_treatment });
  }

  // Complex location surcharge
  if (answers.location === 1) {
    baseCost += COST_BASE.complex_zone_fee;
    breakdown.push({ item: 'Zona compleja (posterior superior)', cost: COST_BASE.complex_zone_fee });
  }
  
  const variability = 0.15; // 15% price variation across clinics
  
  return {
    min: Math.round(baseCost * (1 - variability)),
    max: Math.round(baseCost * (1 + variability)),
    average: baseCost,
    breakdown,
    financing: {
      months6: Math.round(baseCost / 6),
      months12: Math.round(baseCost / 12),
      months24: Math.round(baseCost / 24)
    }
  };
};

/**
 * Calculate treatment timeline
 */
export const calculateTimeline = (prob, answers) => {
  let months = 3; // Base timeline
  
  // Add time for preparatory treatments
  if (answers.periodontal >= 2) months += 2;
  if (answers.diabetes >= 3) months += 1;
  if (answers.bone_loss >= 3) months += 2;
  
  // Adjust based on success probability
  if (prob < 0.75) months += 2;
  else if (prob < 0.85) months += 1;
  
  const minMonths = months;
  const maxMonths = months + 2;
  
  return {
    estimate: `${minMonths}-${maxMonths} meses`,
    phases: [
      { phase: 'Evaluación inicial', duration: '1 visita' },
      ...(answers.periodontal >= 2 ? [{ phase: 'Tratamiento periodontal', duration: '6-8 semanas' }] : []),
      ...(answers.bone_loss >= 3 ? [{ phase: 'Injerto óseo', duration: '4-6 meses cicatrización' }] : []),
      { phase: 'Colocación del implante', duration: '1 día' },
      { phase: 'Osteointegración', duration: '3-6 meses' },
      { phase: 'Corona definitiva', duration: '2-3 semanas' }
    ]
  };
};

/**
 * Find and rank specialists based on case complexity
 */
export const findSpecialists = (prob, answers) => {
  const specialists = [
    {
      id: 1,
      name: 'Dra. María González',
      clinic: 'Centro Dental Providencia',
      experience: '15 años',
      specialty: 'Casos complejos y regeneración ósea',
      distance: '2.3 km',
      rating: 4.9,
      reviews: 247,
      availability: 'Esta semana',
      price_range: '$$$',
      strengths: ['Regeneración ósea', 'Casos complejos', 'Sedación'],
      photo: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Dr. Carlos Pérez',
      clinic: 'Clínica ImplantX Las Condes',
      experience: '12 años',
      specialty: 'Implantología general y estética',
      distance: '4.1 km',
      rating: 4.8,
      reviews: 189,
      availability: 'Próxima semana',
      price_range: '$$',
      strengths: ['Implantes inmediatos', 'Estética dental', 'Tecnología digital'],
      photo: '👨‍⚕️'
    },
    {
      id: 3,
      name: 'Dra. Patricia Silva',
      clinic: 'Dental Pro Ñuñoa',
      experience: '18 años',
      specialty: 'Regeneración ósea avanzada',
      distance: '3.5 km',
      rating: 4.9,
      reviews: 312,
      availability: 'En 2 semanas',
      price_range: '$$$',
      strengths: ['Injertos óseos', 'Sinus lift', 'PRF'],
      photo: '👩‍⚕️'
    },
    {
      id: 4,
      name: 'Dr. Roberto Martínez',
      clinic: 'SmileCare Santiago Centro',
      experience: '10 años',
      specialty: 'Implantología y periodoncia',
      distance: '5.2 km',
      rating: 4.7,
      reviews: 156,
      availability: 'Esta semana',
      price_range: '$$',
      strengths: ['Periodoncia', 'Implantes', 'Mantenimiento'],
      photo: '👨‍⚕️'
    }
  ];

  // Calculate match score for each specialist
  const scoredSpecialists = specialists.map(specialist => {
    let matchScore = 70; // Base score
    
    // Complex cases need experienced specialists
    if (prob < 0.75) {
      if (specialist.experience.includes('15') || specialist.experience.includes('18')) {
        matchScore += 15;
      }
      if (specialist.specialty.includes('complejos') || specialist.specialty.includes('avanzada')) {
        matchScore += 10;
      }
    }
    
    // Bone grafting needs
    if (answers.bone_loss >= 3) {
      if (specialist.strengths.some(s => s.toLowerCase().includes('óseo') || s.toLowerCase().includes('regeneración'))) {
        matchScore += 12;
      }
    }
    
    // Periodontal issues
    if (answers.periodontal >= 2) {
      if (specialist.specialty.includes('periodoncia') || specialist.strengths.includes('Periodoncia')) {
        matchScore += 10;
      }
    }
    
    // Aesthetic zone
    if (answers.location === 0) {
      if (specialist.specialty.includes('estética') || specialist.strengths.includes('Estética dental')) {
        matchScore += 8;
      }
    }
    
    // Simple cases can go to any good specialist
    if (prob >= 0.92) {
      matchScore += 5; // All specialists are suitable
    }
    
    // Distance bonus (closer is better)
    const distance = parseFloat(specialist.distance);
    if (distance < 3) matchScore += 5;
    else if (distance < 5) matchScore += 3;
    
    // Rating bonus
    matchScore += (specialist.rating - 4.5) * 10;
    
    // Availability bonus
    if (specialist.availability.includes('Esta semana')) matchScore += 3;
    
    return {
      ...specialist,
      matchScore: Math.min(100, Math.round(matchScore))
    };
  });

  return scoredSpecialists.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Format currency for Chilean pesos
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Validate user data
 */
export const validateUserData = (userData) => {
  const errors = {};
  
  if (!userData.name || userData.name.trim().length < 2) {
    errors.name = 'Por favor ingresa tu nombre';
  }
  
  const age = parseInt(userData.age);
  if (!age || age < 18 || age > 100) {
    errors.age = 'Edad debe estar entre 18 y 100 años';
  }
  
  if (!userData.gender) {
    errors.gender = 'Por favor selecciona tu género';
  }
  
  if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = 'Email inválido';
  }
  
  if (userData.phone && !/^(\+?56)?[2-9]\d{8}$/.test(userData.phone.replace(/\s/g, ''))) {
    errors.phone = 'Teléfono inválido (formato: +56912345678)';
  }
  
  return errors;
};

// Re-export constants for convenience
export { CONFIDENCE_INTERVAL };
