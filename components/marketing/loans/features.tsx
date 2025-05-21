'use client';

import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  BanknotesIcon, 
  CalendarIcon,
  HomeIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface LoanFeaturesProps {
  loanType: string;
  features: Feature[];
}

export default function LoanFeatures({ loanType, features }: LoanFeaturesProps) {
  // Function to get the icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'CurrencyDollarIcon':
        return <CurrencyDollarIcon className="w-6 h-6" />;
      case 'ChartBarIcon':
        return <ChartBarIcon className="w-6 h-6" />;
      case 'ClockIcon':
        return <ClockIcon className="w-6 h-6" />;
      case 'ShieldCheckIcon':
        return <ShieldCheckIcon className="w-6 h-6" />;
      case 'BanknotesIcon':
        return <BanknotesIcon className="w-6 h-6" />;
      case 'CalendarIcon':
        return <CalendarIcon className="w-6 h-6" />;
      case 'HomeIcon':
        return <HomeIcon className="w-6 h-6" />;
      case 'AdjustmentsHorizontalIcon':
        return <AdjustmentsHorizontalIcon className="w-6 h-6" />;
      case 'ArrowPathIcon':
        return <ArrowPathIcon className="w-6 h-6" />;
      case 'UserGroupIcon':
        return <UserGroupIcon className="w-6 h-6" />;
      default:
        return <CurrencyDollarIcon className="w-6 h-6" />;
    }
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
            {loanType === 'personal' ? 'Personal Loan Features' : 
             loanType === 'mortgage' ? 'Mortgage Features' : 
             'Business Loan Features'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            {loanType === 'personal' ? 
              'Our personal loans are designed with flexibility and convenience in mind.' : 
             loanType === 'mortgage' ? 
              'Our mortgage solutions are tailored to help you achieve your homeownership goals.' : 
              'Our business financing options are built to support your company\'s growth and success.'}
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
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 max-w-2xl mx-auto">
            {loanType === 'personal' ? 
              'Our personal loans are designed to provide you with the financial flexibility you need, when you need it. With competitive rates and transparent terms, we make borrowing simple and stress-free.' : 
             loanType === 'mortgage' ? 
              'Our mortgage solutions are backed by experienced loan officers who will guide you through every step of the home financing process, from application to closing.' : 
              'Our business financing options are designed by entrepreneurs, for entrepreneurs. We understand the unique challenges businesses face and offer solutions that align with your growth objectives.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
