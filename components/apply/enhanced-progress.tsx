'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

interface Step {
  id: number;
  title: string;
  description?: string;
  estimatedTime?: string;
  icon?: React.ReactNode;
}

interface EnhancedProgressProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepId: number) => void;
}

export default function EnhancedProgress({
  steps,
  currentStep,
  completedSteps,
  onStepClick
}: EnhancedProgressProps) {
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="w-full mb-10">
      {/* Progress bar with percentage */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Progress</span>
        <span className="text-sm font-medium text-primary-400">{Math.round(progressPercentage)}%</span>
      </div>
      
      <div className="relative h-2.5 bg-dark-100 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-primary-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="relative flex justify-between">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-dark-100" />
        
        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          const isClickable = isCompleted || isActive;
          
          return (
            <div 
              key={step.id} 
              className="relative flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              {/* Step circle */}
              <motion.button
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  isActive
                    ? 'bg-primary-500 border-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : isCompleted
                      ? 'bg-primary-500/80 border-primary-600/80 text-white'
                      : 'bg-dark-200 border-dark-100 text-gray-400'
                } transition-all duration-300 ${isClickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                onClick={() => isClickable && onStepClick && onStepClick(step.id)}
                disabled={!isClickable}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${step.id}: ${step.title}`}
              >
                {isCompleted ? (
                  <CheckIcon className="w-6 h-6" />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    {step.icon ? (
                      <div className="w-5 h-5">{step.icon}</div>
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                )}
                
                {/* Pulse animation for active step */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary-500"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      opacity: [0.7, 0.3, 0.7]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.button>
              
              {/* Step title */}
              <div className="mt-3 text-center">
                <p className={`text-sm font-medium transition-colors duration-300 ${
                  isActive ? 'text-primary-400' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                
                {/* Step description */}
                {step.description && (
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">
                    {step.description}
                  </p>
                )}
                
                {/* Estimated time */}
                {step.estimatedTime && (
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">
                    ~{step.estimatedTime}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
