'use client';

import React from 'react';
import { DocumentCheckIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import ModernFormSection from '../modern-form-section';
import FormField from '@/components/ui/form-field';
import FormSummary from '../form-summary';
import { useFormContext } from '../form-context';

export default function ReviewStep() {
  const { 
    formData, 
    errors, 
    handleChange,
    estimatedPayment
  } = useFormContext();

  // Format currency values
  const formatCurrency = (value: string) => {
    if (!value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numValue);
  };

  // Format loan type for display
  const formatLoanType = (type: string) => {
    if (!type) return '';
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <ModernFormSection
      title="Review & Submit"
      description="Review your information and submit your application"
      icon={<DocumentCheckIcon className="w-5 h-5" />}
      isActive={true}
    >
      <div className="space-y-8">
        {/* Loan Summary */}
        <FormSummary
          title="Loan Details"
          icon={<DocumentCheckIcon className="w-5 h-5" />}
          items={[
            { label: 'Loan Type', value: formatLoanType(formData.loanType) },
            { label: 'Loan Amount', value: formatCurrency(formData.loanAmount) },
            { label: 'Loan Purpose', value: formatLoanType(formData.loanPurpose) },
            { label: 'Loan Term', value: `${formData.loanTerm} months` },
            { label: 'Est. Monthly Payment', value: estimatedPayment ? `$${estimatedPayment.toFixed(2)}` : 'N/A' }
          ]}
        />

        {/* Personal Information Summary */}
        <FormSummary
          title="Personal Information"
          icon={<DocumentCheckIcon className="w-5 h-5" />}
          items={[
            { label: 'Name', value: `${formData.firstName} ${formData.lastName}` },
            { label: 'Email', value: formData.email },
            { label: 'Phone', value: formData.phone },
            { label: 'Date of Birth', value: formData.dateOfBirth },
            { label: 'Address', value: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}` }
          ]}
        />

        {/* Financial Information Summary */}
        <FormSummary
          title="Financial Information"
          icon={<DocumentCheckIcon className="w-5 h-5" />}
          items={[
            { label: 'Employment Status', value: formatLoanType(formData.employmentStatus) },
            { label: 'Employer', value: formData.employerName || 'N/A' },
            { label: 'Job Title', value: formData.jobTitle || 'N/A' },
            { label: 'Annual Income', value: formatCurrency(formData.annualIncome) },
            { label: 'Monthly Housing Payment', value: formatCurrency(formData.monthlyHousingPayment) },
            { label: 'Credit Score Range', value: formatLoanType(formData.creditScore) }
          ]}
        />

        {/* Terms and Conditions */}
        <div className="space-y-4 p-6 bg-dark-100/50 border border-dark-50 rounded-lg">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <ShieldCheckIcon className="w-5 h-5 mr-2 text-primary-400" />
            Terms and Conditions
          </h3>

          <div className="space-y-4">
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
                    className="w-4 h-4 bg-dark-100 border-dark-50 rounded text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="text-gray-300">
                    I agree to the <a href="/terms" target="_blank" className="text-primary-400 hover:text-primary-300 underline">Terms of Service</a> and <a href="/privacy" target="_blank" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a>
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
                    className="w-4 h-4 bg-dark-100 border-dark-50 rounded text-primary-500 focus:ring-primary-500 focus:ring-offset-dark-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToCredit" className="text-gray-300">
                    I authorize LendingForte to verify my information and check my credit report
                  </label>
                </div>
              </div>
            </FormField>
          </div>

          <div className="mt-4 p-3 bg-dark-200 rounded-lg flex items-start">
            <LockClosedIcon className="w-5 h-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-400">
              Your information is encrypted and secure. We use industry-standard security measures to protect your data.
              By submitting this application, you're allowing LendingForte to use your information to process your loan request.
            </p>
          </div>
        </div>
      </div>
    </ModernFormSection>
  );
}
