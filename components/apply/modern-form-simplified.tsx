'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/providers/toast-provider';
import { createRecord } from '@/lib/firebase/database';
import emailjs from 'emailjs-com';
import NominatimAddressAutocomplete from '@/components/ui/nominatim-address-autocomplete';
import type { ParsedAddress } from '@/components/ui/nominatim-address-autocomplete';
import ModernFormSection from './modern-form-section';
import FormSummary from './form-summary';
import FormField from '@/components/ui/form-field';
import PhoneInput from '@/components/ui/phone-input';
import CurrencyInput from '@/components/ui/currency-input';
import { calculateMonthlyPayment } from '@/lib/utils/formatters';
import { validateStep } from '@/lib/validation/loan-application-schema';
import {
  BanknotesIcon,
  UserIcon,
  DocumentCheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function ModernForm() {
  const toast = useToast();

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

  // State for form steps
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  // State for form data
  const [formData, setFormData] = useState({
    // Step 1: Loan Information
    loanType: 'personal',
    loanAmount: '',
    loanPurpose: '',
    loanTerm: '36',
    estimatedMonthlyPayment: '',

    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',

    // Step 3: Financial Information
    employmentStatus: '',
    employerName: '',
    jobTitle: '',
    annualIncome: '',
    monthlyHousingPayment: '',
    creditScore: 'excellent',

    // Step 4: Consent
    agreeToTerms: false,
    agreeToCredit: false
  });

  // State for form submission and autosave
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveReminder, setShowSaveReminder] = useState(false);

  // State for form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State for section completion
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  // State for estimated monthly payment
  const [estimatedPayment, setEstimatedPayment] = useState<number | null>(null);

  // State for showing tips
  const [showTips, setShowTips] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === 'checkbox' ? target.checked : false;

    // Handle checkbox inputs
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field when it's changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Hide save reminder when user interacts with the form
    if (showSaveReminder) {
      setShowSaveReminder(false);
    }
  };

  // Handle direct value changes (for custom inputs)
  const handleValueChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when it's changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle address selection
  const handleAddressSelect = (address: ParsedAddress) => {
    setFormData(prev => ({
      ...prev,
      address: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode
    }));

    // Clear errors for address fields
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.address;
      delete newErrors.city;
      delete newErrors.state;
      delete newErrors.zipCode;
      return newErrors;
    });
  };

  // Handle manual save
  const handleManualSave = useCallback(() => {
    if (Object.values(formData).some(value => value !== '')) {
      setIsSaving(true);
      try {
        localStorage.setItem('lendingforte_application_data', JSON.stringify(formData));
        setLastSaved(new Date());
        toast.success('Application progress saved successfully');
      } catch (error) {
        // Log error to error monitoring system in production
        toast.error('Failed to save application progress');
      } finally {
        setIsSaving(false);
      }
    }
  }, [formData, toast]);

  // Render form content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ModernFormSection
            title="Loan Details"
            description="Tell us about the loan you're looking for"
            icon={<BanknotesIcon className="w-5 h-5" />}
            isActive={true}
          >
            <div className="space-y-6">
              {/* Loan Type */}
              <FormField
                label="Loan Type"
                name="loanType"
                error={errors.loanType}
                required
              >
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  className={`w-full bg-dark-100 border ${
                    errors.loanType ? 'border-red-500' : 'border-dark-50'
                  } rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                >
                  <option value="">Select Loan Type</option>
                  <option value="personal">Personal Loan</option>
                  <option value="auto">Auto Loan</option>
                  <option value="home">Home Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="education">Education Loan</option>
                  <option value="debt-consolidation">Debt Consolidation</option>
                </select>
              </FormField>
            </div>
          </ModernFormSection>
        );

      default:
        return null;
    }
  };

  // Return a simplified version
  return (
    <div className="min-h-screen bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-white">Loan Application</h1>
        <p className="text-gray-400">Step {currentStep} of {totalSteps}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl">
            <div className="relative">
              <form onSubmit={(e) => e.preventDefault()}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
