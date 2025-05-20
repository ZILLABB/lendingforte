"use client";

import { useState, useEffect } from "react";
import { BanknotesIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface LoanDetailsStepProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  formErrors: Record<string, string>;
}

export default function LoanDetailsStep({ formData, handleChange, formErrors }: LoanDetailsStepProps) {
  const [loanAmount, setLoanAmount] = useState(formData.loanAmount || "");
  const [loanTerm, setLoanTerm] = useState(formData.loanTerm || "");
  const [estimatedPayment, setEstimatedPayment] = useState<number | null>(null);
  const [estimatedRate, setEstimatedRate] = useState<number | null>(null);
  
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
    setLoanAmount(formattedValue);
    
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        name: 'loanAmount',
        value: formattedValue,
        type: 'text'
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
  };
  
  // Handle loan term change
  const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanTerm(e.target.value);
    handleChange(e);
  };
  
  // Calculate estimated monthly payment
  useEffect(() => {
    if (loanAmount && loanTerm) {
      // Remove commas and convert to number
      const principal = Number(loanAmount.replace(/,/g, ''));
      const termMonths = Number(loanTerm);
      
      // Estimate interest rate based on loan amount (simplified)
      let rate = 0.08; // Default rate of 8%
      
      if (principal <= 5000) {
        rate = 0.10; // 10% for small loans
      } else if (principal <= 15000) {
        rate = 0.09; // 9% for medium loans
      } else if (principal <= 30000) {
        rate = 0.08; // 8% for larger loans
      } else {
        rate = 0.07; // 7% for very large loans
      }
      
      setEstimatedRate(rate * 100);
      
      // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
      // where L = loan amount, c = monthly interest rate, n = number of payments
      const monthlyRate = rate / 12;
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
      
      setEstimatedPayment(Math.round(payment));
    } else {
      setEstimatedPayment(null);
      setEstimatedRate(null);
    }
  }, [loanAmount, loanTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <BanknotesIcon className="w-6 h-6 mr-2 text-green-400" /> Loan Details
      </h2>
      
      <div className="space-y-6">
        {/* Loan Type */}
        <div className="space-y-1">
          <label htmlFor="loanType" className="text-sm font-medium text-gray-300">
            Loan Type <span className="text-red-500">*</span>
          </label>
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
            <option value="Debt Consolidation">Debt Consolidation</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Auto Loan">Auto Loan</option>
            <option value="Business Loan">Business Loan</option>
            <option value="Education">Education</option>
            <option value="Medical Expenses">Medical Expenses</option>
            <option value="Other">Other</option>
          </select>
          {formErrors.loanType && <p className="text-xs text-red-400 mt-1">{formErrors.loanType}</p>}
        </div>
        
        {/* Loan Purpose */}
        <div className="space-y-1">
          <label htmlFor="loanPurpose" className="text-sm font-medium text-gray-300">
            Loan Purpose <span className="text-red-500">*</span>
          </label>
          <input
            className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400
              focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.loanPurpose ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
            id="loanPurpose"
            type="text"
            name="loanPurpose"
            value={formData.loanPurpose}
            onChange={handleChange}
            placeholder="Describe how you plan to use the loan"
            required
          />
          {formErrors.loanPurpose && <p className="text-xs text-red-400 mt-1">{formErrors.loanPurpose}</p>}
        </div>
        
        {/* Loan Amount and Term */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="loanAmount" className="text-sm font-medium text-gray-300">
              Loan Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">$</span>
              </div>
              <input
                className={`w-full bg-gray-700 rounded-lg pl-7 px-4 py-3 text-gray-100 placeholder-gray-400
                  focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.loanAmount ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
                id="loanAmount"
                type="text"
                name="loanAmount"
                value={loanAmount}
                onChange={handleCurrencyChange}
                placeholder="10,000"
                required
              />
            </div>
            {formErrors.loanAmount && <p className="text-xs text-red-400 mt-1">{formErrors.loanAmount}</p>}
          </div>
          
          <div className="space-y-1">
            <label htmlFor="loanTerm" className="text-sm font-medium text-gray-300">
              Loan Term (months) <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full bg-gray-700 rounded-lg px-4 py-3 text-gray-100
                focus:ring-2 focus:ring-green-500 focus:outline-none transition-all ${formErrors.loanTerm ? 'border border-red-500 ring-red-500' : 'border-gray-700'}`}
              id="loanTerm"
              name="loanTerm"
              value={loanTerm}
              onChange={handleTermChange}
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
            {formErrors.loanTerm && <p className="text-xs text-red-400 mt-1">{formErrors.loanTerm}</p>}
          </div>
        </div>
        
        {/* Payment Estimate */}
        {estimatedPayment && estimatedRate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-900/30 rounded-lg border border-green-800"
          >
            <h3 className="text-lg font-medium text-green-400 mb-2 flex items-center">
              <CalculatorIcon className="w-5 h-5 mr-2" /> Estimated Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">Estimated Monthly Payment</p>
                <p className="text-xl font-semibold text-white">${estimatedPayment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Estimated Interest Rate</p>
                <p className="text-xl font-semibold text-white">{estimatedRate.toFixed(2)}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Repayment</p>
                <p className="text-xl font-semibold text-white">${(estimatedPayment * Number(loanTerm)).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              * This is only an estimate. Your actual rate and payment will be determined after application review.
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Loan Terms Notice */}
      <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <span className="font-semibold">Important Notice:</span> The final loan amount, term, and interest rate will be 
          determined based on your credit profile, income, and other factors. The estimated payment shown above is for 
          informational purposes only and is not a guarantee of loan approval or terms.
        </p>
      </div>
    </motion.div>
  );
}
