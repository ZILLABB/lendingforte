'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useFormContext } from './form-context';

export default function FormNavigation() {
  const { 
    currentStep, 
    totalSteps, 
    handlePrevStep, 
    handleNextStep,
    handleSubmit,
    isSubmitting
  } = useFormContext();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4 mt-8">
      {/* Back Button (hidden on first step) */}
      {!isFirstStep && (
        <motion.button
          type="button"
          onClick={handlePrevStep}
          className="flex items-center justify-center px-6 py-3 mt-4 sm:mt-0 border border-dark-50 rounded-lg text-white hover:bg-dark-100 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </motion.button>
      )}

      {/* Next/Submit Button */}
      <motion.button
        type={isLastStep ? "submit" : "button"}
        onClick={isLastStep ? handleSubmit : handleNextStep}
        className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg text-white font-medium hover:from-primary-700 hover:to-primary-600 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : isLastStep ? (
          <>
            Submit Application
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            Continue
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </>
        )}
      </motion.button>
    </div>
  );
}
