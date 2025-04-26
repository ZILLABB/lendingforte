"use client";

import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { push, ref } from "firebase/database";
import { database } from "../../config"; // Assuming you have firebase configuration
import Link from "next/link";
import { motion } from "framer-motion";
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
  CreditCardIcon
} from "@heroicons/react/24/outline";
import { Country, State, City } from 'country-state-city';

// Function to generate a random 9-digit application number
const generateApplicationNumber = () => {
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
  return randomNumber.toString().substring(0, 9);
};

export default function LoanApplicationPage() {
  // Generated application number
  const generatedNumber = generateApplicationNumber();
  
  // Step for multi-step form navigation
  const [step, setStep] = useState(1);

  // Form data state with expanded fields
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    ssn: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    
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
    
    // Identity Verification
    idType: "",
    idNumber: "",
    idIssueDate: "",
    idExpirationDate: "",
    citizenshipStatus: "",
    
    // Contact Information
    phoneNumber: "",
    alternatePhone: "",
    email: "",
    preferredContact: "email",
    
    // Employment & Income
    employmentStatus: "",
    employerName: "",
    employerAddress: "",
    jobTitle: "",
    employmentLength: "",
    workPhone: "",
    monthlyIncome: "",
    payFrequency: "",
    otherIncomeSource: "",
    otherIncomeAmount: "",
    
    // Loan Details
    loanType: "",
    requestedAmount: "",
    loanPurpose: "",
    tenure: "",
    preferredStartDate: "",
    collateralType: "",
    collateralValue: "",
    
    // Financial Obligations
    existingLoan: false,
    existingLoans: [{ lender: "", monthlyPayment: "", remainingBalance: "" }],
    monthlyDebtPayments: "",
    hasBankruptcy: false,
    bankruptcyDate: "",
    hasForeclosure: false,
    foreclosureDate: "",
    
    // Banking Information
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",
    
    // Agreement
    creditCheckConsent: false,
    needCosigner: false,
    agreement: false,
    
    // Application ID
    code: generatedNumber,
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modern step headers with animation
  const steps = [
    { id: 1, title: 'Personal Information', icon: <UserIcon className="w-5 h-5" /> },
    { id: 2, title: 'Identity & Address', icon: <IdentificationIcon className="w-5 h-5" /> },
    { id: 3, title: 'Employment & Income', icon: <BriefcaseIcon className="w-5 h-5" /> },
    { id: 4, title: 'Loan Details', icon: <BanknotesIcon className="w-5 h-5" /> },
    { id: 5, title: 'Financial & Banking', icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: 6, title: 'Review & Submit', icon: <HomeIcon className="w-5 h-5" /> },
  ];

  // State for inline errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Replace direct router usage with a safer approach
  const [router, setRouter] = useState<any>(null);
  
  // Initialize router only after component mounts on client
  useEffect(() => {
    // Import and set router dynamically
    import('next/navigation').then((mod) => {
      setRouter(mod.useRouter());
    });
  }, []);
  
  // Add loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for existing loans
  const [existingLoans, setExistingLoans] = useState([
    { lender: "", monthlyPayment: "", remainingBalance: "" }
  ]);
  
  // Add input mask helper for SSN
  const formatSSN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as XXX-XX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    }
  };

  // Add input mask for phone numbers
  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  // Handle SSN input with formatting
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatSSN(e.target.value);
    setFormData({
      ...formData,
      ssn: formattedValue
    });
    
    // Clear the error for the field being changed
    if (formErrors.ssn) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.ssn;
        return newErrors;
      });
    }
  };

  // Handle phone input with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const formattedValue = formatPhone(e.target.value);
    setFormData({
      ...formData,
      [name]: formattedValue
    });
    
    // Clear the error for the field being changed
    if (formErrors[name]) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: checked,
    });
    
    // Handle dependent fields
    if (name === "existingLoan" && !checked) {
      // If user unchecks existing loan, reset the loans array
      setExistingLoans([{ lender: "", monthlyPayment: "", remainingBalance: "" }]);
    }

    if (name === "hasBankruptcy" && !checked) {
      // If user unchecks bankruptcy, clear the date
      setFormData({
        ...formData,
        bankruptcyDate: "",
        [name]: checked
      });
    }

    if (name === "hasForeclosure" && !checked) {
      // If user unchecks foreclosure, clear the date
      setFormData({
        ...formData,
        foreclosureDate: "",
        [name]: checked
      });
    }
    
    // Clear the error for the field being changed
    if (formErrors[name]) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Add another existing loan field
  const addExistingLoan = () => {
    setExistingLoans([...existingLoans, { lender: "", monthlyPayment: "", remainingBalance: "" }]);
  };
  
  // Remove an existing loan field
  const removeExistingLoan = (index: number) => {
    const updatedLoans = [...existingLoans];
    updatedLoans.splice(index, 1);
    setExistingLoans(updatedLoans);
    
    // Update the formData with the latest loans
    setFormData({
      ...formData,
      existingLoans: updatedLoans
    });
  };
  
  // Handle changes to existing loan fields
  const handleExistingLoanChange = (index: number, field: string, value: string) => {
    const updatedLoans = [...existingLoans];
    updatedLoans[index] = { ...updatedLoans[index], [field]: value };
    setExistingLoans(updatedLoans);
    
    // Update the formData with the latest loans
    setFormData({
      ...formData,
      existingLoans: updatedLoans
    });
  };

  // Handle next step in the form
  const handleNextStep = () => {
    if (!validateCurrentStep(step)) {
        // Get error field names and display them in the toast
        const errorFields = Object.keys(formErrors);
        if (errorFields.length > 0) {
            console.log("Validation errors:", formErrors); // Debug errors
            const errorMessage = `Please fix the following: ${errorFields.map(field => 
                `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} - ${formErrors[field]}`
            ).join(', ')}`;
            toast.error(errorMessage, { theme: "colored" });
        } else {
            toast.error("Please fix the errors before proceeding.", { theme: "colored" });
        }
        return; // Block navigation
    }
    setFormErrors({}); // Clear errors before moving to the next step
    setStep((prev) => Math.min(steps.length, prev + 1));
  };

  // Handle previous step in the form
  const handlePreviousStep = () => {
    setFormErrors({}); // Clear errors when going back
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === "checkbox";
    // Need type assertion for checked property
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value,
    });

    // Handle dependent fields
    if (name === "existingLoan" && !checked) {
      // If user unchecks existing loan, reset the loans array
      setExistingLoans([{ lender: "", monthlyPayment: "", remainingBalance: "" }]);
    }

    if (name === "hasBankruptcy" && !checked) {
      // If user unchecks bankruptcy, clear the date
      setFormData({
        ...formData,
        bankruptcyDate: "",
        [name]: checked
      });
    }

    if (name === "hasForeclosure" && !checked) {
      // If user unchecks foreclosure, clear the date
      setFormData({
        ...formData,
        foreclosureDate: "",
        [name]: checked
      });
    }

    // Clear the error for the field being changed
    if (formErrors[name]) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Function to send email via EmailJS
  const handleEmailJs = () => {
    emailjs
      .send(
        "service_mmu6bro",
        "template_e9tvy3f",
        formData,
        "mRm23xSD-WMIu8ZDK"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        toast.success("Your loan application has been submitted successfully!", {
          theme: "colored",
        });
        setIsModalOpen(true);
      })
      .catch(() =>
        toast.error("Something went wrong! Please try again later.", {
          theme: "colored",
        })
      );
  };

  // Function to save data to Firebase
  const handleFireBase = () => {
    try {
      const dbRef = ref(database, "loan-application");
      push(dbRef, formData);
    } catch (error) {
      toast.error("Something went wrong! Please try again later.", {
        theme: "colored",
      });
    }
  };

  // Updated validation function
  const validateCurrentStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    const MIN_LOAN_AGE = 18;

    switch (currentStep) {
      case 1: // Personal Information
        if (!formData.firstName?.trim()) errors.firstName = "First name is required.";
        if (!formData.lastName?.trim()) errors.lastName = "Last name is required.";
        if (!formData.dob) {
          errors.dob = "Date of birth is required.";
        } else {
          const dobDate = new Date(formData.dob);
          if (isNaN(dobDate.getTime())) {
            errors.dob = "Invalid date format.";
          } else {
            const today = new Date();
            let age = today.getFullYear() - dobDate.getFullYear();
            const monthDiff = today.getMonth() - dobDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
              age--;
            }
            if (age < MIN_LOAN_AGE) {
              errors.dob = `You must be at least ${MIN_LOAN_AGE} years old.`;
            }
          }
        }
        if (!formData.ssn?.trim()) {
           errors.ssn = "Social Security Number is required.";
        } else if (!ssnRegex.test(formData.ssn)) {
           errors.ssn = "SSN must be in XXX-XX-XXXX format.";
        }
        if (!formData.maritalStatus?.trim()) errors.maritalStatus = "Marital status is required.";
        break;

      case 2: // Identity & Address
        if (!formData.streetAddress?.trim()) errors.streetAddress = "Street address is required.";
        if (!formData.city?.trim()) errors.city = "City is required.";
        if (!formData.state?.trim()) errors.state = "State is required.";
        if (!formData.zipCode?.trim()) errors.zipCode = "ZIP code is required.";
        if (!formData.yearsAtAddress?.trim()) errors.yearsAtAddress = "Years at address is required.";
        if (!formData.housingStatus?.trim()) errors.housingStatus = "Housing status is required.";
        if (!formData.monthlyHousingCost?.trim()) errors.monthlyHousingCost = "Monthly housing cost is required.";
        
        if (!formData.idType?.trim()) errors.idType = "ID type is required.";
        if (!formData.idNumber?.trim()) errors.idNumber = "ID number is required.";
        if (!formData.idExpirationDate?.trim()) errors.idExpirationDate = "ID expiration date is required.";
        if (!formData.citizenshipStatus?.trim()) errors.citizenshipStatus = "Citizenship status is required.";
        break;

      case 3: // Employment & Income
        if (!formData.employmentStatus?.trim()) errors.employmentStatus = "Employment status is required.";
        
        // Only validate employer details if employed or self-employed
        if (formData.employmentStatus === "Employed Full-Time" || formData.employmentStatus === "Employed Part-Time" || formData.employmentStatus === "Self-Employed") {
          if (!formData.employerName?.trim()) errors.employerName = "Employer name is required.";
          if (!formData.jobTitle?.trim()) errors.jobTitle = "Job title is required.";
          if (!formData.employmentLength?.trim()) errors.employmentLength = "Length of employment is required.";
        }
        
        if (!formData.monthlyIncome?.trim()) {
          errors.monthlyIncome = "Monthly income is required.";
        } else if (Number(formData.monthlyIncome) <= 0) {
          errors.monthlyIncome = "Monthly income must be a positive number.";
        }
        
        if (!formData.payFrequency?.trim()) errors.payFrequency = "Pay frequency is required.";
        
        if (!formData.phoneNumber?.trim()) {
          errors.phoneNumber = "Phone number is required.";
        } else if (!phoneRegex.test(formData.phoneNumber)) {
          errors.phoneNumber = "Invalid phone number format.";
        }
        
        if (!formData.email?.trim()) {
          errors.email = "Email address is required.";
        } else if (!emailRegex.test(formData.email)) {
          errors.email = "Invalid email address format.";
        }
        break;

      case 4: // Loan Details
        if (!formData.loanType?.trim()) errors.loanType = "Loan type is required.";
        if (!formData.loanPurpose?.trim()) errors.loanPurpose = "Loan purpose is required.";
        
        if (!formData.requestedAmount?.trim()) {
          errors.requestedAmount = "Requested loan amount is required.";
        } else if (Number(formData.requestedAmount) <= 0) {
          errors.requestedAmount = "Requested amount must be a positive number.";
        }
        
        if (!formData.tenure?.trim()) {
          errors.tenure = "Loan tenure is required.";
        } else if (Number(formData.tenure) <= 0) {
          errors.tenure = "Loan tenure must be a positive number.";
        }
        
        if (!formData.preferredStartDate?.trim()) errors.preferredStartDate = "Preferred start date is required.";
        
        // If loan type is secured, validate collateral
        if (formData.loanType === "Secured Personal Loan" || 
            formData.loanType === "Auto Loan" || 
            formData.loanType === "Mortgage") {
          if (!formData.collateralType?.trim()) errors.collateralType = "Collateral type is required.";
          if (!formData.collateralValue?.trim()) errors.collateralValue = "Collateral value is required.";
        }
        break;

      case 5: // Financial Obligations & Banking
        // Validate existing loans if user has them
        if (formData.existingLoan) {
          let validLoans = true;
          existingLoans.forEach((loan, index) => {
            if (!loan.lender.trim() || !loan.monthlyPayment.trim() || !loan.remainingBalance.trim()) {
              validLoans = false;
            }
          });
          
          if (!validLoans) {
            errors.existingLoans = "Please complete all existing loan details or remove incomplete entries.";
          }
        }
        
        // Validate bankruptcy date if applicable
        if (formData.hasBankruptcy && !formData.bankruptcyDate?.trim()) {
          errors.bankruptcyDate = "Please provide the bankruptcy date.";
        }
        
        // Validate foreclosure date if applicable
        if (formData.hasForeclosure && !formData.foreclosureDate?.trim()) {
          errors.foreclosureDate = "Please provide the foreclosure date.";
        }
        
        if (!formData.bankName?.trim()) errors.bankName = "Bank name is required.";
        if (!formData.accountType?.trim()) errors.accountType = "Account type is required.";
        if (!formData.accountNumber?.trim()) errors.accountNumber = "Account number is required.";
        if (!formData.routingNumber?.trim()) {
          errors.routingNumber = "Routing number is required.";
        } else if (formData.routingNumber.length !== 9) {
          errors.routingNumber = "Routing number must be 9 digits.";
        }
        
        if (!formData.creditCheckConsent) {
          errors.creditCheckConsent = "You must consent to a credit check to proceed.";
        }
        break;

      case 6: // Review & Submit
        if (!formData.agreement) {
          errors.agreement = "You must agree to the terms and conditions.";
        }
        break;

      default:
        break;
    }

    setFormErrors(errors); // Update the error state
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Enhanced email and Firebase submission with loading state
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate the current step again before submission
    if (step === 6) {
        if (!validateCurrentStep(step)) {
            // Show specific errors for the review step
            const errorFields = Object.keys(formErrors);
            if (errorFields.length > 0) {
                const errorMessage = `Please fix the following issues: ${errorFields.map(field => 
                    `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} - ${formErrors[field]}`
                ).join(', ')}`;
                toast.error(errorMessage, { theme: "colored" });
            } else {
                toast.error("Please fix all errors before submitting.", { theme: "colored" });
            }
            return;
        }
        
        if (!formData.agreement) {
            setFormErrors(prev => ({...prev, agreement: "You must agree to the terms and conditions."}));
            toast.error("You must agree to the terms and conditions.", { theme: "colored" });
            return;
        }
    }

    // Set loading state
    setIsSubmitting(true);
    
    // Submit to both services
    Promise.all([
      // EmailJS submission
      emailjs.send(
        "service_mmu6bro",
        "template_e9tvy3f",
        formData,
        "mRm23xSD-WMIu8ZDK"
      ),
      // Firebase submission
      new Promise((resolve, reject) => {
        try {
          const dbRef = ref(database, "loan-application");
          push(dbRef, formData);
          resolve("Firebase submission successful");
        } catch (error) {
          reject(error);
        }
      })
    ])
    .then(() => {
      toast.success("Your loan application has been submitted successfully!", {
        theme: "colored",
      });
      setIsModalOpen(true);
    })
    .catch((error) => {
      console.error("Submission error:", error);
      toast.error(`Submission error: ${error.message || "Something went wrong! Please try again later."}`, {
        theme: "colored",
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};

  // And in any place you use the router, add a check
  const navigateHome = () => {
    if (router) {
      router.push('/');
    }
  };

  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (formData.country) {
      const countryData = countries.find(c => c.name === formData.country);
      if (countryData) {
        const countryStates = State.getStatesOfCountry(countryData.isoCode);
        setStates(countryStates);
        
        // Reset state and city if country changes
        if (!countryStates.find(s => s.name === formData.state)) {
          setFormData(prev => ({
            ...prev,
            state: '',
            city: ''
          }));
          setCities([]);
        }
      }
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.country && formData.state) {
      const countryData = countries.find(c => c.name === formData.country);
      const stateData = states.find(s => s.name === formData.state);
      
      if (countryData && stateData) {
        const stateCities = City.getCitiesOfState(
          countryData.isoCode,
          stateData.isoCode
        );
        setCities(stateCities);
        
        // Reset city if state changes and current city isn't in new state
        if (!stateCities.find(c => c.name === formData.city)) {
          setFormData(prev => ({
            ...prev,
            city: ''
          }));
        }
      }
    }
  }, [formData.state, formData.country]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 pt-24 px-4">
      <ToastContainer position="top-center" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Loan Application
          </h1>
          <p className="text-gray-300 text-lg">
            Complete your application with all required information for faster processing
          </p>
        </motion.div>

        {/* Step progress indicator */}
        <div className="mb-8 hidden md:flex justify-between items-center px-4">
          {steps.map((stepItem, index) => (
            <div key={stepItem.id} className="flex items-center relative">
              {/* Step connection line */}
              {index > 0 && (
                <div 
                  className={`absolute h-1 w-full right-1/2 top-1/2 -z-10 ${
                    step > index ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                  style={{ right: '50%', width: '100%', transform: 'translateX(50%)' }}
                ></div>
              )}
              
              {/* Step circle */}
              <div 
                className={`relative z-10 h-12 w-12 flex items-center justify-center rounded-full 
                  ${step > stepItem.id 
                    ? 'bg-green-500 text-white' 
                    : step === stepItem.id 
                      ? 'bg-green-600 ring-4 ring-green-300/30 text-white' 
                      : 'bg-gray-700 text-gray-300'}`}
              >
                {stepItem.icon}
              </div>
              
              {/* Step title (hidden on mobile) */}
              <span className="absolute whitespace-nowrap text-xs font-medium text-gray-300 -bottom-6 left-1/2 transform -translate-x-1/2">
                {stepItem.title}
              </span>
            </div>
          ))}
        </div>
        
        {/* Mobile step display */}
        <div className="md:hidden mb-6 px-2">
          <p className="text-center text-gray-300 mb-2">
            Step {step} of {steps.length}: <span className="font-medium text-green-400">{steps[step-1].title}</span>
          </p>
          <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${(step / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
                <UserIcon className="w-6 h-6 mr-2 text-green-400" /> Personal Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.firstName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      required
                    />
                    {formErrors.firstName && <p className="text-xs text-red-400 mt-1">{formErrors.firstName}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="middleName" className="text-sm font-medium text-gray-300">Middle Name</label>
                    <input
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                      id="middleName"
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="Marie"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.lastName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                    />
                    {formErrors.lastName && <p className="text-xs text-red-400 mt-1">{formErrors.lastName}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="dob" className="text-sm font-medium text-gray-300">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.dob ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="dob"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="mm/dd/yyyy"
                      required
                      max={new Date().toISOString().split("T")[0]}
                    />
                    {formErrors.dob && <p className="text-xs text-red-400 mt-1">{formErrors.dob}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="ssn" className="text-sm font-medium text-gray-300">
                      Social Security Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                          focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.ssn ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                        id="ssn"
                        type="text"
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleSSNChange}
                        placeholder="XXX-XX-XXXX"
                        maxLength={11}
                        aria-describedby="ssn-format"
                      />
                      <ShieldCheckIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    {formErrors.ssn && <p className="text-xs text-red-400 mt-1">{formErrors.ssn}</p>}
                    <p id="ssn-format" className="text-xs text-gray-400 mt-1">Format: XXX-XX-XXXX</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="gender" className="text-sm font-medium text-gray-300">Gender (Optional)</label>
                    <select
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="maritalStatus" className="text-sm font-medium text-gray-300">Marital Status <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.maritalStatus ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Separated">Separated</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                    {formErrors.maritalStatus && <p className="text-xs text-red-400 mt-1">{formErrors.maritalStatus}</p>}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors"
                  >
                    Next <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
                <IdentificationIcon className="w-6 h-6 mr-2 text-green-400" /> Identity & Address
              </h2>
              
              <div className="space-y-6">
                {/* Address Information */}
                <h3 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">Current Address</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-1">
                    <label htmlFor="streetAddress" className="text-sm font-medium text-gray-300">Street Address <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.streetAddress ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="streetAddress"
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      required
                    />
                    {formErrors.streetAddress && <p className="text-xs text-red-400 mt-1">{formErrors.streetAddress}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="apartmentUnit" className="text-sm font-medium text-gray-300">Apartment/Unit</label>
                    <input
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                      id="apartmentUnit"
                      type="text"
                      name="apartmentUnit"
                      value={formData.apartmentUnit}
                      onChange={handleChange}
                      placeholder="Apt 4B"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="country" className="text-sm font-medium text-gray-300">Country <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.country ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country.isoCode} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.country && <p className="text-xs text-red-400 mt-1">{formErrors.country}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="state" className="text-sm font-medium text-gray-300">State/Province <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.state ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={!formData.country}
                      required
                    >
                      <option value="">Select State/Province</option>
                      {states.map(state => (
                        <option key={state.isoCode} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.state && <p className="text-xs text-red-400 mt-1">{formErrors.state}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-sm font-medium text-gray-300">City <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.city ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!formData.state}
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map(city => (
                        <option key={`${city.name}-${city.stateCode}`} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.city && <p className="text-xs text-red-400 mt-1">{formErrors.city}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="zipCode" className="text-sm font-medium text-gray-300">ZIP/Postal Code <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.zipCode ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="zipCode"
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="10001"
                      required
                    />
                    {formErrors.zipCode && <p className="text-xs text-red-400 mt-1">{formErrors.zipCode}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="yearsAtAddress" className="text-sm font-medium text-gray-300">Years at Address <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.yearsAtAddress ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="yearsAtAddress"
                      type="number"
                      name="yearsAtAddress"
                      value={formData.yearsAtAddress}
                      onChange={handleChange}
                      placeholder="3"
                      min="0"
                      step="0.5"
                      required
                    />
                    {formErrors.yearsAtAddress && <p className="text-xs text-red-400 mt-1">{formErrors.yearsAtAddress}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="housingStatus" className="text-sm font-medium text-gray-300">Housing Status <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.housingStatus ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="housingStatus"
                      name="housingStatus"
                      value={formData.housingStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Own">Own</option>
                      <option value="Rent">Rent</option>
                      <option value="Live with Family">Live with Family</option>
                      <option value="Military Housing">Military Housing</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.housingStatus && <p className="text-xs text-red-400 mt-1">{formErrors.housingStatus}</p>}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="monthlyHousingCost" className="text-sm font-medium text-gray-300">Monthly Housing Cost <span className="text-red-500">*</span></label>
                  <input
                    className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                      focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.monthlyHousingCost ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                    id="monthlyHousingCost"
                    type="number"
                    name="monthlyHousingCost"
                    value={formData.monthlyHousingCost}
                    onChange={handleChange}
                    placeholder="1200"
                    min="0"
                    required
                  />
                  {formErrors.monthlyHousingCost && <p className="text-xs text-red-400 mt-1">{formErrors.monthlyHousingCost}</p>}
                </div>
                
                {/* Identity Verification */}
                <h3 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2 mt-8">Identity Verification</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="idType" className="text-sm font-medium text-gray-300">ID Type <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.idType ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="idType"
                      name="idType"
                      value={formData.idType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select ID Type</option>
                      <option value="Driver's License">Driver's License</option>
                      <option value="State ID">State ID</option>
                      <option value="Passport">Passport</option>
                      <option value="Military ID">Military ID</option>
                    </select>
                    {formErrors.idType && <p className="text-xs text-red-400 mt-1">{formErrors.idType}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="idNumber" className="text-sm font-medium text-gray-300">ID Number <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.idNumber ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="idNumber"
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      placeholder="DL12345678"
                      required
                    />
                    {formErrors.idNumber && <p className="text-xs text-red-400 mt-1">{formErrors.idNumber}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="citizenshipStatus" className="text-sm font-medium text-gray-300">Citizenship Status <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.citizenshipStatus ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="citizenshipStatus"
                      name="citizenshipStatus"
                      value={formData.citizenshipStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="U.S. Citizen">U.S. Citizen</option>
                      <option value="Permanent Resident">Permanent Resident</option>
                      <option value="Visa Holder">Visa Holder</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.citizenshipStatus && <p className="text-xs text-red-400 mt-1">{formErrors.citizenshipStatus}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="idIssueDate" className="text-sm font-medium text-gray-300">Issue Date <span className="text-red-500">*</span></label>
                      <input
                        className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                          focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.idIssueDate ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                        id="idIssueDate"
                        type="date"
                        name="idIssueDate"
                        value={formData.idIssueDate}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.idIssueDate && <p className="text-xs text-red-400 mt-1">{formErrors.idIssueDate}</p>}
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="idExpirationDate" className="text-sm font-medium text-gray-300">Expiration Date <span className="text-red-500">*</span></label>
                      <input
                        className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                          focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.idExpirationDate ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                        id="idExpirationDate"
                        type="date"
                        name="idExpirationDate"
                        value={formData.idExpirationDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {formErrors.idExpirationDate && <p className="text-xs text-red-400 mt-1">{formErrors.idExpirationDate}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors"
                  >
                    <ArrowLeftIcon className="w-4 h-4" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors"
                  >
                    Next <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
                <BriefcaseIcon className="w-6 h-6 mr-2 text-green-400" /> Employment & Income
              </h2>
              
              <div className="space-y-6">
                {/* Employment Info Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="employmentStatus" className="text-sm font-medium text-gray-300">Employment Status <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.employmentStatus ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Employed Full-Time">Employed Full-Time</option>
                      <option value="Employed Part-Time">Employed Part-Time</option>
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Retired">Retired</option>
                      <option value="Student">Student</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.employmentStatus && <p className="text-xs text-red-400 mt-1">{formErrors.employmentStatus}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="employerName" className="text-sm font-medium text-gray-300">
                      Employer Name {(formData.employmentStatus === "Employed Full-Time" || 
                                     formData.employmentStatus === "Employed Part-Time" || 
                                     formData.employmentStatus === "Self-Employed") && 
                                    <span className="text-red-500">*</span>}
                    </label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.employerName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="employerName"
                      type="text"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                      required={(formData.employmentStatus === "Employed Full-Time" || 
                                formData.employmentStatus === "Employed Part-Time" || 
                                formData.employmentStatus === "Self-Employed")}
                    />
                    {formErrors.employerName && <p className="text-xs text-red-400 mt-1">{formErrors.employerName}</p>}
                  </div>
                </div>
                
                {/* Add Contact Information Section with clear section header */}
                <h3 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2 mt-8">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.phoneNumber ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="phoneNumber"
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                    {formErrors.phoneNumber && <p className="text-xs text-red-400 mt-1">{formErrors.phoneNumber}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.email ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                    {formErrors.email && <p className="text-xs text-red-400 mt-1">{formErrors.email}</p>}
                  </div>
                </div>
                
                {/* Continue with the rest of the employment details */}
                <div className="space-y-1">
                  <label htmlFor="employerAddress" className="text-sm font-medium text-gray-300">
                    Employer Address {(formData.employmentStatus === "Employed Full-Time" || 
                                     formData.employmentStatus === "Employed Part-Time" || 
                                     formData.employmentStatus === "Self-Employed") && 
                                    <span className="text-red-500">*</span>}
                  </label>
                  <input
                    className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                      focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.employerAddress ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                    id="employerAddress"
                    type="text"
                    name="employerAddress"
                    value={formData.employerAddress}
                    onChange={handleChange}
                    placeholder="123 Business Ave, Suite 500, New York, NY 10001"
                    required={(formData.employmentStatus === "Employed Full-Time" || 
                              formData.employmentStatus === "Employed Part-Time" || 
                              formData.employmentStatus === "Self-Employed")}
                  />
                  {formErrors.employerAddress && <p className="text-xs text-red-400 mt-1">{formErrors.employerAddress}</p>}
                </div>
                
                {/* Rest of the form fields for employment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="jobTitle" className="text-sm font-medium text-gray-300">
                      Job Title {(formData.employmentStatus === "Employed Full-Time" || 
                                  formData.employmentStatus === "Employed Part-Time" || 
                                  formData.employmentStatus === "Self-Employed") && 
                                <span className="text-red-500">*</span>}
                    </label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.jobTitle ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="jobTitle"
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                      required={(formData.employmentStatus === "Employed Full-Time" || 
                                formData.employmentStatus === "Employed Part-Time" || 
                                formData.employmentStatus === "Self-Employed")}
                    />
                    {formErrors.jobTitle && <p className="text-xs text-red-400 mt-1">{formErrors.jobTitle}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="employmentLength" className="text-sm font-medium text-gray-300">
                      Length of Employment {(formData.employmentStatus === "Employed Full-Time" || 
                                            formData.employmentStatus === "Employed Part-Time" || 
                                            formData.employmentStatus === "Self-Employed") && 
                                          <span className="text-red-500">*</span>}
                    </label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.employmentLength ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="employmentLength"
                      type="text"
                      name="employmentLength"
                      value={formData.employmentLength}
                      onChange={handleChange}
                      placeholder="3 years 2 months"
                      required={(formData.employmentStatus === "Employed Full-Time" || 
                                formData.employmentStatus === "Employed Part-Time" || 
                                formData.employmentStatus === "Self-Employed")}
                    />
                    {formErrors.employmentLength && <p className="text-xs text-red-400 mt-1">{formErrors.employmentLength}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="workPhone" className="text-sm font-medium text-gray-300">Work Phone</label>
                    <input
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                      id="workPhone"
                      type="tel"
                      name="workPhone"
                      value={formData.workPhone}
                      onChange={handlePhoneChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                {/* Income Details */}
                <h3 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2 mt-8">Income Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-300">Monthly Gross Income <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">$</span>
                      </div>
                      <input
                        className={`w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                          focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.monthlyIncome ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                        id="monthlyIncome"
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        placeholder="5000"
                        min="1"
                        required
                      />
                    </div>
                    {formErrors.monthlyIncome && <p className="text-xs text-red-400 mt-1">{formErrors.monthlyIncome}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="payFrequency" className="text-sm font-medium text-gray-300">Pay Frequency <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.payFrequency ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="payFrequency"
                      name="payFrequency"
                      value={formData.payFrequency}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Frequency</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-Weekly">Bi-Weekly</option>
                      <option value="Semi-Monthly">Semi-Monthly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                    {formErrors.payFrequency && <p className="text-xs text-red-400 mt-1">{formErrors.payFrequency}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="otherIncomeSource" className="text-sm font-medium text-gray-300">Other Income Source</label>
                    <input
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                      id="otherIncomeSource"
                      type="text"
                      name="otherIncomeSource"
                      value={formData.otherIncomeSource}
                      onChange={handleChange}
                      placeholder="Rental, Investment, etc."
                    />
                  </div>
                </div>
                
                {formData.otherIncomeSource && (
                  <div className="space-y-1">
                    <label htmlFor="otherIncomeAmount" className="text-sm font-medium text-gray-300">Other Income Amount (Monthly)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">$</span>
                      </div>
                      <input
                        className="w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                          focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                        id="otherIncomeAmount"
                        type="number"
                        name="otherIncomeAmount"
                        value={formData.otherIncomeAmount}
                        onChange={handleChange}
                        placeholder="1000"
                        min="1"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors"
                  >
                    <ArrowLeftIcon className="w-4 h-4" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors"
                  >
                    Next <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
                <BanknotesIcon className="w-6 h-6 mr-2 text-green-400" /> Loan Details
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="loanType" className="text-sm font-medium text-gray-300">Loan Type <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.loanType ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="loanType"
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Loan Type</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Auto Loan">Auto Loan</option>
                      <option value="Mortgage">Mortgage</option>
                      <option value="Student Loan">Student Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Credit Card Consolidation">Credit Card Consolidation</option>
                      <option value="Home Equity">Home Equity</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.loanType && <p className="text-xs text-red-400 mt-1">{formErrors.loanType}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="loanPurpose" className="text-sm font-medium text-gray-300">Loan Purpose <span className="text-red-500">*</span></label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.loanPurpose ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="loanPurpose"
                      name="loanPurpose"
                      value={formData.loanPurpose}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Purpose</option>
                      <option value="Debt Consolidation">Debt Consolidation</option>
                      <option value="Home Improvement">Home Improvement</option>
                      <option value="Major Purchase">Major Purchase</option>
                      <option value="Education">Education</option>
                      <option value="Business">Business</option>
                      <option value="Auto Purchase">Auto Purchase</option>
                      <option value="Medical Expenses">Medical Expenses</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Moving/Relocation">Moving/Relocation</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.loanPurpose && <p className="text-xs text-red-400 mt-1">{formErrors.loanPurpose}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="requestedAmount" className="text-sm font-medium text-gray-300">Requested Loan Amount <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">$</span>
                      </div>
                      <input
                        className={`w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                          focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.requestedAmount ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                        id="requestedAmount"
                        type="number"
                        name="requestedAmount"
                        value={formData.requestedAmount}
                        onChange={handleChange}
                        placeholder="15000"
                        min="1000"
                        required
                      />
                    </div>
                    {formErrors.requestedAmount && <p className="text-xs text-red-400 mt-1">{formErrors.requestedAmount}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="tenure" className="text-sm font-medium text-gray-300">
                      Loan Term (months) <span className="text-red-500">*</span>
                    </label>
                    <select
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.tenure ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="tenure"
                      name="tenure"
                      value={formData.tenure}
                      onChange={handleChange}
                      required
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
                    {formErrors.tenure && <p className="text-xs text-red-400 mt-1">{formErrors.tenure}</p>}
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="preferredStartDate" className="text-sm font-medium text-gray-300">Preferred Start Date</label>
                    <input
                      className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                      id="preferredStartDate"
                      type="date"
                      name="preferredStartDate"
                      value={formData.preferredStartDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="accountNumber" className="text-sm font-medium text-gray-300">Account Number <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.accountNumber ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="accountNumber"
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="Enter last 4 digits only"
                      maxLength={4}
                      required
                    />
                    {formErrors.accountNumber && <p className="text-xs text-red-400 mt-1">{formErrors.accountNumber}</p>}
                    <p className="text-xs text-gray-400 mt-1">For security, please only enter the last 4 digits</p>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="routingNumber" className="text-sm font-medium text-gray-300">Routing Number <span className="text-red-500">*</span></label>
                    <input
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                        focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.routingNumber ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                      id="routingNumber"
                      type="text"
                      name="routingNumber"
                      value={formData.routingNumber}
                      onChange={handleChange}
                      placeholder="9 digit routing number"
                      maxLength={9}
                      required
                    />
                    {formErrors.routingNumber && <p className="text-xs text-red-400 mt-1">{formErrors.routingNumber}</p>}
                  </div>
                </div>
                
                {/* Make sure the credit check consent checkbox is clearly visible and properly highlighted if there's an error */}
                <div className="mt-6 space-y-4">
                  <div className={`flex items-start ${formErrors.creditCheckConsent ? 'p-3 bg-red-400/10 rounded-lg border border-red-400' : ''}`}>
                    <div className="flex items-center h-5">
                      <input
                        id="creditCheckConsent"
                        name="creditCheckConsent"
                        type="checkbox"
                        checked={formData.creditCheckConsent}
                        onChange={handleCheckboxChange}
                        className={`h-5 w-5 rounded border-gray-600 text-green-500 focus:ring-green-500 
                          ${formErrors.creditCheckConsent ? 'border-red-400' : ''}`}
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="creditCheckConsent" className={`font-medium ${formErrors.creditCheckConsent ? 'text-red-400' : 'text-gray-300'}`}>
                        Credit Check Consent <span className="text-red-500">*</span>
                      </label>
                      <p className="text-gray-400">I consent to a credit check as part of this loan application process.</p>
                      {formErrors.creditCheckConsent && <p className="text-xs text-red-400 mt-1">{formErrors.creditCheckConsent}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="needCosigner"
                        name="needCosigner"
                        type="checkbox"
                        checked={formData.needCosigner}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                      />
                    </div>
                    <label htmlFor="needCosigner" className="ml-3 text-sm text-gray-300">
                      I would like to add a co-signer to this application.
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreement"
                        name="agreement"
                        type="checkbox"
                        checked={formData.agreement}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                        required
                      />
                    </div>
                    <label htmlFor="agreement" className="ml-3 text-sm text-gray-300">
                      I certify that all information provided is accurate and complete. I acknowledge that providing false 
                      information may result in legal consequences. I have read and agree to the terms and conditions, 
                      privacy policy, and consent to electronic communication.
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                  </div>
                  {formErrors.agreement && <p className="text-xs text-red-400 mt-1">{formErrors.agreement}</p>}
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <ArrowLeftIcon className="w-4 h-4" /> Previous
                  </button>
                  
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg
                      font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>Submit Application</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
                <CheckCircleIcon className="w-6 h-6 mr-2 text-green-400" /> Review & Submit
              </h2>
              
              <div className="space-y-6">
                {/* Application summary */}
                <div className="bg-gray-700/30 rounded-lg p-5 border border-gray-600">
                  <h3 className="text-lg font-medium text-gray-200 mb-4">Application Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    <div>
                      <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Personal Information</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span className="text-gray-200 font-medium">{formData.firstName} {formData.middleName ? formData.middleName + ' ' : ''}{formData.lastName}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">SSN:</span>
                          <span className="text-gray-200 font-medium">XXX-XX-{formData.ssn.slice(-4)}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Date of Birth:</span>
                          <span className="text-gray-200 font-medium">{formData.dob}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Loan Details</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-400">Loan Type:</span>
                          <span className="text-gray-200 font-medium">{formData.loanType}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="text-gray-200 font-medium">${Number(formData.requestedAmount).toLocaleString()}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Term:</span>
                          <span className="text-gray-200 font-medium">{formData.tenure} months</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Employment</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className="text-gray-200 font-medium">{formData.employmentStatus}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Monthly Income:</span>
                          <span className="text-gray-200 font-medium">${Number(formData.monthlyIncome).toLocaleString()}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Contact</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-400">Email:</span>
                          <span className="text-gray-200 font-medium">{formData.email}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">Phone:</span>
                          <span className="text-gray-200 font-medium">{formData.phoneNumber}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Agreements and Disclosures */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-200">Agreements & Disclosures</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="creditCheckConsent"
                          name="creditCheckConsent"
                          type="checkbox"
                          checked={formData.creditCheckConsent}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                          required
                        />
                      </div>
                      <label htmlFor="creditCheckConsent" className="ml-3 text-sm text-gray-300">
                        I authorize a credit check to be performed and understand this may affect my credit score.
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                    </div>
                    {formErrors.creditCheckConsent && <p className="text-xs text-red-400 mt-1">{formErrors.creditCheckConsent}</p>}
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="needCosigner"
                          name="needCosigner"
                          type="checkbox"
                          checked={formData.needCosigner}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                        />
                      </div>
                      <label htmlFor="needCosigner" className="ml-3 text-sm text-gray-300">
                        I would like to add a co-signer to this application.
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="agreement"
                          name="agreement"
                          type="checkbox"
                          checked={formData.agreement}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-600 text-green-600 focus:ring-green-500 bg-gray-700"
                          required
                        />
                      </div>
                      <label htmlFor="agreement" className="ml-3 text-sm text-gray-300">
                        I certify that all information provided is accurate and complete. I acknowledge that providing false 
                        information may result in legal consequences. I have read and agree to the terms and conditions, 
                        privacy policy, and consent to electronic communication.
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                    </div>
                    {formErrors.agreement && <p className="text-xs text-red-400 mt-1">{formErrors.agreement}</p>}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg
                      font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <ArrowLeftIcon className="w-4 h-4" /> Previous
                  </button>
                  
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-lg
                      font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>Submit Application</>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </form>

        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
          >
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full mx-4">
              <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-center text-gray-100 mb-4">
                Application Submitted!
              </h2>
              <p className="text-center text-gray-300 mb-2">
                Your application number is:
              </p>
              <p className="text-center font-mono text-xl text-green-500 font-bold mb-6 bg-gray-900/50 py-2 rounded-lg">
                {generatedNumber}
              </p>
              <p className="text-center text-gray-300 mb-6">
                Please save this number for future reference. We will review your application and contact you soon.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg
                    font-medium transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/"
                  className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-3 rounded-lg
                    font-medium transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
