'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface ProcessStep {
  title: string;
  description: string;
}

interface LoanProcessProps {
  loanType: string;
  steps: ProcessStep[];
}

export default function LoanProcess({ loanType, steps }: LoanProcessProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            {loanType === 'personal' ? 'Personal Loan Process' : 
             loanType === 'mortgage' ? 'Mortgage Application Process' : 
             'Business Loan Process'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            {loanType === 'personal' ? 
              'Our streamlined application process makes getting a personal loan quick and hassle-free.' : 
             loanType === 'mortgage' ? 
              'We\'ve simplified the mortgage process to help you navigate your home financing journey with confidence.' : 
              'Our business loan process is designed to be efficient and transparent, so you can focus on running your business.'}
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Process timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500/80 via-primary-500/50 to-primary-500/20"></div>
          
          {/* Process steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step number */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary-500 border-4 border-dark-300 z-10 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                
                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div className={`bg-dark-200 border border-dark-100/50 rounded-xl p-6 shadow-md ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Final step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative mt-12 text-center"
          >
            <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="pt-16">
              <p className="text-white font-semibold">Ready to Get Started?</p>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                {loanType === 'personal' ? 
                  'Apply now to get the funds you need for your personal expenses.' : 
                 loanType === 'mortgage' ? 
                  'Begin your journey to homeownership with our simple application process.' : 
                  'Take the first step toward growing your business with our financing solutions.'}
              </p>
              <Link 
                href="/apply" 
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Start Your Application
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
