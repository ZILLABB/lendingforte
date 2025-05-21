'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CalculatorPreview() {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanTerm, setLoanTerm] = useState(36);
  const [interestRate, setInterestRate] = useState(5.99);

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanTerm;
  const totalInterest = totalPayment - loanAmount;

  return (
    <section className="py-16 md:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Calculate Your Loan
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Use our interactive loan calculator to estimate your monthly payments and see how different loan terms affect your finances.
            </p>
            <p className="text-gray-400 mb-8">
              Our calculator provides a quick estimate of your potential loan payments. For a more detailed analysis and personalized rates, visit our full calculator or speak with one of our financial advisors.
            </p>
            <Link 
              href="/marketing/calculator"
              className="btn btn-primary btn-lg inline-flex items-center"
            >
              Full Calculator
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Loan Estimate</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Loan Amount: ${loanAmount.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Loan Term: {loanTerm} months
                </label>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="12"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>12 months</span>
                  <span>84 months</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="2.99"
                  max="15.99"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-dark-100 rounded-lg appearance-none cursor-pointer accent-primary-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2.99%</span>
                  <span>15.99%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-dark-100/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dark-200 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Monthly Payment</p>
                  <p className="text-xl font-semibold text-white">${monthlyPayment.toFixed(2)}</p>
                </div>
                <div className="bg-dark-200 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Total Interest</p>
                  <p className="text-xl font-semibold text-white">${totalInterest.toFixed(2)}</p>
                </div>
                <div className="bg-dark-200 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Total Payment</p>
                  <p className="text-xl font-semibold text-white">${totalPayment.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link 
                  href="/apply"
                  className="btn btn-primary inline-flex items-center"
                >
                  Apply With These Terms
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
