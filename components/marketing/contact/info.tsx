'use client';

import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: 'Phone',
      details: [
        { label: 'Main Office', value: '+1-(315)-949-8539' },
        { label: 'Customer Support', value: '+1-(315)-949-8540' }
      ],
      action: {
        label: 'Call Us',
        href: 'tel:+13159498539'
      }
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: 'Email',
      details: [
        { label: 'General Inquiries', value: 'contact@lendingforte.com' },
        { label: 'Support', value: 'support@lendingforte.com' }
      ],
      action: {
        label: 'Email Us',
        href: 'mailto:contact@lendingforte.com'
      }
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: 'Office',
      details: [
        { label: 'Headquarters', value: '123 Financial District' },
        { label: 'New York, NY 10004' }
      ],
      action: {
        label: 'Get Directions',
        href: 'https://maps.google.com'
      }
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: 'Hours',
      details: [
        { label: 'Monday-Friday', value: '9:00 AM - 6:00 PM EST' },
        { label: 'Saturday', value: '10:00 AM - 2:00 PM EST' }
      ],
      action: {
        label: 'Schedule a Call',
        href: '#schedule'
      }
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-dark-200" id="contact-info">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300"
          >
            We're here to answer your questions and provide the financial guidance you need.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-300 border border-dark-100/50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-500 mb-4">
                {method.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{method.title}</h3>
              
              <div className="space-y-2 mb-4">
                {method.details.map((detail, i) => (
                  <div key={i}>
                    {detail.label && (
                      <p className="text-sm text-gray-400">{detail.label}</p>
                    )}
                    {detail.value && (
                      <p className="text-gray-300">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <a 
                href={method.action.href} 
                className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
              >
                {method.action.label}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
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
          <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex justify-center space-x-4">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <FaLinkedinIn />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-dark-300 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-colors"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
