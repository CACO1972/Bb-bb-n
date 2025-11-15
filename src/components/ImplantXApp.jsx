import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import UserDataForm from './UserDataForm';
import QuestionCard from './QuestionCard';
import DensityProIntro from './DensityProIntro';
import CalculatingScreen from './CalculatingScreen';
import ResultsScreen from './ResultsScreen';
import { QUESTIONS, DENSITY_QUESTIONS } from './implantx-constants';
import {
  calculateSuccessProbability,
  getRiskLevel,
  generateRecommendations,
  calculateCost,
  calculateTimeline,
  findSpecialists,
  CONFIDENCE_INTERVAL
} from './implantx-utils';

export default function ImplantXApp() {
  // State management
  const [stage, setStage] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentDensityQuestion, setCurrentDensityQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [densityAnswers, setDensityAnswers] = useState({});
  const [showDensityPro, setShowDensityPro] = useState(false);
  const [userData, setUserData] = useState({ 
    name: '', 
    age: '', 
    gender: '', 
    email: '', 
    phone: '' 
  });
  const [results, setResults] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  // Navigation handlers
  const handleWelcomeStart = () => {
    setStage('user_data');
  };

  const handleUserDataContinue = () => {
    setStage('questions');
    setCurrentQuestion(0);
  };

  const handleAnswer = (value) => {
    const questionId = QUESTIONS[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Check if DensityPro should be activated
      if (shouldActivateDensityPro() && !showDensityPro) {
        setShowDensityPro(true);
        setStage('density_intro');
      } else {
        performCalculation();
      }
    }
  };

  const shouldActivateDensityPro = () => {
    return userData.gender === 'female' && parseInt(userData.age) >= 45;
  };

  const handleDensityIntroStart = () => {
    setStage('density_questions');
    setCurrentDensityQuestion(0);
  };

  const handleDensityIntroSkip = () => {
    setShowDensityPro(false);
    performCalculation();
  };

  const handleDensityAnswer = (value) => {
    const questionId = DENSITY_QUESTIONS[currentDensityQuestion].id;
    setDensityAnswers({ ...densityAnswers, [questionId]: value });
    
    if (currentDensityQuestion < DENSITY_QUESTIONS.length - 1) {
      setCurrentDensityQuestion(currentDensityQuestion + 1);
    } else {
      performCalculation();
    }
  };

  const performCalculation = () => {
    setStage('calculating');
    
    // Simulate AI processing time
    setTimeout(() => {
      const probability = calculateSuccessProbability(answers, densityAnswers, showDensityPro);
      const riskLevel = getRiskLevel(probability);
      const recommendations = generateRecommendations(answers, densityAnswers, showDensityPro);
      const estimatedCost = calculateCost(answers);
      const timeline = calculateTimeline(probability, answers);
      const specialists = findSpecialists(probability, answers);

      const calculatedResults = {
        probability,
        probabilityPercent: (probability * 100).toFixed(1),
        ciLower: Math.max(0.45, probability - CONFIDENCE_INTERVAL),
        ciUpper: Math.min(0.985, probability + CONFIDENCE_INTERVAL),
        riskLevel,
        recommendations,
        estimatedCost,
        timeline,
        specialists
      };

      setResults(calculatedResults);
      setStage('results');
    }, 3500); // 3.5 seconds for calculation animation
  };

  const handleRestart = () => {
    setStage('welcome');
    setCurrentQuestion(0);
    setCurrentDensityQuestion(0);
    setAnswers({});
    setDensityAnswers({});
    setShowDensityPro(false);
    setResults(null);
    setSelectedSpecialist(null);
  };

  const handleSelectSpecialist = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  // Render appropriate screen based on stage
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {stage === 'welcome' && (
        <WelcomeScreen onStart={handleWelcomeStart} />
      )}

      {stage === 'user_data' && (
        <UserDataForm 
          userData={userData}
          setUserData={setUserData}
          onContinue={handleUserDataContinue}
        />
      )}

      {stage === 'questions' && (
        <QuestionCard
          question={QUESTIONS[currentQuestion]}
          onAnswer={handleAnswer}
          currentQuestion={currentQuestion}
          totalQuestions={QUESTIONS.length}
        />
      )}

      {stage === 'density_intro' && (
        <DensityProIntro
          userData={userData}
          onContinue={handleDensityIntroStart}
          onSkip={handleDensityIntroSkip}
        />
      )}

      {stage === 'density_questions' && (
        <QuestionCard
          question={DENSITY_QUESTIONS[currentDensityQuestion]}
          onAnswer={handleDensityAnswer}
          currentQuestion={currentDensityQuestion}
          totalQuestions={DENSITY_QUESTIONS.length}
        />
      )}

      {stage === 'calculating' && (
        <CalculatingScreen userData={userData} />
      )}

      {stage === 'results' && results && (
        <ResultsScreen
          results={results}
          userData={userData}
          onRestart={handleRestart}
          onSelectSpecialist={handleSelectSpecialist}
        />
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 3s linear infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
