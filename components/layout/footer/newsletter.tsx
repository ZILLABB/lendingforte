'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/providers/toast-provider';
import { createRecord } from '@/lib/firebase/database';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to Firebase
      await createRecord('newsletter', { email, subscribedAt: new Date().toISOString() });
      
      // Show success message
      toast.success('Thank you for subscribing to our newsletter!');
      
      // Clear form
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full px-4 py-3 bg-dark-200 border border-dark-100 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isSubmitting}
          required
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
      </motion.button>
      <p className="text-xs text-gray-500">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
      </p>
    </form>
  );
}
