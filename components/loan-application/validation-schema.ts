// Validation schema for the loan application form

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone number validation regex (formats like (123) 456-7890)
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

// SSN validation regex (formats like XXX-XX-XXXX)
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

// ZIP code validation regex (5 digit or 5+4 digit formats)
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

// Currency validation regex (allows commas and optional decimal places)
const currencyRegex = /^[0-9,]+(\.\d{1,2})?$/;

// Validate step 1: Personal Information
export const validatePersonalInfo = (formData: any) => {
  const errors: Record<string, string> = {};
  
  // First Name
  if (!formData.firstName) {
    errors.firstName = "First name is required";
  } else if (formData.firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  }
  
  // Last Name
  if (!formData.lastName) {
    errors.lastName = "Last name is required";
  } else if (formData.lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  }
  
  // Date of Birth
  if (!formData.dob) {
    errors.dob = "Date of birth is required";
  } else {
    const dobDate = new Date(formData.dob);
    const today = new Date();
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 18);
    
    if (dobDate > today) {
      errors.dob = "Date of birth cannot be in the future";
    } else if (dobDate > minAgeDate) {
      errors.dob = "You must be at least 18 years old";
    }
  }
  
  // SSN
  if (!formData.ssn) {
    errors.ssn = "Social Security Number is required";
  } else if (!ssnRegex.test(formData.ssn)) {
    errors.ssn = "SSN must be in format XXX-XX-XXXX";
  }
  
  // Gender
  if (!formData.gender) {
    errors.gender = "Gender is required";
  }
  
  // Marital Status
  if (!formData.maritalStatus) {
    errors.maritalStatus = "Marital status is required";
  }
  
  // Email
  if (!formData.email) {
    errors.email = "Email address is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  // Phone Number
  if (!formData.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be in format (XXX) XXX-XXXX";
  }
  
  return errors;
};

// Validate step 2: Address & Identity
export const validateAddressIdentity = (formData: any) => {
  const errors: Record<string, string> = {};
  
  // Street Address
  if (!formData.streetAddress) {
    errors.streetAddress = "Street address is required";
  } else if (formData.streetAddress.length < 5) {
    errors.streetAddress = "Please enter a valid street address";
  }
  
  // City
  if (!formData.city) {
    errors.city = "City is required";
  } else if (formData.city.length < 2) {
    errors.city = "Please enter a valid city name";
  }
  
  // State
  if (!formData.state) {
    errors.state = "State is required";
  }
  
  // ZIP Code
  if (!formData.zipCode) {
    errors.zipCode = "ZIP code is required";
  } else if (!zipCodeRegex.test(formData.zipCode)) {
    errors.zipCode = "Please enter a valid ZIP code";
  }
  
  // Years at Address
  if (!formData.yearsAtAddress) {
    errors.yearsAtAddress = "Years at address is required";
  }
  
  // Housing Status
  if (!formData.housingStatus) {
    errors.housingStatus = "Housing status is required";
  }
  
  // Monthly Housing Cost
  if (!formData.monthlyHousingCost) {
    errors.monthlyHousingCost = "Monthly housing cost is required";
  } else if (isNaN(Number(formData.monthlyHousingCost.replace(/,/g, '')))) {
    errors.monthlyHousingCost = "Please enter a valid amount";
  }
  
  return errors;
};

