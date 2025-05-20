"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { push, ref } from "firebase/database";
import { database } from "../../config";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  UserIcon,
  IdentificationIcon,
  BriefcaseIcon,
  HomeIcon,
  CreditCardIcon,
  LockClosedIcon
} from "@heroicons/react/24/outline";
import { validateCurrentStep } from "./validation-schema";

// Import step components
import PersonalInfoStep from "./steps/personal-info-step";
import AddressIdentityStep from "./steps/address-identity-step";
import EmploymentIncomeStep from "./steps/employment-income-step";
import LoanDetailsStep from "./steps/loan-details-step";
import FinancialBankingStep from "./steps/financial-banking-step";
import ReviewSubmitStep from "./steps/review-submit-step";

// Function to generate a random 9-digit application number
const generateApplicationNumber = () => {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
};

export default function LoanApplicationForm() {
  // Generated application number
  const [applicationNumber, setApplicationNumber] = useState("");

  // Step for multi-step form navigation
  const [step, setStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    email: "",
    phoneNumber: "",

    // Address Information
    streetAddress: "",
    apartmentUnit: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    yearsAtAddress: "",
    housingStatus: "",
    monthlyHousingCost: "",

    // Employment & Income
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    employmentLength: "",
    annualIncome: "",
    payFrequency: "",
    otherIncomeSource: "",
    otherIncomeAmount: "",

    // Loan Details
    loanType: "",
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",

    // Financial Information
    bankName: "",
    accountType: "",
    monthlyDebtPayments: "",
    existingLoans: false,

    // Agreements
    creditCheckConsent: false,
    termsAgreement: false,
    privacyPolicyAgreement: false,

    // Application ID
    applicationId: "",
  });

  // Modal state for success message
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for form validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // State for redirect countdown
  const [redirectCountdown, setRedirectCountdown] = useState(10);

  // Generate application number on component mount
  useEffect(() => {
    setApplicationNumber(generateApplicationNumber());
    setFormData(prev => ({ ...prev, applicationId: generateApplicationNumber() }));

    // Check for saved form data in localStorage
    const savedFormData = localStorage.getItem("loanApplicationData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        toast.info("Your previously saved application data has been loaded.", {
          theme: "colored",
        });
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Save form data to localStorage when it changes
  useEffect(() => {
    if (Object.keys(formData).some(key => formData[key as keyof typeof formData])) {
      localStorage.setItem("loanApplicationData", JSON.stringify(formData));
    }
  }, [formData]);

  // Define steps for the form
  const steps = [
    { id: 1, title: 'Personal Info', icon: <UserIcon className="w-4 h-4" /> },
    { id: 2, title: 'Address', icon: <IdentificationIcon className="w-4 h-4" /> },
    { id: 3, title: 'Employment', icon: <BriefcaseIcon className="w-4 h-4" /> },
    { id: 4, title: 'Loan Details', icon: <BanknotesIcon className="w-4 h-4" /> },
    { id: 5, title: 'Financial', icon: <CreditCardIcon className="w-4 h-4" /> },
    { id: 6, title: 'Review', icon: <CheckCircleIcon className="w-4 h-4" /> },
  ];

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error for this field when it's changed
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle next step navigation
  const handleNextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, steps.length));
      window.scrollTo(0, 0);
    } else {
      // Show error toast if validation fails
      toast.error("Please fix the errors before proceeding.", {
        theme: "colored",
      });
    }
  };

  // Handle previous step navigation
  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // Validate the current step
  const validateStep = () => {
    const errors = validateCurrentStep(formData, step);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) {
      toast.error("Please fix all errors before submitting.", {
        theme: "colored",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Firebase
      const dbRef = ref(database, "loan-applications");
      await push(dbRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
      });

      // Show success message
      toast.success("Your loan application has been submitted successfully!", {
        theme: "colored",
      });

      // Clear localStorage
      localStorage.removeItem("loanApplicationData");

      // Open success modal
      setIsModalOpen(true);

      // Start countdown for automatic redirection
      setRedirectCountdown(10);
      const countdownInterval = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            window.location.href = '/';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.", {
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} formErrors={formErrors} />;
      case 2:
        return <AddressIdentityStep formData={formData} handleChange={handleChange} formErrors={formErrors} />;
      case 3:
        return <EmploymentIncomeStep formData={formData} handleChange={handleChange} formErrors={formErrors} />;
      case 4:
        return <LoanDetailsStep formData={formData} handleChange={handleChange} formErrors={formErrors} />;
      case 5:
        return <FinancialBankingStep formData={formData} handleChange={handleChange} formErrors={formErrors} />;
      case 6:
        return <ReviewSubmitStep formData={formData} handleChange={handleChange} formErrors={formErrors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 pt-20 px-4">
      <ToastContainer position="top-center" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
            Loan Application
          </h1>
          <p className="text-gray-300 text-base">
            Complete your application with all required information for faster processing
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="hidden md:flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= s.id ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {s.icon}
                </div>
                <div className={`ml-1.5 ${step >= s.id ? 'text-gray-200' : 'text-gray-500'} text-xs font-medium`}>
                  <span className="hidden lg:inline">{s.title}</span>
                  <span className="lg:hidden">Step {s.id}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1 ${
                      step > s.id ? 'bg-green-600' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden flex items-center justify-between mb-3">
            <span className="text-gray-300 text-sm">Step {step} of {steps.length}</span>
            <span className="text-gray-300 text-sm">{steps[step - 1].title}</span>
          </div>
          <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden md:hidden">
            <div
              className="bg-green-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {step < steps.length ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
              >
                Next
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
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

        {/* Security notice */}
        <div className="mt-8 flex items-center justify-center text-gray-400 text-sm">
          <LockClosedIcon className="w-4 h-4 mr-2" />
          <p>Your information is secure and encrypted</p>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full"
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircleIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Application Submitted!</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Your application has been successfully submitted. Your reference number is:
                </p>
                <p className="mt-2 text-xl font-mono font-bold text-green-600 dark:text-green-400">
                  {formData.applicationId}
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Please save this number for future reference. We will review your application and contact you soon.
                </p>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Redirecting to home page in <span className="font-bold text-green-600 dark:text-green-400">{redirectCountdown}</span> seconds...
                </div>
                <div className="mt-6 flex gap-3">
                  <Link
                    href="/"
                    className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg
                      font-medium transition-colors"
                  >
                    Return Home Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
