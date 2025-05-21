'use client';

import { motion } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  description?: string;
  estimatedTime?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export default function ProgressIndicator({
  steps,
  currentStep,
  onStepClick
}: ProgressIndicatorProps) {
  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-2 bg-dark-100 rounded-full overflow-hidden mb-8">
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
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          
          return (
            <div 
              key={step.id} 
              className="relative flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              {/* Step circle */}
              <motion.button
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isActive
                    ? 'bg-primary-500 border-primary-600 text-white'
                    : isCompleted
                      ? 'bg-primary-500/80 border-primary-600/80 text-white'
                      : 'bg-dark-200 border-dark-100 text-gray-400'
                } transition-all duration-300 ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
                whileHover={onStepClick ? { scale: 1.05 } : {}}
                whileTap={onStepClick ? { scale: 0.95 } : {}}
                onClick={() => onStepClick && onStepClick(step.id)}
                disabled={!onStepClick}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Step ${step.id}: ${step.title}`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
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
