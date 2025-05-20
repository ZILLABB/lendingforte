"use client";

import { BriefcaseIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface EmploymentIncomeStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formErrors: Record<string, string>;
}

export default function EmploymentIncomeStep({ formData, handleChange, formErrors }: EmploymentIncomeStepProps) {
  // Format currency input
  const formatCurrency = (value: string) => {
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format as currency
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    return formatter.format(Number(digitsOnly)).replace('$', '');
  };
  
  // Handle currency input
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const { value } = e.target;
    const formattedValue = formatCurrency(value);
    
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: fieldName,
        value: formattedValue,
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <BriefcaseIcon className="w-6 h-6 mr-2 text-green-400" /> Employment & Income
      </h2>
      
      <div className="space-y-6">
        {/* Employment Status */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2 text-green-400" /> Employment Information
          </h3>
          
          <div className="space-y-1 mb-6">
            <label htmlFor="employmentStatus" className="text-sm font-medium text-gray-300">
              Employment Status <span className="text-red-500">*</span>
            </label>
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
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Student">Student</option>
              <option value="Military">Military</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.employmentStatus && <p className="text-xs text-red-400 mt-1">{formErrors.employmentStatus}</p>}
          </div>
          
          {/* Only show employer details if employed */}
          {['Full-time', 'Part-time', 'Self-employed', 'Military'].includes(formData.employmentStatus) && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1">
                  <label htmlFor="employerName" className="text-sm font-medium text-gray-300">
                    Employer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                      focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.employerName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                    id="employerName"
                    type="text"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required={['Full-time', 'Part-time', 'Self-employed', 'Military'].includes(formData.employmentStatus)}
                  />
                  {formErrors.employerName && <p className="text-xs text-red-400 mt-1">{formErrors.employerName}</p>}
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="jobTitle" className="text-sm font-medium text-gray-300">
                    Job Title <span className="text-red-500">*</span>
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
                    required={['Full-time', 'Part-time', 'Self-employed', 'Military'].includes(formData.employmentStatus)}
                  />
                  {formErrors.jobTitle && <p className="text-xs text-red-400 mt-1">{formErrors.jobTitle}</p>}
                </div>
              </div>
              
              <div className="space-y-1 mb-6">
                <label htmlFor="employmentLength" className="text-sm font-medium text-gray-300">
                  Length of Employment <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                    focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.employmentLength ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                  id="employmentLength"
                  name="employmentLength"
                  value={formData.employmentLength}
                  onChange={handleChange}
                  required={['Full-time', 'Part-time', 'Self-employed', 'Military'].includes(formData.employmentStatus)}
                >
                  <option value="">Select Length</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="6-10 years">6-10 years</option>
                  <option value="More than 10 years">More than 10 years</option>
                </select>
                {formErrors.employmentLength && <p className="text-xs text-red-400 mt-1">{formErrors.employmentLength}</p>}
              </div>
            </>
          )}
        </div>
        
        {/* Income Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-400" /> Income Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <label htmlFor="annualIncome" className="text-sm font-medium text-gray-300">
                Annual Income (before taxes) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">$</span>
                </div>
                <input
                  className={`w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                    focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.annualIncome ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                  id="annualIncome"
                  type="text"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={(e) => handleCurrencyChange(e, 'annualIncome')}
                  placeholder="75,000"
                  required
                />
              </div>
              {formErrors.annualIncome && <p className="text-xs text-red-400 mt-1">{formErrors.annualIncome}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="payFrequency" className="text-sm font-medium text-gray-300">
                Pay Frequency <span className="text-red-500">*</span>
              </label>
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
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Semi-monthly">Semi-monthly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Annually">Annually</option>
              </select>
              {formErrors.payFrequency && <p className="text-xs text-red-400 mt-1">{formErrors.payFrequency}</p>}
            </div>
          </div>
          
          {/* Other Income */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label htmlFor="otherIncomeSource" className="text-sm font-medium text-gray-300">
                Other Income Source <span className="text-gray-500">(optional)</span>
              </label>
              <input
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                id="otherIncomeSource"
                type="text"
                name="otherIncomeSource"
                value={formData.otherIncomeSource}
                onChange={handleChange}
                placeholder="Rental Income, Investments, etc."
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="otherIncomeAmount" className="text-sm font-medium text-gray-300">
                Other Income Amount (Annual) <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">$</span>
                </div>
                <input
                  className="w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                    focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700"
                  id="otherIncomeAmount"
                  type="text"
                  name="otherIncomeAmount"
                  value={formData.otherIncomeAmount}
                  onChange={(e) => handleCurrencyChange(e, 'otherIncomeAmount')}
                  placeholder="10,000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Income Verification Notice */}
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Income Verification:</span> You may be required to provide documentation 
          to verify your income, such as pay stubs, W-2 forms, or tax returns, during the loan approval process.
        </p>
      </div>
    </motion.div>
  );
}
