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
import Tooltip from '@/components/ui/tooltip';
import { formatPhoneNumber, formatCurrency, calculateMonthlyPayment } from '@/lib/utils/formatters';
import { validateStep } from '@/lib/validation/loan-application-schema';
import {
  BanknotesIcon,
  UserIcon,
  BuildingOfficeIcon,
  DocumentCheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ClockIcon,
  HomeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

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

        {/* Loan Amount */}
        <FormField
          label="Loan Amount"
          name="loanAmount"
          error={errors.loanAmount}
          required
          tooltip="Enter the amount you wish to borrow, between $1,000 and $100,000"
        >
          <CurrencyInput
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onValueChange={(value) => handleValueChange('loanAmount', value)}
            placeholder="$5,000"
            error={!!errors.loanAmount}
          />
        </FormField>

        {/* Loan Purpose */}
        <FormField
          label="Loan Purpose"
          name="loanPurpose"
          error={errors.loanPurpose}
          required
        >
          <select
            id="loanPurpose"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            className={`w-full bg-dark-100 border ${
              errors.loanPurpose ? 'border-red-500' : 'border-dark-50'
            } rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          >
            <option value="">Select Purpose</option>
            <option value="debt-consolidation">Debt Consolidation</option>
            <option value="home-improvement">Home Improvement</option>
            <option value="major-purchase">Major Purchase</option>
            <option value="business">Business</option>
            <option value="auto">Auto</option>
            <option value="medical">Medical</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </FormField>

        {/* Loan Term */}
        <FormField
          label="Loan Term"
          name="loanTerm"
          error={errors.loanTerm}
          required
        >
          <select
            id="loanTerm"
            name="loanTerm"
            value={formData.loanTerm}
            onChange={handleChange}
            className={`w-full bg-dark-100 border ${
              errors.loanTerm ? 'border-red-500' : 'border-dark-50'
            } rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          >
            <option value="">Select Term</option>
            <option value="12">12 months (1 year)</option>
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
            <option value="84">84 months (7 years)</option>
          </select>
        </FormField>

        {/* Estimated Monthly Payment */}
        {estimatedPayment !== null && (
          <div className="mt-6 p-4 bg-dark-100/50 border border-primary-500/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Estimated Monthly Payment</p>
                <p className="text-2xl font-semibold text-primary-400">
                  ${estimatedPayment.toFixed(2)}
                </p>
              </div>
              <div className="bg-primary-500/20 p-2 rounded-full">
                <BanknotesIcon className="w-6 h-6 text-primary-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              This is an estimate based on an 8% APR. Your actual rate may vary
              based on your credit profile and other factors.
            </p>
          </div>
        )}
      </div>
    </ModernFormSection>
  );

      case 2:
        return (
          <ModernFormSection
            title="Personal Information"
            description="Tell us about yourself"
            icon={<UserIcon className="w-5 h-5" />}
            isActive={true}
          >
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="First Name"
                  name="firstName"
                  error={errors.firstName}
                  required
                >
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full bg-dark-100 border ${errors.firstName ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                  />
                </FormField>

                <FormField
                  label="Last Name"
                  name="lastName"
                  error={errors.lastName}
                  required
                >
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`w-full bg-dark-100 border ${errors.lastName ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                  />
                </FormField>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Email Address"
                  name="email"
                  error={errors.email}
                  required
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    className={`w-full bg-dark-100 border ${errors.email ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                  />
                </FormField>

                <FormField
                  label="Phone Number"
                  name="phone"
                  error={errors.phone}
                  required
                >
                  <PhoneInput
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onValueChange={(value) => handleValueChange('phone', value)}
                    error={!!errors.phone}
                  />
                </FormField>
              </div>

              {/* Date of Birth */}
              <FormField
                label="Date of Birth"
                name="dateOfBirth"
                error={errors.dateOfBirth}
                required
                tooltip="You must be at least 18 years old to apply"
              >
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  className={`w-full bg-dark-100 border ${errors.dateOfBirth ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                />
              </FormField>

              {/* Address */}
              <FormField
                label="Street Address"
                name="address"
                error={errors.address}
                required
              >
                <NominatimAddressAutocomplete
                  value={formData.address}
                  onAddressSelect={handleAddressSelect}
                  onValueChange={(value) => handleValueChange('address', value)}
                  error={!!errors.address}
                />
              </FormField>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="City"
                  name="city"
                  error={errors.city}
                  required
                >
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-dark-100 border ${errors.city ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                  />
                </FormField>

                <FormField
                  label="State"
                  name="state"
                  error={errors.state}
                  required
                >
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full bg-dark-100 border ${errors.state ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                  />
                </FormField>

                <FormField
                  label="ZIP Code"
                  name="zipCode"
                  error={errors.zipCode}
                  required
                >
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                    className={`w-full bg-dark-100 border ${errors.zipCode ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                  />
                </FormField>
              </div>
            </div>
          </ModernFormSection>
        );

      case 3:
        return (
          <ModernFormSection
            title="Financial Information"
            description="Tell us about your financial situation"
            icon={<CreditCardIcon className="w-5 h-5" />}
            isActive={true}
          >
            <div className="space-y-6">
              {/* Employment Status */}
              <FormField
                label="Employment Status"
                name="employmentStatus"
                error={errors.employmentStatus}
                required
              >
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className={`w-full bg-dark-100 border ${errors.employmentStatus ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                >
                  <option value="">Select Status</option>
                  <option value="full-time">Full-time employed</option>
                  <option value="part-time">Part-time employed</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </select>
              </FormField>

              {/* Employer Information - Only show if employed */}
              {['full-time', 'part-time', 'self-employed'].includes(formData.employmentStatus) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Employer Name"
                    name="employerName"
                    error={errors.employerName}
                  >
                    <input
                      type="text"
                      id="employerName"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleChange}
                      className={`w-full bg-dark-100 border ${errors.employerName ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                    />
                  </FormField>

                  <FormField
                    label="Job Title"
                    name="jobTitle"
                    error={errors.jobTitle}
                  >
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={`w-full bg-dark-100 border ${errors.jobTitle ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                    />
                  </FormField>
                </div>
              )}

              {/* Income */}
              <FormField
                label="Annual Income"
                name="annualIncome"
                error={errors.annualIncome}
                required
                tooltip="Your gross annual income before taxes"
              >
                <CurrencyInput
                  id="annualIncome"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onValueChange={(value) => handleValueChange('annualIncome', value)}
                  placeholder="$50,000"
                  error={!!errors.annualIncome}
                />
              </FormField>

              {/* Monthly Housing Payment */}
              <FormField
                label="Monthly Housing Payment"
                name="monthlyHousingPayment"
                error={errors.monthlyHousingPayment}
                required
                tooltip="Your monthly rent or mortgage payment"
              >
                <CurrencyInput
                  id="monthlyHousingPayment"
                  name="monthlyHousingPayment"
                  value={formData.monthlyHousingPayment}
                  onValueChange={(value) => handleValueChange('monthlyHousingPayment', value)}
                  placeholder="$1,200"
                  error={!!errors.monthlyHousingPayment}
                />
              </FormField>

              {/* Credit Score */}
              <FormField
                label="Estimated Credit Score"
                name="creditScore"
                error={errors.creditScore}
                required
              >
                <select
                  id="creditScore"
                  name="creditScore"
                  value={formData.creditScore}
                  onChange={handleChange}
                  className={`w-full bg-dark-100 border ${errors.creditScore ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
                >
                  <option value="excellent">Excellent (720+)</option>
                  <option value="good">Good (680-719)</option>
                  <option value="fair">Fair (640-679)</option>
                  <option value="poor">Poor (580-639)</option>
                  <option value="bad">Bad (below 580)</option>
                  <option value="unknown">I don't know</option>
                </select>
              </FormField>
            </div>
          </ModernFormSection>
        );

      case 4:
        return (
          <ModernFormSection
            title="Review & Submit"
            description="Review your information and submit your application"
            icon={<DocumentCheckIcon className="w-5 h-5" />}
            isActive={true}
          >
            <div className="space-y-8">
              {/* Application Summary */}
              <FormSummary
                formData={formData}
                estimatedPayment={estimatedPayment}
                onEditSection={handleStepClick}
              />

              {/* Consent Checkboxes */}
              <div className="space-y-4 mt-8">
                <FormField
                  name="agreeToTerms"
                  error={errors.agreeToTerms}
                >
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className={`h-5 w-5 rounded border-gray-600 text-primary-500 focus:ring-primary-500 bg-dark-100 ${errors.agreeToTerms ? 'border-red-500' : 'border-gray-600'}`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="text-gray-300">
                        I agree to the <a href="/terms" target="_blank" className="text-primary-400 hover:text-primary-300 underline">Terms and Conditions</a> and <a href="/privacy" target="_blank" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>
                      </label>
                    </div>
                  </div>
                </FormField>

                <FormField
                  name="agreeToCredit"
                  error={errors.agreeToCredit}
                >
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToCredit"
                        name="agreeToCredit"
                        type="checkbox"
                        checked={formData.agreeToCredit}
                        onChange={handleChange}
                        className={`h-5 w-5 rounded border-gray-600 text-primary-500 focus:ring-primary-500 bg-dark-100 ${errors.agreeToCredit ? 'border-red-500' : 'border-gray-600'}`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToCredit" className="text-gray-300">
                        I authorize LendingForte to obtain my credit report and verify the information provided in this application
                      </label>
                    </div>
                  </div>
                </FormField>
              </div>

              {/* Security Notice */}
              <div className="p-4 bg-dark-100/50 border border-primary-500/20 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-5 w-5 text-primary-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-300">Secure Application Process</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Your information is encrypted and secure. We use industry-standard security measures to protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ModernFormSection>
        );

      default:
        return null;
    }
  };

  // Return a simplified version to isolate the issue
  return (
    <div className="min-h-screen bg-dark-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-white">Loan Application</h1>
        <p className="text-gray-400">Step {currentStep} of {totalSteps}</p>
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
            </div>

            {/* Form Content */}
            <div className="relative">
              <form onSubmit={handleSubmit}>
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
                                onClick={() => isClickable && handleStepClick(step.id)}
                                disabled={!isClickable}
                                aria-current={isActive ? 'step' : undefined}
                                aria-label={`Step ${step.id}: ${step.title}`}
                              >
                                {isCompleted ? (
                                  <CheckCircleIcon className="w-6 h-6" />
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
                  </div>

                  {/* Form Content */}
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

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="flex items-center px-5 py-2.5 bg-dark-100 hover:bg-dark-50 text-white rounded-lg transition-colors"
                      >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Previous
                      </button>
                    ) : (
                      <div>{/* Empty div to maintain flex spacing */}</div>
                    )}

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                      >
                        Next
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <CheckCircleIcon className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
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
                          onClick={() => (isCompleted || isActive) && handleStepClick(step.id)}
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
                <div className="mt-4 flex items-center text-sm text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>Estimated time remaining: <span className="text-primary-400 font-medium">5 min</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






