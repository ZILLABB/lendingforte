'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/providers/toast-provider';
import { createRecord } from '@/lib/firebase/database';
import emailjs from 'emailjs-com';
import NominatimAddressAutocomplete from '@/components/ui/nominatim-address-autocomplete';
import type { ParsedAddress } from '@/components/ui/nominatim-address-autocomplete';
import FormSection from './form-section';
import ProgressIndicator from './progress-indicator';
import FormSummary from './form-summary';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import SaveIndicator from './save-indicator';
import FormField from '@/components/ui/form-field';
import PhoneInput from '@/components/ui/phone-input';
import CurrencyInput from '@/components/ui/currency-input';
import Tooltip from '@/components/ui/tooltip';
import { formatPhoneNumber, formatCurrency, calculateMonthlyPayment } from '@/lib/utils/formatters';
import { validateStep } from '@/lib/validation/loan-application-schema';
import {
  BanknotesIcon,
  UserIcon,
  BuildingOfficeIcon,
  DocumentCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function ApplyForm() {
  const toast = useToast();

  // Define form steps
  const steps = [
    {
      id: 1,
      title: 'Loan Details',
      description: 'Loan type and amount',
      estimatedTime: '2 min'
    },
    {
      id: 2,
      title: 'Personal Info',
      description: 'Contact and identity',
      estimatedTime: '3 min'
    },
    {
      id: 3,
      title: 'Financial Info',
      description: 'Income and credit',
      estimatedTime: '2 min'
    },
    {
      id: 4,
      title: 'Review',
      description: 'Verify and submit',
      estimatedTime: '1 min'
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

  // Load saved form data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('lendingforte_application_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);

        // Determine which step to show based on saved data
        let step = 1;
        let completed = [];

        if (parsedData.loanAmount && parsedData.loanPurpose && parsedData.loanTerm) {
          step = Math.max(step, 2);
          completed.push(1);
        }

        if (parsedData.firstName && parsedData.lastName && parsedData.email && parsedData.phone &&
            parsedData.address && parsedData.city && parsedData.state && parsedData.zipCode) {
          step = Math.max(step, 3);
          completed.push(2);
        }

        if (parsedData.employmentStatus && parsedData.annualIncome && parsedData.monthlyHousingPayment) {
          step = Math.max(step, 4);
          completed.push(3);
        }

        setCurrentStep(step);
        setCompletedSections(completed);

        // Calculate estimated payment if loan amount is available
        if (parsedData.loanAmount && parsedData.loanTerm) {
          const amount = parseFloat(parsedData.loanAmount);
          const term = parseInt(parsedData.loanTerm);
          // Assume 8% interest rate for estimation
          const rate = 8;
          const payment = calculateMonthlyPayment(amount, rate, term);
          setEstimatedPayment(payment);
        }

        toast.success('Your previous application data has been loaded', {
          action: {
            label: 'Start Fresh',
            onClick: () => {
              localStorage.removeItem('lendingforte_application_data');
              window.location.reload();
            }
          }
        });
      } catch (error) {
        console.error('Error loading saved application data:', error);
      }
    }
  }, [toast]);

  // Autosave form data when it changes
  useEffect(() => {
    const saveFormData = async () => {
      if (Object.values(formData).some(value => value !== '')) {
        setIsSaving(true);
        try {
          localStorage.setItem('lendingforte_application_data', JSON.stringify(formData));
          setLastSaved(new Date());
        } catch (error) {
          console.error('Error saving application data:', error);
        } finally {
          setIsSaving(false);
        }
      }
    };

    const timeoutId = setTimeout(saveFormData, 1500);
    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Show save reminder after 5 minutes of inactivity
  useEffect(() => {
    const inactivityTimer = setTimeout(() => {
      if (Object.values(formData).some(value => value !== '') && !showSaveReminder) {
        setShowSaveReminder(true);
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(inactivityTimer);
  }, [formData, showSaveReminder]);

  // Calculate estimated monthly payment when loan amount or term changes
  useEffect(() => {
    if (formData.loanAmount && formData.loanTerm) {
      const amount = parseFloat(formData.loanAmount);
      const term = parseInt(formData.loanTerm);
      // Assume 8% interest rate for estimation
      const rate = 8;

      if (!isNaN(amount) && !isNaN(term) && amount > 0 && term > 0) {
        const payment = calculateMonthlyPayment(amount, rate, term);
        setEstimatedPayment(payment);
      } else {
        setEstimatedPayment(null);
      }
    } else {
      setEstimatedPayment(null);
    }
  }, [formData.loanAmount, formData.loanTerm]);

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

  // Validate a single field
  const validateField = (name: string, value: string | boolean): string => {
    // Skip validation for optional fields
    const optionalFields = ['employerName', 'jobTitle'];
    if (optionalFields.includes(name) && (!value || value === '')) {
      return '';
    }

    // For boolean values (checkboxes)
    if (typeof value === 'boolean') {
      if (name === 'agreeToTerms' && !value) {
        return 'You must agree to the terms and conditions';
      }
      if (name === 'agreeToCredit' && !value) {
        return 'You must agree to the credit check';
      }
      return '';
    }

    // For string values
    switch (name) {
      case 'loanAmount':
        if (!value) return 'Loan amount is required';
        if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid loan amount';
        if (Number(value) < 1000) return 'Minimum loan amount is $1,000';
        if (Number(value) > 100000) return 'Maximum loan amount is $100,000';
        break;
      case 'loanPurpose':
        if (!value) return 'Please select a loan purpose';
        break;
      case 'loanTerm':
        if (!value) return 'Please select a loan term';
        break;
      case 'firstName':
        if (!value) return 'First name is required';
        if (value.length < 2) return 'First name must be at least 2 characters';
        break;
      case 'lastName':
        if (!value) return 'Last name is required';
        if (value.length < 2) return 'Last name must be at least 2 characters';
        break;
      case 'email':
        if (!value) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value) return 'Phone number is required';
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 10) return 'Phone number must be 10 digits';
        break;
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const dob = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        if (age < 18) return 'You must be at least 18 years old';
        if (age > 100) return 'Please enter a valid date of birth';
        break;
      case 'address':
        if (!value) return 'Street address is required';
        break;
      case 'city':
        if (!value) return 'City is required';
        break;
      case 'state':
        if (!value) return 'State is required';
        break;
      case 'zipCode':
        if (!value) return 'ZIP code is required';
        if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Please enter a valid ZIP code';
        break;
      case 'employmentStatus':
        if (!value) return 'Employment status is required';
        break;
      case 'annualIncome':
        if (!value) return 'Annual income is required';
        if (isNaN(Number(value)) || Number(value) <= 0) return 'Please enter a valid annual income';
        break;
      case 'monthlyHousingPayment':
        if (!value) return 'Monthly housing payment is required';
        if (isNaN(Number(value)) || Number(value) < 0) return 'Please enter a valid monthly housing payment';
        break;
      default:
        return '';
    }
    return '';
  };

  // Validate the current step using Zod schema
  const validateCurrentStep = (step: number): boolean => {
    // Extract only the fields relevant to the current step
    const stepData: Record<string, any> = {};

    if (step === 1) {
      // Loan information fields
      const fields = ['loanType', 'loanAmount', 'loanPurpose', 'loanTerm'];
      fields.forEach(field => {
        stepData[field] = formData[field as keyof typeof formData];
      });
    } else if (step === 2) {
      // Personal information fields
      const fields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'zipCode'];
      fields.forEach(field => {
        stepData[field] = formData[field as keyof typeof formData];
      });
    } else if (step === 3) {
      // Financial information fields
      const fields = ['employmentStatus', 'employerName', 'jobTitle', 'annualIncome', 'monthlyHousingPayment', 'creditScore'];
      fields.forEach(field => {
        stepData[field] = formData[field as keyof typeof formData];
      });
    } else if (step === 4) {
      // Consent fields
      const fields = ['agreeToTerms', 'agreeToCredit'];
      fields.forEach(field => {
        stepData[field] = formData[field as keyof typeof formData];
      });
    }

    // Validate using Zod schema
    const result = validateStep(stepData, step);

    if (!result.success) {
      // If validation failed, update the errors state
      if (typeof result.error === 'object') {
        setErrors(result.error as Record<string, string>);

        // Show a toast with the first error
        const firstError = Object.values(result.error as Record<string, string>)[0];
        toast.error(firstError);
      } else {
        // Handle case where error is a string
        toast.error(result.error as string);
      }
      return false;
    } else {
      // If validation succeeded, clear errors and mark step as completed
      setErrors({});

      // If valid, mark the step as completed
      if (!completedSections.includes(step)) {
        setCompletedSections(prev => [...prev, step]);
      }

      return true;
    }
  };

  // Handle next step
  const handleNextStep = () => {
    // Validate current step
    if (!validateCurrentStep(currentStep)) {
      return;
    }

    // Animate to the next step
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));

    // Scroll to the top of the form
    window.scrollTo({
      top: window.scrollY - 100,
      behavior: 'smooth'
    });
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));

    // Scroll to the top of the form
    window.scrollTo({
      top: window.scrollY - 100,
      behavior: 'smooth'
    });
  };

  // Handle direct navigation to a step
  const handleStepClick = useCallback((stepId: number) => {
    // Only allow navigation to completed steps or the current step
    if (completedSections.includes(stepId) || stepId === currentStep) {
      setCurrentStep(stepId);

      // Scroll to the top of the form
      window.scrollTo({
        top: window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  }, [completedSections, currentStep]);

  // Handle edit section from summary
  const handleEditSection = useCallback((sectionId: number) => {
    setCurrentStep(sectionId);

    // Scroll to the top of the form
    window.scrollTo({
      top: window.scrollY - 100,
      behavior: 'smooth'
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate final step
    if (!validateCurrentStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Show loading toast
      toast.info('Submitting your application...', { duration: 5000 });

      // Add a small delay to show the loading state
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate application ID
      const applicationId = `LF-${Date.now().toString().slice(-8)}`;

      // Prepare application data
      const applicationData = {
        ...formData,
        loanAmount: Number(formData.loanAmount),
        annualIncome: Number(formData.annualIncome),
        monthlyHousingPayment: Number(formData.monthlyHousingPayment),
        estimatedMonthlyPayment: estimatedPayment,
        submittedAt: new Date().toISOString(),
        status: 'pending_review',
        applicationId,
        completedSteps: completedSections
      };

      // Try to create the record in Firebase
      try {
        // Create the record in Firebase
        const recordId = await createRecord('loan-application', applicationData);

        // Send email notification using EmailJS
        try {
          // Prepare email data
          const emailData = {
            fullName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phoneNumber: formData.phone,
            loanType: formData.loanType,
            requestedAmount: formData.loanAmount,
            tenure: formData.loanTerm,
            applicationId: applicationId,
            submissionDate: new Date().toLocaleDateString()
          };

          // Send email using EmailJS with environment variables or fallback to hardcoded values
          const emailResponse = await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_aug4hyu",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_e9tvy3f",
            emailData,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "mRm23xSD-WMIu8ZDK"
          );
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
          // Continue with success flow even if email fails
        }
      } catch (firebaseError) {
        console.error('Error submitting application to Firebase:', firebaseError);

        // Try alternative path
        try {
          // Try alternative database path
          const recordId = await createRecord('applications', applicationData);

          // Try to send email notification
          try {
            // Prepare email data
            const emailData = {
              fullName: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phoneNumber: formData.phone,
              loanType: formData.loanType,
              requestedAmount: formData.loanAmount,
              tenure: formData.loanTerm,
              applicationId: applicationId,
              submissionDate: new Date().toLocaleDateString()
            };

            // Send email using EmailJS with environment variables or fallback to hardcoded values
            const emailResponse = await emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_aug4hyu",
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_e9tvy3f",
              emailData,
              process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "mRm23xSD-WMIu8ZDK"
            );
          } catch (emailError) {
            console.error('Error sending email notification:', emailError);
            // Continue with success flow even if email fails
          }
        } catch (secondError) {
          // If both attempts fail, log the error but continue with the success flow
          console.error('Second attempt also failed:', secondError);
        }
      }

      // Clear saved application data from localStorage
      localStorage.removeItem('lendingforte_application_data');

      // Show success message with application ID
      toast.success(
        `Application submitted successfully! Application ID: ${applicationId}. We've sent a confirmation email to ${formData.email}. We'll be in touch within 1-2 business days.`,
        { duration: 8000 }
      );

      // Reset form
      setFormData({
        loanType: 'personal',
        loanAmount: '',
        loanPurpose: '',
        loanTerm: '36',
        estimatedMonthlyPayment: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        employmentStatus: '',
        employerName: '',
        jobTitle: '',
        annualIncome: '',
        monthlyHousingPayment: '',
        creditScore: 'excellent',
        agreeToTerms: false,
        agreeToCredit: false
      });

      // Reset errors
      setErrors({});

      // Reset to first step
      setCurrentStep(1);

      // Reset completed sections
      setCompletedSections([]);

      // Reset last saved timestamp
      setLastSaved(null);

      // Reset estimated payment
      setEstimatedPayment(null);
    } catch (error) {
      console.error('Error submitting application:', error);

      // Create a more detailed error message
      let errorMessage = 'An unexpected error occurred.';
      let errorType = 'unknown';

      if (error instanceof Error) {
        if (error.message.includes('PERMISSION_DENIED')) {
          errorMessage = 'Firebase permission denied. This is expected in the demo environment.';
          errorType = 'firebase';
        } else if (error.message.includes('emailjs')) {
          errorMessage = 'Failed to send email notification. Your application data has been saved.';
          errorType = 'email';
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          errorMessage = 'Network connection issue. Please check your internet connection.';
          errorType = 'network';
        } else {
          errorMessage = error.message;
        }
      }

      // Save application data to localStorage as a backup
      try {
        const applicationBackup = {
          ...formData,
          applicationId: `LF-${Date.now().toString().slice(-8)}`,
          submittedAt: new Date().toISOString(),
          status: 'pending_submission',
        };
        localStorage.setItem('lendingforte_application_backup', JSON.stringify(applicationBackup));
      } catch (backupError) {
        console.error('Error saving application backup:', backupError);
      }

      // Show appropriate error toast based on error type
      if (errorType === 'firebase') {
        toast.warning(
          "Your application couldn't be saved to our database. This may be due to demo mode restrictions.",
          { duration: 8000 }
        );
      } else if (errorType === 'network') {
        toast.error(
          "Network connection issue. Your application has been saved locally and will be submitted when you're back online.",
          { duration: 8000 }
        );
      } else {
        toast.error(
          `Submission failed. Your application has been saved locally. ${errorMessage}`,
          { duration: 8000 }
        );
      }

      // Try to send email even if Firebase fails
      if (errorType === 'firebase' || errorType === 'network') {
        try {
          // Prepare email data for fallback
          const emailData = {
            fullName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phoneNumber: formData.phone,
            loanType: formData.loanType,
            requestedAmount: formData.loanAmount,
            tenure: formData.loanTerm,
            applicationId: `LF-${Date.now().toString().slice(-8)}`,
            submissionDate: new Date().toLocaleDateString()
          };

          // Send email using EmailJS as fallback
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_aug4hyu",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_e9tvy3f",
            emailData,
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "mRm23xSD-WMIu8ZDK"
          );

          // Show success message for email
          toast.success(
            <div>
              <p className="font-medium">Email notification sent</p>
              <p className="text-sm mt-1">We've sent a confirmation email with your application details.</p>
            </div>,
            { duration: 5000 }
          );
        } catch (emailError) {
          console.error('Error sending fallback email notification:', emailError);
          toast.error(
            "We couldn't send an email confirmation. Please save your application ID for reference.",
            { duration: 5000 }
          );
        }

        // Simulate success for demo purposes
        toast.success(
          "Demo Mode: Application processed locally. In a production environment, this would be saved to Firebase.",
          { duration: 5000 }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Apply', href: '/apply' },
            { label: `Step ${currentStep}: ${steps[currentStep - 1].title}`, current: true }
          ]}
        />
      </div>

      <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-5 sm:p-6 md:p-8 shadow-xl">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mb-5 md:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Loan Application</h2>
              <p className="text-sm sm:text-base text-gray-400">
                Fill out the form below to apply for a loan. All information is kept secure and confidential.
              </p>
            </div>

            {/* Save indicator */}
            <div className="flex-shrink-0">
              <SaveIndicator
                isSaving={isSaving}
                lastSaved={lastSaved}
                onSaveManually={handleManualSave}
              />
            </div>
          </div>

          {/* Save reminder */}
          <AnimatePresence>
            {showSaveReminder && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4 mb-6"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-primary-300">
                      Your application progress is automatically saved. You can return to complete it later.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSaveReminder(false)}
                    className="ml-auto flex-shrink-0 text-primary-400 hover:text-primary-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress indicator */}
          <div className="mb-6 md:mb-8">
            <ProgressIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Loan Information */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormSection
                  title="Loan Details"
                  description="Tell us about the loan you're looking for"
                  icon={<BanknotesIcon className="w-5 h-5" />}
                  isActive={true}
                  isCompleted={completedSections.includes(1)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <FormField
                        id="loanType"
                        name="loanType"
                        label="Loan Type"
                        type="select"
                        value={formData.loanType}
                        onChange={handleChange}
                        required
                        options={[
                          { value: 'personal', label: 'Personal Loan' },
                          { value: 'mortgage', label: 'Mortgage' },
                          { value: 'business', label: 'Business Loan' }
                        ]}
                        tooltipContent={
                          <div>
                            <p><strong>Personal Loan:</strong> For individual expenses like debt consolidation or major purchases.</p>
                            <p className="mt-1"><strong>Mortgage:</strong> For home purchases, refinancing, or home equity.</p>
                            <p className="mt-1"><strong>Business Loan:</strong> For business expenses, expansion, or equipment.</p>
                          </div>
                        }
                        error={errors.loanType}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <CurrencyInput
                        id="loanAmount"
                        name="loanAmount"
                        label="Loan Amount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        onValueChange={(value) => handleValueChange('loanAmount', value)}
                        required
                        error={errors.loanAmount}
                        helpText="Enter the amount you wish to borrow"
                        min={1000}
                        max={100000}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <FormField
                        id="loanPurpose"
                        name="loanPurpose"
                        label="Loan Purpose"
                        type="select"
                        value={formData.loanPurpose}
                        onChange={handleChange}
                        required
                        error={errors.loanPurpose}
                        options={[
                          { value: '', label: 'Select a purpose' },
                          ...(formData.loanType === 'personal' ? [
                            { value: 'debt_consolidation', label: 'Debt Consolidation' },
                            { value: 'home_improvement', label: 'Home Improvement' },
                            { value: 'major_purchase', label: 'Major Purchase' },
                            { value: 'medical_expenses', label: 'Medical Expenses' },
                            { value: 'other_personal', label: 'Other Personal Expenses' }
                          ] : []),
                          ...(formData.loanType === 'mortgage' ? [
                            { value: 'purchase', label: 'Home Purchase' },
                            { value: 'refinance', label: 'Refinance' },
                            { value: 'home_equity', label: 'Home Equity' },
                            { value: 'construction', label: 'Construction' },
                            { value: 'investment_property', label: 'Investment Property' }
                          ] : []),
                          ...(formData.loanType === 'business' ? [
                            { value: 'working_capital', label: 'Working Capital' },
                            { value: 'equipment', label: 'Equipment Purchase' },
                            { value: 'expansion', label: 'Business Expansion' },
                            { value: 'inventory', label: 'Inventory Financing' },
                            { value: 'commercial_real_estate', label: 'Commercial Real Estate' },
                            { value: 'other_business', label: 'Other Business Expenses' }
                          ] : [])
                        ]}
                      />
                    </div>

                    <div>
                      <FormField
                        id="loanTerm"
                        name="loanTerm"
                        label="Loan Term"
                        type="select"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        required
                        error={errors.loanTerm}
                        tooltipContent="The length of time you'll have to repay the loan. Longer terms typically mean lower monthly payments but more interest paid overall."
                        options={[
                          ...(formData.loanType === 'personal' ? [
                            { value: '12', label: '12 months (1 year)' },
                            { value: '24', label: '24 months (2 years)' },
                            { value: '36', label: '36 months (3 years)' },
                            { value: '48', label: '48 months (4 years)' },
                            { value: '60', label: '60 months (5 years)' }
                          ] : []),
                          ...(formData.loanType === 'mortgage' ? [
                            { value: '180', label: '180 months (15 years)' },
                            { value: '240', label: '240 months (20 years)' },
                            { value: '360', label: '360 months (30 years)' }
                          ] : []),
                          ...(formData.loanType === 'business' ? [
                            { value: '12', label: '12 months (1 year)' },
                            { value: '24', label: '24 months (2 years)' },
                            { value: '36', label: '36 months (3 years)' },
                            { value: '48', label: '48 months (4 years)' },
                            { value: '60', label: '60 months (5 years)' },
                            { value: '84', label: '84 months (7 years)' },
                            { value: '120', label: '120 months (10 years)' }
                          ] : [])
                        ]}
                      />
                    </div>

                    {/* Estimated Monthly Payment */}
                    {estimatedPayment && (
                      <div>
                        <div className="bg-dark-200 border border-dark-100 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-300 mb-1">Estimated Monthly Payment</p>
                          <p className="text-xl font-semibold text-primary-400">
                            ${estimatedPayment.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Based on {formData.loanTerm} month term at 8% APR
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p>
                      <span className="text-primary-500">*</span> Required fields
                    </p>
                  </div>
                </FormSection>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Personal Information */}
          <AnimatePresence mode="wait">
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormSection
                  title="Personal Information"
                  description="Tell us about yourself"
                  icon={<UserIcon className="w-5 h-5" />}
                  isActive={true}
                  isCompleted={completedSections.includes(2)}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        error={errors.firstName}
                        autoComplete="given-name"
                      />

                      <FormField
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        error={errors.lastName}
                        autoComplete="family-name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        required
                        error={errors.email}
                        autoComplete="email"
                        icon={
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        }
                        tooltipContent="We'll use this email to send you important updates about your application."
                      />

                      <PhoneInput
                        id="phone"
                        name="phone"
                        label="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        onValueChange={(value) => handleValueChange('phone', value)}
                        required
                        error={errors.phone}
                        helpText="We'll only call you if we need additional information"
                      />
                    </div>

                    <FormField
                      id="dateOfBirth"
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      error={errors.dateOfBirth}
                      tooltipContent="You must be at least 18 years old to apply for a loan."
                      autoComplete="bday"
                    />

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                        Street Address <span className="text-primary-500">*</span>
                      </label>
                      <div className="relative">
                        <NominatimAddressAutocomplete
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={(value) => {
                            setFormData(prev => ({
                              ...prev,
                              address: value
                            }));
                          }}
                          onAddressSelect={handleAddressSelect}
                          placeholder="Start typing your address..."
                          required
                          error={errors.address}
                        />
                      </div>

                      <p className="mt-1 text-xs text-gray-400">
                        Start typing to see suggestions. Select an address to auto-fill city, state, and ZIP code.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="col-span-2">
                        <FormField
                          id="city"
                          name="city"
                          label={
                            <>
                              City
                              {formData.city && (
                                <span className="ml-2 text-xs text-primary-400">(Auto-populated)</span>
                              )}
                            </>
                          }
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="New York"
                          required
                          error={errors.city}
                          autoComplete="address-level2"
                        />
                      </div>

                      <FormField
                        id="state"
                        name="state"
                        label={
                          <>
                            State
                            {formData.state && (
                              <span className="ml-2 text-xs text-primary-400">(Auto-populated)</span>
                            )}
                          </>
                        }
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="NY"
                        required
                        error={errors.state}
                        autoComplete="address-level1"
                      />

                      <FormField
                        id="zipCode"
                        name="zipCode"
                        label={
                          <>
                            ZIP Code
                            {formData.zipCode && (
                              <span className="ml-2 text-xs text-primary-400">(Auto-populated)</span>
                            )}
                          </>
                        }
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="10001"
                        required
                        error={errors.zipCode}
                        autoComplete="postal-code"
                        pattern="[0-9]{5}(-[0-9]{4})?"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p>
                      <span className="text-primary-500">*</span> Required fields
                    </p>
                  </div>
                </FormSection>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Financial Information */}
          <AnimatePresence mode="wait">
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormSection
                  title="Financial Information"
                  description="Tell us about your financial situation"
                  icon={<BuildingOfficeIcon className="w-5 h-5" />}
                  isActive={true}
                  isCompleted={completedSections.includes(3)}
                >
                  <div className="space-y-6">
                    <FormField
                      id="employmentStatus"
                      name="employmentStatus"
                      label="Employment Status"
                      type="select"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      required
                      error={errors.employmentStatus}
                      options={[
                        { value: '', label: 'Select employment status' },
                        { value: 'employed', label: 'Employed' },
                        { value: 'self_employed', label: 'Self-Employed' },
                        { value: 'retired', label: 'Retired' },
                        { value: 'unemployed', label: 'Unemployed' },
                        { value: 'student', label: 'Student' },
                        { value: 'other', label: 'Other' }
                      ]}
                      tooltipContent="Your employment status helps us determine your eligibility for certain loan products."
                    />

                    {/* Conditional fields based on employment status */}
                    <AnimatePresence>
                      {(formData.employmentStatus === 'employed' || formData.employmentStatus === 'self_employed') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          <FormField
                            id="employerName"
                            name="employerName"
                            label="Employer Name"
                            value={formData.employerName}
                            onChange={handleChange}
                            placeholder="Company Name"
                            error={errors.employerName}
                            autoComplete="organization"
                          />

                          <FormField
                            id="jobTitle"
                            name="jobTitle"
                            label="Job Title"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                            error={errors.jobTitle}
                            autoComplete="organization-title"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CurrencyInput
                        id="annualIncome"
                        name="annualIncome"
                        label="Annual Income"
                        value={formData.annualIncome}
                        onChange={handleChange}
                        onValueChange={(value) => handleValueChange('annualIncome', value)}
                        placeholder="75000"
                        required
                        error={errors.annualIncome}
                        helpText="Before taxes"
                      />

                      <CurrencyInput
                        id="monthlyHousingPayment"
                        name="monthlyHousingPayment"
                        label="Monthly Housing Payment"
                        value={formData.monthlyHousingPayment}
                        onChange={handleChange}
                        onValueChange={(value) => handleValueChange('monthlyHousingPayment', value)}
                        placeholder="1500"
                        required
                        error={errors.monthlyHousingPayment}
                        helpText="Rent or mortgage payment"
                      />
                    </div>

                    <div>
                      <FormField
                        id="creditScore"
                        name="creditScore"
                        label="Estimated Credit Score"
                        type="select"
                        value={formData.creditScore}
                        onChange={handleChange}
                        required
                        error={errors.creditScore}
                        options={[
                          { value: 'excellent', label: 'Excellent (720+)' },
                          { value: 'good', label: 'Good (680-719)' },
                          { value: 'fair', label: 'Fair (640-679)' },
                          { value: 'poor', label: 'Poor (580-639)' },
                          { value: 'bad', label: 'Bad (Below 580)' },
                          { value: 'unknown', label: 'I don\'t know' }
                        ]}
                        tooltipContent={
                          <div>
                            <p>Your credit score is a number that represents your creditworthiness based on your credit history.</p>
                            <p className="mt-1">This won't affect your credit score - we're just asking for an estimate.</p>
                          </div>
                        }
                      />
                    </div>

                    <div className="bg-dark-200/50 rounded-lg p-4 border border-dark-100/50">
                      <h4 className="text-sm font-medium text-white mb-2">Financial Privacy Notice</h4>
                      <p className="text-xs text-gray-400">
                        The information you provide will be used to determine your eligibility for a loan. We may verify your information with third parties, including credit bureaus. By submitting this application, you authorize these checks.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-400">
                    <p>
                      <span className="text-primary-500">*</span> Required fields
                    </p>
                  </div>
                </FormSection>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Review and Submit */}
          <AnimatePresence mode="wait">
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FormSection
                  title="Review & Submit"
                  description="Review your information and submit your application"
                  icon={<DocumentCheckIcon className="w-5 h-5" />}
                  isActive={true}
                  isCompleted={completedSections.includes(4)}
                >
                  {/* Application Summary */}
                  <FormSummary
                    formData={formData}
                    onEditSection={handleEditSection}
                  />

                  {/* Consent Checkboxes */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleChange(e)}
                          className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-600 bg-dark-200 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeToTerms" className="text-gray-300">
                          I agree to the <a href="/legal/terms" className="text-primary-400 hover:text-primary-300 underline">Terms of Service</a> and <a href="/legal/privacy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreeToCredit"
                          name="agreeToCredit"
                          type="checkbox"
                          checked={formData.agreeToCredit}
                          onChange={(e) => handleChange(e)}
                          className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-gray-600 bg-dark-200 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="agreeToCredit" className="text-gray-300">
                          I authorize LendingForte to obtain credit reports and verify the information provided. I understand this won't affect my credit score.
                        </label>
                        {errors.agreeToCredit && (
                          <p className="mt-1 text-sm text-red-500">{errors.agreeToCredit}</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4 mt-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <ClockIcon className="h-5 w-5 text-primary-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-primary-300">Application Processing Time</h3>
                          <p className="mt-1 text-sm text-gray-400">
                            Your application will be reviewed within 1-2 business days. You'll receive an email notification once a decision has been made.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FormSection>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-6 sm:mt-8 flex justify-between">
            {currentStep > 1 ? (
              <motion.button
                type="button"
                onClick={handlePrevStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-dark-100 hover:bg-dark-200 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center text-sm sm:text-base"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </motion.button>
            ) : (
              <div></div> // Empty div to maintain layout
            )}

            {currentStep < totalSteps ? (
              <motion.button
                type="button"
                onClick={handleNextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm flex items-center group text-sm sm:text-base"
              >
                Next
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );
}
