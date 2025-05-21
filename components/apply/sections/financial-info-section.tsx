'use client';

import React from 'react';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import FormField from '@/components/ui/form-field';
import CurrencyInput from '@/components/ui/currency-input';

interface FinancialInfoSectionProps {
  formData: {
    employmentStatus: string;
    employerName: string;
    jobTitle: string;
    annualIncome: string;
    monthlyHousingPayment: string;
    creditScore: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleValueChange: (name: string, value: string) => void;
}

export default function FinancialInfoSection({
  formData,
  errors,
  handleChange,
  handleValueChange
}: FinancialInfoSectionProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center space-x-4 pb-4 border-b border-dark-100/50">
        <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
          <CreditCardIcon className="w-5 h-5 text-primary-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Financial Information</h3>
          <p className="text-gray-400 text-sm">Tell us about your financial situation</p>
        </div>
      </div>

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
            <option value="">Select Employment Status</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="self-employed">Self-employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="retired">Retired</option>
            <option value="student">Student</option>
            <option value="other">Other</option>
          </select>
        </FormField>

        {/* Employer Information - Only show if employed */}
        {(formData.employmentStatus === 'full-time' || 
          formData.employmentStatus === 'part-time' || 
          formData.employmentStatus === 'self-employed') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Employer Name"
              name="employerName"
              error={errors.employerName}
              required
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
              required
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

        {/* Income and Housing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Credit Score */}
        <FormField
          label="Estimated Credit Score"
          name="creditScore"
          error={errors.creditScore}
          required
          tooltip="Select the range that best matches your credit score"
        >
          <select
            id="creditScore"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            className={`w-full bg-dark-100 border ${errors.creditScore ? 'border-red-500' : 'border-dark-50'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all`}
          >
            <option value="">Select Credit Score Range</option>
            <option value="excellent">Excellent (720+)</option>
            <option value="good">Good (690-719)</option>
            <option value="fair">Fair (630-689)</option>
            <option value="poor">Poor (580-629)</option>
            <option value="bad">Bad (Below 580)</option>
            <option value="no-score">No Credit Score</option>
          </select>
        </FormField>

        {/* Credit Score Information */}
        <div className="p-4 bg-dark-100/50 border border-dark-50 rounded-lg">
          <h4 className="text-sm font-medium text-white mb-2">Why we ask about your credit score</h4>
          <p className="text-xs text-gray-400">
            Your credit score helps us determine your eligibility and interest rate. We don't perform a hard credit check at this stage.
            A formal credit check will only be performed if you proceed with the application after pre-approval.
          </p>
        </div>
      </div>
    </div>
  );
}
