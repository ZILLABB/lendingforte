'use client';

import { motion } from 'framer-motion';

export default function AboutPartners() {
  const partners = [
    { name: 'National Banking Association', initial: 'NBA' },
    { name: 'Financial Technology Partners', initial: 'FTP' },
    { name: 'Global Lending Alliance', initial: 'GLA' },
    { name: 'Secure Payment Systems', initial: 'SPS' },
    { name: 'Digital Finance Consortium', initial: 'DFC' },
    { name: 'Sustainable Banking Initiative', initial: 'SBI' },
    { name: 'Consumer Protection Network', initial: 'CPN' },
    { name: 'Enterprise Growth Fund', initial: 'EGF' }
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
            Our Partners & Affiliations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            We collaborate with leading organizations to provide the best financial solutions and maintain the highest industry standards.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 flex flex-col items-center justify-center text-center h-40 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-primary-500">{partner.initial}</span>
              </div>
              <p className="text-white font-medium">{partner.name}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 bg-dark-300 border border-dark-100/50 rounded-xl shadow-lg max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Industry Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-dark-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">ISO 27001</p>
            </div>
            <div className="bg-dark-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">PCI DSS</p>
            </div>
            <div className="bg-dark-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">GDPR Compliant</p>
            </div>
            <div className="bg-dark-200 rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center mb-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <p className="text-sm text-gray-300">SOC 2 Type II</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
