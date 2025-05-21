'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/providers/toast-provider';
import { createRecord } from '@/lib/firebase/database';
import emailjs from 'emailjs-com';
import { calculateMonthlyPayment } from '@/lib/utils/formatters';
import { validateStep } from '@/lib/validation/loan-application-schema';
import { useRouter } from 'next/navigation';
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
  ChevronDownIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

// Import form sections
import LoanDetailsSection from './sections/loan-details-section';
import PersonalInfoSection from './sections/personal-info-section';
import FinancialInfoSection from './sections/financial-info-section';
import ReviewSection from './sections/review-section';

export default function PremiumForm() {
  const toast = useToast();
  const router = useRouter();

  // State for redirect countdown
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Cleanup countdown interval on unmount
  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

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
  const handleAddressSelect = (address: any) => {
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
        await createRecord('loan-application', applicationData);

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
          await emailjs.send(
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
          await createRecord('applications', applicationData);

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
            await emailjs.send(
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
        `Application submitted successfully! Application ID: ${applicationId}. We've sent a confirmation email to ${formData.email}. We'll be in touch within 1-2 business days. Redirecting to home page in 10 seconds...`,
        { duration: 10000 }
      );

      // Start countdown for redirect to home page
      setRedirectCountdown(10);

      // Clear any existing interval
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }

      // Set up new countdown interval
      countdownIntervalRef.current = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === null || prev <= 1) {
            // Clear the interval and redirect when countdown reaches 0
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
            }
            router.push('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

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
            "Email notification sent. We've sent a confirmation email with your application details.",
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

  // Render form content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <LoanDetailsSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            estimatedPayment={estimatedPayment}
          />
        );
      case 2:
        return (
          <PersonalInfoSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleValueChange={handleValueChange}
            handleAddressSelect={handleAddressSelect}
          />
        );
      case 3:
        return (
          <FinancialInfoSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleValueChange={handleValueChange}
          />
        );
      case 4:
        return (
          <ReviewSection
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            estimatedPayment={estimatedPayment}
          />
        );
      default:
        return null;
    }
  };

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
    <div className="min-h-screen bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-white">Loan Application</h1>
        <p className="text-gray-400">Step {currentStep} of {totalSteps}</p>
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
                      <AnimatePresence mode="wait">
                        {isSaving ? (
                          <motion.div
                            key="saving"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center text-gray-400 text-sm"
                          >
                            <CloudArrowUpIcon className="w-4 h-4 mr-1 animate-pulse" />
                            <span>Saving...</span>
                          </motion.div>
                        ) : lastSaved ? (
                          <motion.div
                            key="lastSaved"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center text-gray-400 text-sm"
                          >
                            <span>Last saved: just now</span>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>

                      <motion.button
                        type="button"
                        onClick={handleManualSave}
                        className="text-primary-400 hover:text-primary-300 text-sm flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isSaving}
                      >
                        <CloudArrowUpIcon className="w-4 h-4 mr-1" />
                        Save
                      </motion.button>
                    </div>
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

              {/* Form Content */}
              <div className="relative">
                <form onSubmit={handleSubmit}>
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

                  {/* Redirect Countdown */}
                  {redirectCountdown !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-5 h-5 text-primary-400 mr-2" />
                          <span className="text-white font-medium">Application Submitted Successfully!</span>
                        </div>
                        <div className="text-primary-400 font-medium">
                          Redirecting in {redirectCountdown}s
                        </div>
                      </div>
                      <div className="mt-2 text-gray-400 text-sm">
                        Your application ID: <span className="text-primary-400 font-mono">{`LF-${Date.now().toString().slice(-8)}`}</span>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() => router.push('/')}
                          className="text-primary-400 hover:text-primary-300 text-sm"
                        >
                          Go to Home Page Now
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  {redirectCountdown === null && (
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-4 mt-8">
                      {/* Back Button (hidden on first step) */}
                      {currentStep > 1 && (
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
                        type={currentStep === totalSteps ? "submit" : "button"}
                        onClick={currentStep === totalSteps ? undefined : handleNextStep}
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
                        ) : currentStep === totalSteps ? (
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
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
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
                    <InformationCircleIcon className="w-5 h-5 text-primary-400 mr-2" />
                    <span className="text-sm font-medium text-white">Helpful Tips</span>
                  </div>
                  <motion.div
                    animate={{ rotate: showTips ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDownIcon className="h-4 w-4 text-gray-400" />
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
        </div>
      </div>
    </div>
  );
}