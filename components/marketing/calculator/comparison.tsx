'use client';

import { motion } from 'framer-motion';

export default function CalculatorComparison() {
  // Sample comparison data
  const comparisonData = [
    {
      term: '3 Years (36 months)',
      rate: '5.99%',
      monthlyPayment: '$760.02',
      totalInterest: '$2,360.72',
      totalPayment: '$27,360.72'
    },
    {
      term: '4 Years (48 months)',
      rate: '6.25%',
      monthlyPayment: '$586.04',
      totalInterest: '$3,129.92',
      totalPayment: '$28,129.92'
    },
    {
      term: '5 Years (60 months)',
      rate: '6.49%',
      monthlyPayment: '$488.96',
      totalInterest: '$4,337.60',
      totalPayment: '$29,337.60'
    }
  ];

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
            Compare Loan Options
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            See how different loan terms affect your monthly payments and total interest costs.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[768px]">
            <div className="bg-dark-200 rounded-xl overflow-hidden shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark-300">
                    <th className="py-4 px-6 text-left text-white font-semibold">Loan Term</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Interest Rate</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Monthly Payment</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Total Interest</th>
                    <th className="py-4 px-6 text-left text-white font-semibold">Total Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-100">
                  {comparisonData.map((option, index) => (
                    <tr 
                      key={index} 
                      className={`${
                        index === 0 
                          ? 'bg-primary-500/10 border-l-4 border-primary-500' 
                          : 'hover:bg-dark-300/50'
                      } transition-colors`}
                    >
                      <td className="py-4 px-6 text-white">
                        {option.term}
                        {index === 0 && (
                          <span className="ml-2 inline-block px-2 py-1 text-xs bg-primary-500 text-white rounded-full">
                            Recommended
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-300">{option.rate}</td>
                      <td className="py-4 px-6 text-gray-300">{option.monthlyPayment}</td>
                      <td className="py-4 px-6 text-gray-300">{option.totalInterest}</td>
                      <td className="py-4 px-6 text-gray-300">{option.totalPayment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-white mb-4">Understanding Your Options</h3>
            
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-medium text-white">Shorter loan terms</span> typically come with lower interest rates but higher monthly payments. They allow you to pay off your loan faster and save on total interest costs.
              </p>
              
              <p>
                <span className="font-medium text-white">Longer loan terms</span> offer lower monthly payments but higher total interest costs over the life of the loan. These may be more manageable for your monthly budget but cost more in the long run.
              </p>
              
              <p>
                The right choice depends on your financial situation, goals, and preferences. Our financial advisors can help you determine which option best fits your needs.
              </p>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a 
                href="/marketing/contact" 
                className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Speak to an Advisor
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
