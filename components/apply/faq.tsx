'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ApplyFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What documents will I need to complete my application?',
      answer: 'Required documents typically include government-issued ID (driver\'s license, passport), proof of income (pay stubs, tax returns), bank statements, and proof of address. For mortgages and business loans, additional documentation may be required. We\'ll guide you through the specific requirements based on your loan type.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      question: 'Will applying affect my credit score?',
      answer: 'When you start your application, we perform a soft credit check, which doesn\'t affect your credit score. This allows us to provide you with pre-approval and rate estimates. A hard credit inquiry, which may temporarily lower your score by a few points, is only performed when you proceed with the full application.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      question: 'How long does the application process take?',
      answer: 'The online application takes just 5-10 minutes to complete. Most applicants receive a pre-approval decision within minutes. Once you submit your documentation, final approval typically takes 1-2 business days for personal loans, 3-5 days for business loans, and 30-45 days for mortgages. Funds are usually deposited shortly after final approval.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      question: 'Can I apply if I have less-than-perfect credit?',
      answer: 'Yes, we consider applications from individuals with a range of credit profiles. While the best rates are available to those with excellent credit, factors such as income stability, debt-to-income ratio, and overall financial health are also considered in our approval process. We offer options for various credit situations.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      question: 'Can I save my application and finish it later?',
      answer: 'Yes, you can save your progress and return to complete your application later. Simply create an account or log in with your existing credentials, and your information will be securely saved. You\'ll receive an email with instructions on how to resume your application.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      )
    },
    {
      question: 'What happens after I submit my application?',
      answer: 'After submission, our team reviews your application and may contact you to verify information or request additional documentation. Once approved, you\'ll receive a loan agreement to review and sign electronically. After signing, funds are typically deposited into your account within 1-3 business days, depending on your loan type.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.15),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.15),transparent_40%)] opacity-30"></div>

        {/* Abstract shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Find answers to common questions about our application process.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-dark-200/80 backdrop-blur-sm border border-dark-100/50 rounded-xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none group"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg ${openIndex === index ? 'bg-primary-500/20' : 'bg-dark-300/80'} flex items-center justify-center mr-4 transition-colors duration-300`}>
                      <div className={`${openIndex === index ? 'text-primary-500' : 'text-gray-400'} transition-colors duration-300`}>
                        {faq.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors duration-300">{faq.question}</h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: openIndex === index ? 180 : 0,
                      backgroundColor: openIndex === index ? 'rgba(16, 185, 129, 0.1)' : 'rgba(26, 32, 44, 0.5)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <ChevronDownIcon className={`w-5 h-5 ${openIndex === index ? 'text-primary-500' : 'text-gray-400'} transition-colors duration-300`} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 pb-6 text-gray-300 border-t border-dark-100/50 ml-20 mr-6">
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/30 to-primary-500/5 rounded-full"></div>
                          <div className="pl-6">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 text-center"
          >
            <div className="bg-dark-200/80 backdrop-blur-sm border border-dark-100/50 rounded-xl p-8 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-500/5 to-primary-600/0 rounded-full -mr-20 -mt-20 z-0"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/5 to-blue-600/0 rounded-full -ml-20 -mb-20 z-0"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">Still Have Questions?</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Our loan specialists are ready to assist you with any questions about our application process or loan products.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/marketing/contact"
                    className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm group"
                  >
                    Contact Our Team
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <Link
                    href="tel:+13159498539"
                    className="inline-flex items-center px-6 py-3 bg-dark-100 hover:bg-dark-300 text-white font-medium rounded-lg transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