// Validate step 3: Employment & Income
export const validateEmploymentIncome = (formData: any) => {
  const errors: Record<string, string> = {};
  
  // Employment Status
  if (!formData.employmentStatus) {
    errors.employmentStatus = "Employment status is required";
  }
  
  // Employer Name (only required for employed statuses)
  if (['Full-time', 'Part-time', 'Self-employed', 'Military'].includes(formData.employmentStatus)) {
    if (!formData.employerName) {
      errors.employerName = "Employer name is required";
    }
    
    // Job Title
    if (!formData.jobTitle) {
      errors.jobTitle = "Job title is required";
    }
    
    // Employment Length
    if (!formData.employmentLength) {
      errors.employmentLength = "Length of employment is required";
    }
  }
  
  // Annual Income
  if (!formData.annualIncome) {
    errors.annualIncome = "Annual income is required";
  } else if (isNaN(Number(formData.annualIncome.replace(/,/g, '')))) {
    errors.annualIncome = "Please enter a valid amount";
  }
  
  // Pay Frequency
  if (!formData.payFrequency) {
    errors.payFrequency = "Pay frequency is required";
  }
  
  // Other Income Amount (only validate if source is provided)
  if (formData.otherIncomeSource && !formData.otherIncomeAmount) {
    errors.otherIncomeAmount = "Please provide the amount for your other income source";
  } else if (formData.otherIncomeAmount && isNaN(Number(formData.otherIncomeAmount.replace(/,/g, '')))) {
    errors.otherIncomeAmount = "Please enter a valid amount";
  }
  
  return errors;
};

// Validate step 4: Loan Details
export const validateLoanDetails = (formData: any) => {
  const errors: Record<string, string> = {};
  
  // Loan Type
  if (!formData.loanType) {
    errors.loanType = "Loan type is required";
  }
  
  // Loan Purpose
  if (!formData.loanPurpose) {
    errors.loanPurpose = "Loan purpose is required";
  } else if (formData.loanPurpose.length < 5) {
    errors.loanPurpose = "Please provide more details about your loan purpose";
  }
  
  // Loan Amount
  if (!formData.loanAmount) {
    errors.loanAmount = "Loan amount is required";
  } else {
    const amount = Number(formData.loanAmount.replace(/,/g, ''));
    if (isNaN(amount)) {
      errors.loanAmount = "Please enter a valid amount";
    } else if (amount < 1000) {
      errors.loanAmount = "Loan amount must be at least $1,000";
    } else if (amount > 100000) {
      errors.loanAmount = "Loan amount cannot exceed $100,000";
    }
  }
  
  // Loan Term
  if (!formData.loanTerm) {
    errors.loanTerm = "Loan term is required";
  }
  
  return errors;
};

// Validate step 5: Financial & Banking
export const validateFinancialBanking = (formData: any) => {
  const errors: Record<string, string> = {};
  
  // Bank Name
  if (!formData.bankName) {
    errors.bankName = "Bank name is required";
  }
  
  // Account Type
  if (!formData.accountType) {
    errors.accountType = "Account type is required";
  }
  
  // Monthly Debt Payments
  if (!formData.monthlyDebtPayments) {
    errors.monthlyDebtPayments = "Monthly debt payments is required";
  } else if (isNaN(Number(formData.monthlyDebtPayments.replace(/,/g, '')))) {
    errors.monthlyDebtPayments = "Please enter a valid amount";
  }
  
  // Existing Loans
  if (formData.existingLoans === undefined || formData.existingLoans === null) {
    errors.existingLoans = "Please indicate if you have existing loans";
  }
  
  // Agreements
  if (!formData.creditCheckConsent) {
    errors.creditCheckConsent = "You must consent to a credit check";
  }
  
  if (!formData.termsAgreement) {
    errors.termsAgreement = "You must agree to the terms and conditions";
  }
  
  if (!formData.privacyPolicyAgreement) {
    errors.privacyPolicyAgreement = "You must agree to the privacy policy";
  }
  
  return errors;
};

// Validate step 6: Review & Submit
export const validateReviewSubmit = (formData: any) => {
  const errors: Record<string, string> = {};
  
  // Final Confirmation
  if (!formData.finalConfirmation) {
    errors.finalConfirmation = "You must confirm that all information is accurate";
  }
  
  return errors;
};

// Validate the current step
export const validateCurrentStep = (formData: any, step: number) => {
  switch (step) {
    case 1:
      return validatePersonalInfo(formData);
    case 2:
      return validateAddressIdentity(formData);
    case 3:
      return validateEmploymentIncome(formData);
    case 4:
      return validateLoanDetails(formData);
    case 5:
      return validateFinancialBanking(formData);
    case 6:
      return validateReviewSubmit(formData);
    default:
      return {};
  }
};
