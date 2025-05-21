'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface LoanEligibilityProps {
  loanType: string;
  requirements: string[];
}

export default function LoanEligibility({ loanType, requirements }: LoanEligibilityProps) {
  return (
    <section className="py-16 md:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Eligibility Requirements
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              {loanType === 'personal' ? 
                'To qualify for a personal loan, you\'ll need to meet the following criteria. Meeting these requirements improves your chances of approval and may help you secure better rates.' : 
               loanType === 'mortgage' ? 
                'Qualifying for a mortgage involves meeting specific financial and credit criteria. These requirements help us ensure you\'re set up for successful homeownership.' : 
                'Business loan eligibility is based on your company\'s financial health and history. These requirements help us assess your business\'s ability to manage and repay the loan.'}
            </p>
            
            <ul className="space-y-4 mb-8">
              {requirements.map((requirement, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-start"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{requirement}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/apply" 
                className="btn btn-primary inline-flex items-center justify-center"
              >
                Apply Now
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
              
              <Link 
                href="/marketing/contact" 
                className="btn btn-outline border-gray-700 text-white hover:bg-dark-100 inline-flex items-center justify-center"
              >
                Speak to an Advisor
              </Link>
            </div>
          </motion.div>
          
          {/* Eligibility Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl">
              <h3 className="text-xl font-semibold text-white mb-6">What You'll Need</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Identification</h4>
                    <p className="text-gray-400 text-sm">
                      Government-issued ID (driver's license, passport, etc.)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Income Verification</h4>
                    <p className="text-gray-400 text-sm">
                      {loanType === 'personal' ? 
                        'Recent pay stubs, tax returns, or bank statements' : 
                       loanType === 'mortgage' ? 
                        'W-2s, tax returns, pay stubs, and employment verification' : 
                        'Business tax returns, profit & loss statements, and bank statements'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Credit History</h4>
                    <p className="text-gray-400 text-sm">
                      We'll perform a credit check as part of the application process
                    </p>
                  </div>
                </div>
                
                {loanType === 'mortgage' && (
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Property Information</h4>
                      <p className="text-gray-400 text-sm">
                        Details about the property you're purchasing or refinancing
                      </p>
                    </div>
                  </div>
                )}
                
                {loanType === 'business' && (
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Business Documentation</h4>
                      <p className="text-gray-400 text-sm">
                        Business licenses, articles of incorporation, and financial projections
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-dark-100/50">
                <p className="text-gray-400 text-sm">
                  Don't meet all the requirements? We may still be able to help. Contact our team to discuss your specific situation and explore alternative options.
                </p>
                
                <div className="mt-4 text-center">
                  <Link 
                    href="/marketing/contact" 
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
                  >
                    Contact Us
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-blue.DEFAULT/10 rounded-full blur-xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
