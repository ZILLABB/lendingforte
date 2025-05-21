'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BanknotesIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  DocumentCheckIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/components/providers/toast-provider';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import SaveIndicator from './save-indicator';

interface Step {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  icon: React.ReactNode;
}

interface ModernLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  isSubmitting: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  completedSections: number[];
  estimatedPayment: number | null;
  onSaveManually: () => void;
  onStepClick: (stepId: number) => void;
}

export default function ModernLayout({
  children,
  currentStep,
  totalSteps,
  steps,
  isSubmitting,
  isSaving,
  lastSaved,
  completedSections,
  estimatedPayment,
  onSaveManually,
  onStepClick
}: ModernLayoutProps) {
  const toast = useToast();
  const [showTips, setShowTips] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Calculate estimated time remaining
  useEffect(() => {
    const remainingSteps = steps.slice(currentStep - 1);
    const totalMinutes = remainingSteps.reduce((total, step) => {
      const minutes = parseInt(step.estimatedTime.split(' ')[0]);
      return total + (isNaN(minutes) ? 0 : minutes);
    }, 0);
    
    setTimeRemaining(totalMinutes);
  }, [currentStep, steps]);

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: 'Apply', href: '/apply' },
              { label: `Step ${currentStep}: ${steps[currentStep - 1].title}`, current: true }
            ]}
          />
        </div>

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
                    <SaveIndicator
                      isSaving={isSaving}
                      lastSaved={lastSaved}
                      onSaveManually={onSaveManually}
                    />
                  </div>
                </div>

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
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="relative">
                {children}
              </div>

              {/* Security notice */}
              <div className="mt-8 flex items-center justify-center text-gray-400 text-sm">
                <LockClosedIcon className="w-4 h-4 mr-2" />
                <p>Your information is secure and encrypted</p>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Application Process Card */}
              <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-xl mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                    <DocumentCheckIcon className="w-4 h-4 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Application Process</h3>
                </div>

                {/* Vertical Timeline Progress */}
                <div className="mt-6 relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-dark-100" />

                  {steps.map((step, index) => {
                    const isCompleted = completedSections.includes(step.id);
                    const isActive = currentStep === step.id;
                    const isPending = currentStep < step.id;

                    return (
                      <div key={step.id} className="relative pl-12 pb-8 last:pb-0">
                        {/* Step indicator */}
                        <div 
                          className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            isActive
                              ? 'bg-primary-500 border-primary-600 text-white'
                              : isCompleted
                                ? 'bg-primary-500/80 border-primary-600/80 text-white'
                                : 'bg-dark-200 border-dark-100 text-gray-400'
                          } transition-all duration-300 cursor-pointer`}
                          onClick={() => (isCompleted || isActive) && onStepClick(step.id)}
                        >
                          {isCompleted ? (
                            <CheckCircleIcon className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-medium">{step.id}</span>
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
                        </div>
                        
                        {/* Step content */}
                        <div>
                          <h4 className={`text-sm font-medium ${
                            isActive ? 'text-primary-400' : 
                            isCompleted ? 'text-gray-300' : 
                            'text-gray-500'
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {step.description}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            <span>{step.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Application Summary Card */}
              <AnimatePresence>
                {estimatedPayment && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-xl mb-6"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                        <BanknotesIcon className="w-4 h-4 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-medium text-white">Loan Estimate</h3>
                    </div>
                    
                    <div className="bg-dark-200 rounded-lg p-4 border border-dark-100">
                      <p className="text-sm text-gray-400 mb-1">Estimated Monthly Payment</p>
                      <p className="text-2xl font-semibold text-primary-400">
                        ${estimatedPayment.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Based on 8% APR for selected term
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Help & Tips Card */}
              <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                      <ShieldCheckIcon className="w-4 h-4 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Help & Tips</h3>
                  </div>
                  <button 
                    onClick={() => setShowTips(!showTips)}
                    className="text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    {showTips ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {showTips && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Your progress is automatically saved as you type</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span>You can return to complete your application later</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span>All fields marked with * are required</span>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Time Remaining */}
                {timeRemaining !== null && (
                  <div className="mt-4 flex items-center text-sm text-gray-400">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>Estimated time remaining: <span className="text-primary-400 font-medium">{timeRemaining} min</span></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
