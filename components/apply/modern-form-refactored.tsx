'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BanknotesIcon,
  UserIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';

// Import context and components
import { FormProvider } from './form-context';
import FormProgress from './form-progress';
import FormNavigation from './form-navigation';
import FormSidebar from './form-sidebar';

// Import step components
import LoanDetailsStep from './steps/loan-details-step';
import PersonalInfoStep from './steps/personal-info-step';
import FinancialInfoStep from './steps/financial-info-step';
import ReviewStep from './steps/review-step';

export default function ModernFormRefactored() {
  // Define form steps
  const steps = [
    {
      id: 1,
      title: 'Loan Details',
      description: 'Loan type and amount',
      estimatedTime: '2 min',
      icon: <BanknotesIcon className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Personal Info',
      description: 'Contact and identity',
      estimatedTime: '3 min',
      icon: <UserIcon className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Financial Info',
      description: 'Income and credit',
      estimatedTime: '2 min',
      icon: <CreditCardIcon className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'Review',
      description: 'Verify and submit',
      estimatedTime: '1 min',
      icon: <DocumentCheckIcon className="w-5 h-5" />
    }
  ];

  // Render form content based on current step
  const renderStepContent = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return <LoanDetailsStep />;
      case 2:
        return <PersonalInfoStep />;
      case 3:
        return <FinancialInfoStep />;
      case 4:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider steps={steps}>
      <div className="min-h-screen bg-dark-300">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-semibold text-white">Loan Application</h1>
          <p className="text-gray-400">Step 1 of 4</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Column */}
            <div className="lg:col-span-2">
              <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl">
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">Loan Application</h2>
                      <p className="text-gray-400">
                        Fill out the form below to apply for a loan. All information is kept secure and confidential.
                      </p>
                    </div>

                    {/* Save indicator */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="text-primary-400 hover:text-primary-300 text-sm flex items-center"
                        >
                          <CloudArrowUpIcon className="w-4 h-4 mr-1" />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator - Simplified for now */}
                  <div className="w-full bg-dark-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>

                {/* Form Content */}
                <div className="relative">
                  <form>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key="form-content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {renderStepContent(1)}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons - Simplified */}
                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        className="flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-lg text-white font-medium hover:from-primary-700 hover:to-primary-600 transition-colors duration-300"
                      >
                        Continue
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar - Simplified */}
            <div className="hidden lg:block">
              <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Loan Details
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Estimated time: 2 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
