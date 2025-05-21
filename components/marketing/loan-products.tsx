'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LoanProducts() {
  const products = [
    {
      title: 'Personal Loans',
      description: 'Finance your personal goals with flexible terms and competitive rates.',
      image: '/images/lendingforte/personal-loan.jpg',
      features: ['Rates from 5.99%', 'Borrow up to $50,000', 'Terms from 12-60 months'],
      link: '/marketing/loans/personal'
    },
    {
      title: 'Mortgages',
      description: 'Find the perfect home loan solution with our range of mortgage options.',
      image: '/images/lendingforte/mortgage.jpg',
      features: ['Rates from 3.49%', 'Fixed & adjustable rates', 'First-time buyer programs'],
      link: '/marketing/loans/mortgage'
    },
    {
      title: 'Business Loans',
      description: 'Fuel your business growth with tailored financing solutions.',
      image: '/images/lendingforte/business-loan.jpg',
      features: ['Rates from 6.75%', 'Lines of credit available', 'Equipment financing options'],
      link: '/marketing/loans/business'
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
            Tailored Loan Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Discover our range of financial products designed to meet your specific needs and goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-200 border border-dark-100/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl group">
                {/* Background image with gradient overlay */}
                <div className="absolute inset-0 transition-transform group-hover:scale-105 duration-500">
                  {product.title === 'Personal Loans' && (
                    <Image
                      src="/images/lendingforte/loans/personal-loan.jpg"
                      alt="Personal Loans"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}

                  {product.title === 'Mortgages' && (
                    <Image
                      src="/images/lendingforte/loans/mortgage.jpg"
                      alt="Mortgages"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}

                  {product.title === 'Business Loans' && (
                    <Image
                      src="/images/lendingforte/loans/business-loan.jpg"
                      alt="Business Loans"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-200/80 to-dark-100/80"></div>

                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-full bg-dark-300/80 backdrop-blur-sm border border-primary-500/30 flex items-center justify-center shadow-lg">
                      {product.title === 'Personal Loans' && (
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                      {product.title === 'Mortgages' && (
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      {product.title === 'Business Loans' && (
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-dark-300/70 to-transparent"></div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-2xl font-semibold text-white">{product.title}</h3>
                  <div className="w-12 h-1 bg-primary-500 rounded-full mt-2 transform origin-left transition-transform duration-300 group-hover:scale-x-150"></div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>

                <div className="mb-6 bg-dark-300/50 rounded-lg p-4 border border-dark-100/30">
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h4 className="text-white font-medium">Key Benefits</h4>
                  </div>

                  <ul className="space-y-3">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400">Starting at</span>
                    <div className="text-white font-semibold">
                      {product.title === 'Personal Loans' && '5.99% APR'}
                      {product.title === 'Mortgages' && '3.49% APR'}
                      {product.title === 'Business Loans' && '6.75% APR'}
                    </div>
                  </div>

                  <Link
                    href={product.link}
                    className="inline-flex items-center px-4 py-2 bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 hover:text-primary-300 font-medium rounded-lg transition-colors"
                  >
                    Learn More
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse animation-delay-1000"></div>
            <Link
              href="/apply"
              className="relative btn btn-primary btn-lg inline-flex items-center group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Apply Now
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
          </div>

          <p className="mt-4 text-gray-400 max-w-md mx-auto">
            Join thousands of satisfied customers who have found their perfect financial solution with LendingForte.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
