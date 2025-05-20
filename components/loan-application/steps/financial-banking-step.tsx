"use client";

import { CreditCardIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface FinancialBankingStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formErrors: Record<string, string>;
}

export default function FinancialBankingStep({ formData, handleChange, formErrors }: FinancialBankingStepProps) {
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
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatCurrency(value);
    
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: 'monthlyDebtPayments',
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
        <CreditCardIcon className="w-6 h-6 mr-2 text-green-400" /> Financial & Banking Information
      </h2>
      
      <div className="space-y-6">
        {/* Banking Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center">
            <BuildingLibraryIcon className="w-5 h-5 mr-2 text-green-400" /> Banking Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1">
              <label htmlFor="bankName" className="text-sm font-medium text-gray-300">
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.bankName ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="bankName"
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Chase, Bank of America, etc."
                required
              />
              {formErrors.bankName && <p className="text-xs text-red-400 mt-1">{formErrors.bankName}</p>}
            </div>
            
            <div className="space-y-1">
              <label htmlFor="accountType" className="text-sm font-medium text-gray-300">
                Account Type <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.accountType ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
                <option value="Both">Both Checking & Savings</option>
              </select>
              {formErrors.accountType && <p className="text-xs text-red-400 mt-1">{formErrors.accountType}</p>}
            </div>
          </div>
        </div>
        
        {/* Financial Obligations */}
        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center">
            <CreditCardIcon className="w-5 h-5 mr-2 text-green-400" /> Financial Obligations
          </h3>
          
          <div className="space-y-1 mb-6">
            <label htmlFor="monthlyDebtPayments" className="text-sm font-medium text-gray-300">
              Total Monthly Debt Payments <span className="text-red-500">*</span>
              <span className="text-xs text-gray-400 ml-2">(credit cards, loans, etc.)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">$</span>
              </div>
              <input
                className={`w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.monthlyDebtPayments ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="monthlyDebtPayments"
                type="text"
                name="monthlyDebtPayments"
                value={formData.monthlyDebtPayments}
                onChange={handleCurrencyChange}
                placeholder="1,200"
                required
              />
            </div>
            {formErrors.monthlyDebtPayments && <p className="text-xs text-red-400 mt-1">{formErrors.monthlyDebtPayments}</p>}
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300 flex items-center">
              Do you have any existing loans? <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex items-center space-x-6 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="existingLoans"
                  value="true"
                  checked={formData.existingLoans === true}
                  onChange={() => {
                    const syntheticEvent = {
                      target: {
                        name: 'existingLoans',
                        value: true,
                        type: 'radio'
                      }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleChange(syntheticEvent);
                  }}
                  className="form-radio h-5 w-5 text-green-500 focus:ring-green-500 focus:ring-offset-gray-800"
                />
                <span className="ml-2 text-gray-300">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="existingLoans"
                  value="false"
                  checked={formData.existingLoans === false}
                  onChange={() => {
                    const syntheticEvent = {
                      target: {
                        name: 'existingLoans',
                        value: false,
                        type: 'radio'
                      }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleChange(syntheticEvent);
                  }}
                  className="form-radio h-5 w-5 text-green-500 focus:ring-green-500 focus:ring-offset-gray-800"
                />
                <span className="ml-2 text-gray-300">No</span>
              </label>
            </div>
            {formErrors.existingLoans && <p className="text-xs text-red-400 mt-1">{formErrors.existingLoans}</p>}
          </div>
        </div>
        
        {/* Agreements */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-200 mb-4">Agreements</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="creditCheckConsent"
                  name="creditCheckConsent"
                  type="checkbox"
                  checked={formData.creditCheckConsent}
                  onChange={(e) => {
                    const syntheticEvent = {
                      target: {
                        name: 'creditCheckConsent',
                        checked: e.target.checked,
                        type: 'checkbox'
                      }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleChange(syntheticEvent);
                  }}
                  className="h-5 w-5 rounded text-green-500 focus:ring-green-500 focus:ring-offset-gray-800 bg-gray-700 border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="creditCheckConsent" className="text-gray-300">
                  I consent to a credit check as part of my loan application. <span className="text-red-500">*</span>
                </label>
                {formErrors.creditCheckConsent && <p className="text-xs text-red-400 mt-1">{formErrors.creditCheckConsent}</p>}
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAgreement"
                  name="termsAgreement"
                  type="checkbox"
                  checked={formData.termsAgreement}
                  onChange={(e) => {
                    const syntheticEvent = {
                      target: {
                        name: 'termsAgreement',
                        checked: e.target.checked,
                        type: 'checkbox'
                      }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleChange(syntheticEvent);
                  }}
                  className="h-5 w-5 rounded text-green-500 focus:ring-green-500 focus:ring-offset-gray-800 bg-gray-700 border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAgreement" className="text-gray-300">
                  I agree to the <a href="/terms" className="text-green-400 hover:text-green-300">Terms and Conditions</a>. <span className="text-red-500">*</span>
                </label>
                {formErrors.termsAgreement && <p className="text-xs text-red-400 mt-1">{formErrors.termsAgreement}</p>}
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="privacyPolicyAgreement"
                  name="privacyPolicyAgreement"
                  type="checkbox"
                  checked={formData.privacyPolicyAgreement}
                  onChange={(e) => {
                    const syntheticEvent = {
                      target: {
                        name: 'privacyPolicyAgreement',
                        checked: e.target.checked,
                        type: 'checkbox'
                      }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    handleChange(syntheticEvent);
                  }}
                  className="h-5 w-5 rounded text-green-500 focus:ring-green-500 focus:ring-offset-gray-800 bg-gray-700 border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacyPolicyAgreement" className="text-gray-300">
                  I have read and agree to the <a href="/privacy-policy" className="text-green-400 hover:text-green-300">Privacy Policy</a>. <span className="text-red-500">*</span>
                </label>
                {formErrors.privacyPolicyAgreement && <p className="text-xs text-red-400 mt-1">{formErrors.privacyPolicyAgreement}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Notice */}
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Security Notice:</span> Your banking information is used for verification 
          purposes only. We use industry-standard encryption to protect your sensitive information.
        </p>
      </div>
    </motion.div>
  );
}
