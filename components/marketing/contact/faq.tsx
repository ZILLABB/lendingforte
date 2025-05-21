'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What information do I need to provide when applying for a loan?',
      answer: 'When applying for a loan, you\'ll typically need to provide personal identification (such as a driver\'s license or passport), proof of income (pay stubs, tax returns), bank statements, and information about your assets and debts. The specific requirements may vary depending on the type of loan you\'re applying for.'
    },
    {
      question: 'How long does the loan approval process take?',
      answer: 'Our loan approval process typically takes 1-3 business days for personal loans and up to 30 days for mortgages. Business loans may take 5-10 business days depending on the complexity. We strive to provide quick decisions while ensuring thorough evaluation of each application.'
    },
    {
      question: 'Can I apply for a loan if I have a low credit score?',
      answer: 'Yes, we consider applications from individuals with various credit profiles. While a higher credit score may qualify you for better rates, we take a holistic approach to evaluating loan applications, considering factors such as income stability, debt-to-income ratio, and overall financial health.'
    },
    {
      question: 'What are your current interest rates?',
      answer: 'Our interest rates vary based on the type of loan, loan amount, term length, and your credit profile. Current rates for personal loans start at 5.99%, mortgages at 3.49%, and business loans at 6.75%. For the most accurate rate, we recommend applying for pre-approval, which won\'t affect your credit score.'
    },
    {
      question: 'Do you offer loan refinancing options?',
      answer: 'Yes, we offer refinancing options for existing loans. Refinancing can help you secure a lower interest rate, reduce monthly payments, or change your loan term. Our financial advisors can help you determine if refinancing is the right choice for your situation.'
    },
    {
      question: 'How can I check the status of my loan application?',
      answer: 'You can check your application status by logging into your account on our website, using our mobile app, or contacting our customer service team. We also provide regular updates via email or text message throughout the application process.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24" id="faq">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Find answers to common questions about our services and processes.
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
                className="bg-dark-200 border border-dark-100/50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDownIcon className="w-5 h-5 text-primary-500" />
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
                      <div className="p-6 pt-0 text-gray-300 border-t border-dark-100/50">
                        {faq.answer}
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
            className="mt-12 text-center"
          >
            <p className="text-gray-300 mb-4">
              Still have questions? Our team is here to help.
            </p>
            <a 
              href="#contact-form" 
              className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
