'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function CalculatorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How accurate is this loan calculator?',
      answer: 'Our loan calculator provides estimates based on the information you input and current market rates. While we strive for accuracy, actual loan terms, rates, and payments may vary based on factors such as your credit score, income, debt-to-income ratio, and the specific lender\'s policies. For a precise quote, we recommend applying for pre-approval.'
    },
    {
      question: 'What factors affect my loan interest rate?',
      answer: 'Several factors influence your interest rate, including your credit score, loan amount, loan term, loan-to-value ratio (for secured loans), debt-to-income ratio, and current market conditions. Generally, higher credit scores and shorter loan terms result in lower interest rates.'
    },
    {
      question: 'How is the monthly payment calculated?',
      answer: 'The monthly payment is calculated using the loan amount, interest rate, and loan term. We use the standard amortization formula: Payment = P × [r(1 + r)^n] ÷ [(1 + r)^n - 1], where P is the principal, r is the monthly interest rate (annual rate divided by 12), and n is the number of payments (loan term in months).'
    },
    {
      question: 'What is amortization and why is it important?',
      answer: 'Amortization is the process of paying off a loan through regular payments over time. Each payment consists of both principal and interest, with the proportion changing over the life of the loan. Early payments primarily go toward interest, while later payments mostly reduce the principal. Understanding amortization helps you see how much of your payment goes toward building equity versus paying interest.'
    },
    {
      question: 'Should I choose a shorter or longer loan term?',
      answer: 'This depends on your financial situation and goals. Shorter loan terms typically have higher monthly payments but lower total interest costs and faster debt payoff. Longer terms offer lower monthly payments but higher total interest costs over time. Consider your budget, cash flow needs, and long-term financial objectives when deciding.'
    },
    {
      question: 'Can I pay off my loan early to save on interest?',
      answer: 'Yes, making extra payments or paying off your loan early can significantly reduce the total interest you pay. Our calculator doesn\'t account for extra payments, but you can generally save on interest by paying more than the minimum monthly payment. Check if your loan has any prepayment penalties before adopting this strategy.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-dark-200">
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
            Get answers to common questions about our loan calculator and financing options.
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
                className="bg-dark-300 border border-dark-100/50 rounded-xl overflow-hidden"
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
              Have more questions about our loan options?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/marketing/contact" 
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Contact Our Team
              </a>
              <a 
                href="/apply" 
                className="px-6 py-3 bg-dark-100 hover:bg-dark-200 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Apply for a Loan
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
