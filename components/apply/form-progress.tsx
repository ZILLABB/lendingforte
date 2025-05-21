'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useFormContext } from './form-context';

export default function FormProgress() {
  const { 
    steps, 
    currentStep, 
    totalSteps, 
    completedSections, 
    handleStepClick 
  } = useFormContext();

  return (
    <div className="w-full">
      {/* Mobile Progress Bar */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Step {currentStep} of {totalSteps}</span>
          <span className="text-primary-400 text-sm font-medium">{steps[currentStep - 1].title}</span>
        </div>
        <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Desktop Progress Indicator */}
      <div className="hidden lg:block mb-8">
        <div className="w-full mb-10">
          {/* Progress bar with percentage */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-medium text-primary-400">{Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%</span>
          </div>

          <div className="relative h-2.5 bg-dark-100 rounded-full overflow-hidden mb-8">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-primary-400"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Step indicators */}
          <div className="relative flex justify-between">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 w-full h-0.5 bg-dark-100" />

            {/* Steps */}
            {steps.map((step) => {
              const isCompleted = completedSections.includes(step.id);
              const isActive = currentStep === step.id;
              const isClickable = isCompleted || isActive;

              return (
                <div key={step.id} className="relative flex flex-col items-center">
                  <motion.button
                    type="button"
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-500 text-white ring-4 ring-primary-500/20'
                        : isCompleted
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-200 text-gray-400'
                    } ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
                    whileHover={isClickable ? { scale: 1.1 } : {}}
                    whileTap={isClickable ? { scale: 0.95 } : {}}
                    onClick={() => isClickable && handleStepClick(step.id)}
                    disabled={!isClickable}
                    aria-label={`Go to step ${step.id}: ${step.title}`}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </motion.button>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${
                      isActive ? 'text-primary-400' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 hidden md:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
