'use client';

import { motion } from 'framer-motion';

export default function ContactMap() {
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
            Visit Our Office
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            Our headquarters is located in the heart of New York's Financial District.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden shadow-xl border border-dark-100/50 h-[400px] md:h-[500px]"
        >
          {/* Interactive map alternative */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-300 to-dark-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Our Location</h3>
              <p className="text-gray-300 mb-4">123 Financial District, New York, NY 10004</p>
              <a
                href="https://www.google.com/maps/place/New+York,+NY+10004"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-white mb-3">Headquarters</h3>
            <p className="text-gray-300 mb-1">123 Financial District</p>
            <p className="text-gray-300 mb-3">New York, NY 10004</p>
            <p className="text-gray-400 text-sm">Our main office houses our executive team and primary operations.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-white mb-3">West Coast Office</h3>
            <p className="text-gray-300 mb-1">456 Tech Avenue</p>
            <p className="text-gray-300 mb-3">San Francisco, CA 94105</p>
            <p className="text-gray-400 text-sm">Our West Coast branch focuses on technology and innovation.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-semibold text-white mb-3">Midwest Branch</h3>
            <p className="text-gray-300 mb-1">789 Central Parkway</p>
            <p className="text-gray-300 mb-3">Chicago, IL 60601</p>
            <p className="text-gray-400 text-sm">Our Midwest office serves clients throughout the central United States.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300">
            Prefer to meet virtually? <a href="#schedule" className="text-primary-400 hover:text-primary-300">Schedule a video consultation</a> with one of our financial advisors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
