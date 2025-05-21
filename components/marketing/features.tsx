'use client';

import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

export default function Features() {
  const features = [
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Secure Process',
      description: 'Your data is protected with bank-level security and encryption throughout the entire application process.'
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: 'Fast Approvals',
      description: 'Get pre-approved in minutes and receive funds as quickly as the next business day.'
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      title: 'Competitive Rates',
      description: 'We offer some of the most competitive interest rates in the industry, helping you save money.'
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: 'Dedicated Support',
      description: 'Our team of financial experts is available to guide you through every step of the process.'
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: 'Flexible Terms',
      description: 'Choose from a variety of repayment terms that fit your financial situation and goals.'
    },
    {
      icon: <DocumentTextIcon className="w-6 h-6" />,
      title: 'Transparent Process',
      description: 'No hidden fees or surprises. We believe in complete transparency throughout your loan journey.'
    }
  ];

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
            Why Choose LendingForte
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            We combine cutting-edge technology with personalized service to provide you with the best financial solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
