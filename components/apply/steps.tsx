'use client';

import { motion } from 'framer-motion';

export default function ApplySteps() {
  const steps = [
    {
      number: 1,
      title: 'Complete Application',
      description: 'Fill out our simple online application with your personal and financial information.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: 2,
      title: 'Get Pre-Approved',
      description: 'Receive a quick decision based on the information you provide.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Verify Information',
      description: 'Submit required documentation to verify your identity and income.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      )
    },
    {
      number: 4,
      title: 'Final Approval',
      description: 'Once verified, receive final approval and loan agreement.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      number: 5,
      title: 'Receive Funds',
      description: 'After signing your agreement, funds are deposited into your account.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-dark-300/80 backdrop-blur-sm border border-dark-100/50 rounded-xl p-6 md:p-8 shadow-xl sticky top-24">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Application Process</h2>
        </div>

        <div className="relative pl-8 border-l border-dark-100/50">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="mb-8 last:mb-0 relative"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
            >
              <div className="absolute -left-[41px] w-[25px] h-[25px] rounded-full bg-dark-200 border border-primary-500/30 flex items-center justify-center text-primary-500 font-semibold">
                {step.number}
              </div>

              <div className="bg-dark-200/50 rounded-lg p-4 border border-dark-100/30">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mr-3">
                    {step.icon}
                  </div>
                  <h3 className="text-white font-medium">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-400 ml-11">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 pt-6 border-t border-dark-100/50"
        >
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-white font-medium">Need Help?</h3>
          </div>

          <div className="bg-dark-200/50 rounded-lg p-4 border border-dark-100/30 mb-4">
            <p className="text-sm text-gray-300 mb-2">
              Our loan specialists are available to assist you with your application. We're here to help you every step of the way.
            </p>

            <div className="flex items-center text-primary-400 text-sm font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>View Frequently Asked Questions</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center bg-dark-200/30 rounded-lg p-3 hover:bg-dark-200/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-gray-300 block">+1-(315)-949-8539</span>
                <span className="text-xs text-gray-500">Toll-free customer support</span>
              </div>
            </div>

            <div className="flex items-center bg-dark-200/30 rounded-lg p-3 hover:bg-dark-200/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-gray-300 block">support@lendingforte.com</span>
                <span className="text-xs text-gray-500">24/7 email support</span>
              </div>
            </div>

            <div className="flex items-center bg-dark-200/30 rounded-lg p-3 hover:bg-dark-200/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-gray-300 block">Mon-Fri: 9AM-6PM EST</span>
                <span className="text-xs text-gray-500">Business hours</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
