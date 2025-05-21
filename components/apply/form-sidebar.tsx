'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ClockIcon,
  LightBulbIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useFormContext } from './form-context';

export default function FormSidebar() {
  const { 
    currentStep,
    steps,
    showTips,
    setShowTips
  } = useFormContext();

  // Tips for each step
  const stepTips = {
    1: [
      "Choose a loan amount that you can comfortably repay based on your income and expenses.",
      "Shorter loan terms typically have lower interest rates but higher monthly payments.",
      "Longer loan terms have lower monthly payments but you'll pay more in interest over time.",
      "Be specific about your loan purpose to improve your chances of approval."
    ],
    2: [
      "Double-check your contact information to ensure we can reach you.",
      "Use a personal email address that you check regularly.",
      "Make sure your address is your current legal residence.",
      "Your date of birth helps us verify your identity and confirm you're at least 18 years old."
    ],
    3: [
      "Higher income and lower monthly expenses improve your chances of loan approval.",
      "Be honest about your credit score range - we'll verify it during the approval process.",
      "If you're self-employed, be prepared to provide additional documentation.",
      "Including all sources of income can help you qualify for a larger loan amount."
    ],
    4: [
      "Review all information carefully before submitting your application.",
      "Make sure you understand the terms and conditions before agreeing.",
      "After submission, you'll receive a confirmation email with next steps.",
      "Most applications receive a preliminary decision within 1-2 business days."
    ]
  };

  return (
    <div className="hidden lg:block">
      <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-xl sticky top-8">
        {/* Current Step Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            {steps[currentStep - 1].title}
          </h3>
          <div className="flex items-center text-gray-400 text-sm">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>Estimated time: {steps[currentStep - 1].estimatedTime}</span>
          </div>
        </div>

        {/* Security Information */}
        <div className="p-4 bg-dark-100/50 border border-dark-50 rounded-lg mb-6">
          <div className="flex items-start">
            <ShieldCheckIcon className="w-5 h-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Secure Application</h4>
              <p className="text-xs text-gray-400">
                Your information is encrypted and secure. We use bank-level security to protect your data.
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mb-4">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center justify-between w-full text-left p-3 bg-dark-100/50 border border-dark-50 rounded-lg hover:bg-dark-100 transition-colors duration-200"
          >
            <div className="flex items-center">
              <LightBulbIcon className="w-5 h-5 text-primary-400 mr-2" />
              <span className="text-sm font-medium text-white">Helpful Tips</span>
            </div>
            <motion.div
              animate={{ rotate: showTips ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </button>

          <AnimatePresence>
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-dark-100/30 rounded-b-lg border-x border-b border-dark-50">
                  <ul className="space-y-2">
                    {stepTips[currentStep as keyof typeof stepTips]?.map((tip, index) => (
                      <li key={index} className="flex items-start text-xs text-gray-300">
                        <CheckCircleIcon className="w-4 h-4 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Need Help Section */}
        <div className="p-4 bg-dark-100/50 border border-dark-50 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Need Help?</h4>
          <p className="text-xs text-gray-400 mb-3">
            Our loan specialists are available to assist you with your application.
          </p>
          <div className="flex flex-col space-y-2">
            <a
              href="tel:+18005551234"
              className="text-xs text-primary-400 hover:text-primary-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (800) 555-1234
            </a>
            <a
              href="mailto:support@lendingforte.com"
              className="text-xs text-primary-400 hover:text-primary-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@lendingforte.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
