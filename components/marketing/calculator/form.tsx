'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/providers/toast-provider';

// Define loan types and their default rates
const loanTypes = [
  { id: 'personal', name: 'Personal Loan', minRate: 5.99, maxRate: 15.99 },
  { id: 'mortgage', name: 'Mortgage', minRate: 3.49, maxRate: 6.99 },
  { id: 'business', name: 'Business Loan', minRate: 6.75, maxRate: 18.99 },
  { id: 'auto', name: 'Auto Loan', minRate: 4.25, maxRate: 12.99 },
  { id: 'student', name: 'Student Loan', minRate: 3.99, maxRate: 9.99 }
];

// Define loan terms based on loan type
const loanTerms = {
  personal: [12, 24, 36, 48, 60],
  mortgage: [60, 120, 180, 240, 300, 360],
  business: [12, 24, 36, 48, 60, 72, 84],
  auto: [24, 36, 48, 60, 72],
  student: [60, 120, 180, 240]
};

export default function CalculatorForm() {
  const toast = useToast();
  
  // State for form values
  const [loanType, setLoanType] = useState('personal');
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(5.99);
  const [downPayment, setDownPayment] = useState(0);
  
  // Update interest rate when loan type changes
  useEffect(() => {
    const selectedLoanType = loanTypes.find(type => type.id === loanType);
    if (selectedLoanType) {
      setInterestRate(selectedLoanType.minRate);
    }
    
    // Set default term based on loan type
    const terms = loanTerms[loanType as keyof typeof loanTerms];
    setLoanTerm(terms[Math.floor(terms.length / 2)]);
  }, [loanType]);
  
  // Handle loan type change
  const handleLoanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoanType(e.target.value);
  };
  
  // Handle form submission
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (loanAmount <= 0) {
      toast.error('Loan amount must be greater than zero');
      return;
    }
    
    if (interestRate <= 0) {
      toast.error('Interest rate must be greater than zero');
      return;
    }
    
    if (downPayment < 0 || downPayment >= loanAmount) {
      toast.error('Down payment must be less than the loan amount');
      return;
    }
    
    // Calculation logic would be implemented in a parent component
    // or through a state management solution
    
    toast.success('Calculation updated');
  };
  
  // Get current loan type details
  const currentLoanType = loanTypes.find(type => type.id === loanType) || loanTypes[0];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Loan Calculator</h2>
        
        <form onSubmit={handleCalculate}>
          <div className="space-y-6">
            {/* Loan Type */}
            <div>
              <label htmlFor="loanType" className="block text-sm font-medium text-gray-300 mb-2">
                Loan Type
              </label>
              <select
                id="loanType"
                value={loanType}
                onChange={handleLoanTypeChange}
                className="w-full px-4 py-3 bg-dark-200 border border-dark-100 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {loanTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            
            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Loan Amount: ${loanAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max={loanType === 'mortgage' ? '1000000' : '100000'}
                step={loanType === 'mortgage' ? '5000' : '1000'}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>${loanType === 'mortgage' ? '1,000' : '1,000'}</span>
                <span>${loanType === 'mortgage' ? '1,000,000' : '100,000'}</span>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  min="1000"
                  max={loanType === 'mortgage' ? '1000000' : '100000'}
                  step={loanType === 'mortgage' ? '5000' : '1000'}
                  className="w-full px-4 py-2 bg-dark-200 border border-dark-100 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Down Payment (only for mortgage and auto loans) */}
            {(loanType === 'mortgage' || loanType === 'auto') && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Down Payment: ${downPayment.toLocaleString()} ({((downPayment / loanAmount) * 100).toFixed(1)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max={loanAmount * 0.5}
                  step={loanType === 'mortgage' ? '5000' : '1000'}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0</span>
                  <span>${(loanAmount * 0.5).toLocaleString()}</span>
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    min="0"
                    max={loanAmount * 0.5}
                    step={loanType === 'mortgage' ? '5000' : '1000'}
                    className="w-full px-4 py-2 bg-dark-200 border border-dark-100 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            
            {/* Loan Term */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Loan Term: {loanTerm} {loanType === 'mortgage' ? 'months' : 'months'} ({(loanTerm / 12).toFixed(1)} years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-3 bg-dark-200 border border-dark-100 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {loanTerms[loanType as keyof typeof loanTerms].map(term => (
                  <option key={term} value={term}>
                    {term} months ({(term / 12).toFixed(1)} years)
                  </option>
                ))}
              </select>
            </div>
            
            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Interest Rate: {interestRate}%
              </label>
              <input
                type="range"
                min={currentLoanType.minRate}
                max={currentLoanType.maxRate}
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{currentLoanType.minRate}%</span>
                <span>{currentLoanType.maxRate}%</span>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min={currentLoanType.minRate}
                  max={currentLoanType.maxRate}
                  step="0.1"
                  className="w-full px-4 py-2 bg-dark-200 border border-dark-100 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Calculate Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Calculate
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
