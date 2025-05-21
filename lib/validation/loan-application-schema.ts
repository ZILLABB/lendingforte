import { z } from 'zod';
import { isValidPhoneNumber } from '@/lib/utils/formatters';

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ZIP code validation regex (5 digit or 5+4 digit formats)
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

// Base schema with common fields
const baseFormSchema = z.object({});

// Step 1: Loan Information Schema
export const loanDetailsSchema = z.object({
  loanType: z.enum(['personal', 'mortgage', 'business'], {
    required_error: 'Loan type is required',
  }),
  loanAmount: z.string()
    .min(1, 'Loan amount is required')
    .refine(val => !isNaN(Number(val)), 'Please enter a valid loan amount')
    .refine(val => Number(val) >= 1000, 'Minimum loan amount is $1,000')
    .refine(val => Number(val) <= 100000, 'Maximum loan amount is $100,000'),
  loanPurpose: z.string().min(1, 'Please select a loan purpose'),
  loanTerm: z.string().min(1, 'Please select a loan term'),
});

// Step 2: Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email address is required')
    .regex(emailRegex, 'Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine(val => val.length === 10 || isValidPhoneNumber(val), 'Phone number must be in format (XXX) XXX-XXXX'),
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine(val => {
      const dob = new Date(val);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return age >= 18;
    }, 'You must be at least 18 years old')
    .refine(val => {
      const dob = new Date(val);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      return age <= 100;
    }, 'Please enter a valid date of birth'),
  address: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string()
    .min(1, 'ZIP code is required')
    .regex(zipCodeRegex, 'Please enter a valid ZIP code'),
});

// Step 3: Financial Information Schema
export const financialInfoSchema = z.object({
  employmentStatus: z.string().min(1, 'Employment status is required'),
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  annualIncome: z.string()
    .min(1, 'Annual income is required')
    .refine(val => !isNaN(Number(val.replace(/,/g, ''))), 'Please enter a valid annual income')
    .refine(val => Number(val.replace(/,/g, '')) > 0, 'Annual income must be greater than zero'),
  monthlyHousingPayment: z.string()
    .min(1, 'Monthly housing payment is required')
    .refine(val => !isNaN(Number(val.replace(/,/g, ''))), 'Please enter a valid monthly housing payment')
    .refine(val => Number(val.replace(/,/g, '')) >= 0, 'Monthly housing payment cannot be negative'),
  creditScore: z.string().min(1, 'Credit score is required'),
}).refine(data => {
  // If employed or self-employed, employer name and job title are required
  if (['employed', 'self_employed'].includes(data.employmentStatus)) {
    return !!data.employerName && !!data.jobTitle;
  }
  return true;
}, {
  message: 'Employer name and job title are required for employed individuals',
  path: ['employerName'],
});

// Step 4: Consent Schema
export const consentSchema = z.object({
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
  agreeToCredit: z.boolean().refine(val => val === true, 'You must agree to the credit check'),
});

// Combined schema for the entire form
export const fullFormSchema = loanDetailsSchema
  .merge(personalInfoSchema)
  .merge(financialInfoSchema)
  .merge(consentSchema);

// Function to validate a specific step
export const validateStep = (data: any, step: number) => {
  try {
    switch (step) {
      case 1:
        return { success: true, data: loanDetailsSchema.parse(data) };
      case 2:
        return { success: true, data: personalInfoSchema.parse(data) };
      case 3:
        return { success: true, data: financialInfoSchema.parse(data) };
      case 4:
        return { success: true, data: consentSchema.parse(data) };
      default:
        return { success: false, error: 'Invalid step' };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convert Zod errors to a more usable format
      const formattedErrors: Record<string, string> = {};
      error.errors.forEach(err => {
        if (err.path.length > 0) {
          formattedErrors[err.path[0]] = err.message;
        }
      });
      return { success: false, error: formattedErrors };
    }
    return { success: false, error: 'Validation failed' };
  }
};
