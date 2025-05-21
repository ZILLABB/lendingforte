'use client';

import { motion } from 'framer-motion';
import { formatCurrency, formatDate, formatPhoneNumber } from '@/lib/utils/formatters';
import {
  PencilSquareIcon,
  BanknotesIcon,
  UserIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface FormSummaryProps {
  formData: any;
  estimatedPayment: number | null;
  onEditSection: (section: number) => void;
}

export default function FormSummary({ formData, estimatedPayment, onEditSection }: FormSummaryProps) {
  // Format loan amount
  const formattedLoanAmount = formData.loanAmount
    ? formatCurrency(formData.loanAmount)
    : 'Not specified';

  // Format loan purpose
  const getLoanPurposeLabel = (purpose: string): string => {
    const purposeMap: Record<string, string> = {
      // Personal loan purposes
      debt_consolidation: 'Debt Consolidation',
      home_improvement: 'Home Improvement',
      major_purchase: 'Major Purchase',
      medical_expenses: 'Medical Expenses',
      other_personal: 'Other Personal Expenses',

      // Mortgage purposes
      purchase: 'Home Purchase',
      refinance: 'Refinance',
      home_equity: 'Home Equity',
      construction: 'Construction',
      investment_property: 'Investment Property',

      // Business loan purposes
      working_capital: 'Working Capital',
      equipment: 'Equipment Purchase',
      expansion: 'Business Expansion',
      inventory: 'Inventory Financing',
      commercial_real_estate: 'Commercial Real Estate',
      other_business: 'Other Business Expenses'
    };

    return purposeMap[purpose] || purpose;
  };

  // Format loan term
  const getLoanTermLabel = (term: string): string => {
    const months = parseInt(term);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${months} months`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} and ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  };

  // Format loan type
  const getLoanTypeLabel = (type: string): string => {
    const typeMap: Record<string, string> = {
      personal: 'Personal Loan',
      mortgage: 'Mortgage',
      business: 'Business Loan'
    };

    return typeMap[type] || type;
  };

  // Format employment status
  const getEmploymentStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      employed: 'Employed',
      self_employed: 'Self-Employed',
      retired: 'Retired',
      unemployed: 'Unemployed',
      student: 'Student',
      other: 'Other'
    };

    return statusMap[status] || status;
  };

  // Format credit score
  const getCreditScoreLabel = (score: string): string => {
    const scoreMap: Record<string, string> = {
      excellent: 'Excellent (720+)',
      good: 'Good (690-719)',
      fair: 'Fair (630-689)',
      poor: 'Poor (629 or less)',
      unknown: 'I don\'t know'
    };

    return scoreMap[score] || score;
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Loan Information */}
      <div className="bg-dark-300 rounded-lg p-6 border border-dark-100/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Loan Information</h3>
          <button
            type="button"
            onClick={() => onEditSection(1)}
            className="text-primary-400 hover:text-primary-300 flex items-center text-sm"
          >
            <PencilSquareIcon className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Loan Type</p>
            <p className="text-white">{getLoanTypeLabel(formData.loanType)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Loan Amount</p>
            <p className="text-white">{formattedLoanAmount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Loan Purpose</p>
            <p className="text-white">{getLoanPurposeLabel(formData.loanPurpose)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Loan Term</p>
            <p className="text-white">{getLoanTermLabel(formData.loanTerm)}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-dark-300 rounded-lg p-6 border border-dark-100/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Personal Information</h3>
          <button
            type="button"
            onClick={() => onEditSection(2)}
            className="text-primary-400 hover:text-primary-300 flex items-center text-sm"
          >
            <PencilSquareIcon className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Full Name</p>
            <p className="text-white">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="text-white">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone Number</p>
            <p className="text-white">{formatPhoneNumber(formData.phone)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Date of Birth</p>
            <p className="text-white">{formData.dateOfBirth ? formatDate(formData.dateOfBirth) : 'Not provided'}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-400">Address</p>
            <p className="text-white">
              {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div className="bg-dark-300 rounded-lg p-6 border border-dark-100/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">Financial Information</h3>
          <button
            type="button"
            onClick={() => onEditSection(3)}
            className="text-primary-400 hover:text-primary-300 flex items-center text-sm"
          >
            <PencilSquareIcon className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Employment Status</p>
            <p className="text-white">{getEmploymentStatusLabel(formData.employmentStatus)}</p>
          </div>
          {formData.employmentStatus === 'employed' || formData.employmentStatus === 'self_employed' ? (
            <>
              <div>
                <p className="text-sm text-gray-400">Employer</p>
                <p className="text-white">{formData.employerName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Job Title</p>
                <p className="text-white">{formData.jobTitle || 'Not provided'}</p>
              </div>
            </>
          ) : null}
          <div>
            <p className="text-sm text-gray-400">Annual Income</p>
            <p className="text-white">{formData.annualIncome ? formatCurrency(formData.annualIncome) : 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Monthly Housing Payment</p>
            <p className="text-white">{formData.monthlyHousingPayment ? formatCurrency(formData.monthlyHousingPayment) : 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Credit Score</p>
            <p className="text-white">{getCreditScoreLabel(formData.creditScore)}</p>
          </div>
        </div>
      </div>

      {/* Consent and Submission */}
      <div className="bg-dark-300 rounded-lg p-6 border border-dark-100/50">
        <h3 className="text-lg font-medium text-white mb-4">Consent and Submission</h3>

        <p className="text-gray-400 text-sm mb-4">
          By submitting this application, you certify that all information provided is true and accurate to the best of your knowledge. You authorize LendingForte to verify the information and obtain credit reports.
        </p>

        <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
          <p className="text-sm text-primary-300">
            <span className="font-medium">Privacy Notice:</span> Your information is secure and will only be used for processing your loan application. Please review our Privacy Policy for more details.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
