'use client';

import React from 'react';
import { DocumentCheckIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import FormField from '@/components/ui/form-field';

interface ReviewSectionProps {
  formData: {
    // Loan Information
    loanType: string;
    loanAmount: string;
    loanPurpose: string;
    loanTerm: string;
    
    // Personal Information
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    
    // Financial Information
    employmentStatus: string;
    employerName: string;
    jobTitle: string;
    annualIncome: string;
    monthlyHousingPayment: string;
    creditScore: string;
    
    // Consent
    agreeToTerms: boolean;
    agreeToCredit: boolean;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  estimatedPayment: number | null;
}

export default function ReviewSection({
  formData,
  errors,
  handleChange,
  estimatedPayment
}: ReviewSectionProps) {
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
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-4 pb-4 border-b border-dark-100/50">
        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
          <DocumentCheckIcon className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Review & Submit</h3>
          <p className="text-gray-400 text-sm">Review your information and submit your application</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Loan Summary */}
        <div className="p-4 bg-dark-100/30 rounded-lg border border-dark-50">
          <div className="flex items-center space-x-3 mb-3">
            <DocumentCheckIcon className="w-5 h-5 text-primary-400" />
            <h4 className="text-lg font-medium text-white">Loan Details</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Loan Type</span>
              <span className="text-white font-medium">{formatLoanType(formData.loanType)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Loan Amount</span>
              <span className="text-white font-medium">{formatCurrency(formData.loanAmount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Loan Purpose</span>
              <span className="text-white font-medium">{formatLoanType(formData.loanPurpose)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Loan Term</span>
              <span className="text-white font-medium">{formData.loanTerm} months</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Est. Monthly Payment</span>
              <span className="text-primary-400 font-semibold">{estimatedPayment ? `$${estimatedPayment.toFixed(2)}` : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Personal Information Summary */}
        <div className="p-4 bg-dark-100/30 rounded-lg border border-dark-50">
          <div className="flex items-center space-x-3 mb-3">
            <DocumentCheckIcon className="w-5 h-5 text-primary-400" />
            <h4 className="text-lg font-medium text-white">Personal Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Name</span>
              <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Email</span>
              <span className="text-white font-medium">{formData.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Phone</span>
              <span className="text-white font-medium">{formData.phone}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Date of Birth</span>
              <span className="text-white font-medium">{formData.dateOfBirth}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50 md:col-span-2">
              <span className="text-gray-400">Address</span>
              <span className="text-white font-medium text-right">{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</span>
            </div>
          </div>
        </div>

        {/* Financial Information Summary */}
        <div className="p-4 bg-dark-100/30 rounded-lg border border-dark-50">
          <div className="flex items-center space-x-3 mb-3">
            <DocumentCheckIcon className="w-5 h-5 text-primary-400" />
            <h4 className="text-lg font-medium text-white">Financial Information</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Employment Status</span>
              <span className="text-white font-medium">{formatLoanType(formData.employmentStatus)}</span>
            </div>
            {(formData.employmentStatus === 'full-time' || 
              formData.employmentStatus === 'part-time' || 
              formData.employmentStatus === 'self-employed') && (
              <>
                <div className="flex justify-between py-2 border-b border-dark-50/50">
                  <span className="text-gray-400">Employer</span>
                  <span className="text-white font-medium">{formData.employerName || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dark-50/50">
                  <span className="text-gray-400">Job Title</span>
                  <span className="text-white font-medium">{formData.jobTitle || 'N/A'}</span>
                </div>
              </>
            )}
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Annual Income</span>
              <span className="text-white font-medium">{formatCurrency(formData.annualIncome)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Monthly Housing Payment</span>
              <span className="text-white font-medium">{formatCurrency(formData.monthlyHousingPayment)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-dark-50/50">
              <span className="text-gray-400">Credit Score Range</span>
              <span className="text-white font-medium">{formatLoanType(formData.creditScore)}</span>
            </div>
          </div>
        </div>

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
    </div>
  );
}
