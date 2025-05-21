'use client';

import { motion } from 'framer-motion';

export default function AboutMission() {
  return (
    <section className="py-16 md:py-24 bg-dark-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-dark-100/50">
              <div className="aspect-[4/3] bg-gradient-to-br from-dark-100 to-dark-300 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-blue.DEFAULT/10 rounded-full blur-xl"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p className="leading-relaxed">
                At LendingForte, our mission is to empower individuals and businesses to achieve their financial goals through innovative lending solutions that prioritize transparency, accessibility, and personalized service.
              </p>
              
              <p className="leading-relaxed">
                We envision a future where financial services are seamlessly integrated into people's lives, providing them with the resources they need to thrive. Our commitment to technological innovation and human-centered design drives us to continuously improve our offerings and deliver exceptional value to our clients.
              </p>
              
              <div className="pt-4 border-t border-dark-100/50">
                <h3 className="text-xl font-semibold text-white mb-3">Our Core Principles</h3>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Client-centered approach in everything we do</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Transparency in our processes and communication</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Innovation that drives financial inclusion</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Ethical practices and responsible lending</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
