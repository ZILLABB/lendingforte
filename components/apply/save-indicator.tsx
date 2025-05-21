'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface SaveIndicatorProps {
  isSaving: boolean;
  lastSaved: Date | null;
  onSaveManually?: () => void;
}

export default function SaveIndicator({
  isSaving,
  lastSaved,
  onSaveManually
}: SaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);
  
  // Show the "Saved" message for 3 seconds after saving
  useEffect(() => {
    if (!isSaving && lastSaved) {
      setShowSaved(true);
      const timer = setTimeout(() => {
        setShowSaved(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isSaving, lastSaved]);
  
  // Format the last saved time
  const formatLastSaved = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    
    if (diffSec < 60) {
      return 'just now';
    } else if (diffMin < 60) {
      return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHour < 24) {
      return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return date.toLocaleString();
    }
  };
  
  return (
    <div className="flex items-center space-x-2">
      <AnimatePresence mode="wait">
        {isSaving ? (
          <motion.div
            key="saving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center text-gray-400 text-sm"
          >
            <CloudArrowUpIcon className="w-4 h-4 mr-1 animate-pulse" />
            <span>Saving...</span>
          </motion.div>
        ) : showSaved ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center text-green-500 text-sm"
          >
            <CheckIcon className="w-4 h-4 mr-1" />
            <span>Saved</span>
          </motion.div>
        ) : lastSaved ? (
          <motion.div
            key="lastSaved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center text-gray-400 text-sm"
          >
            <span>Last saved: {formatLastSaved(lastSaved)}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {onSaveManually && (
        <motion.button
          type="button"
          onClick={onSaveManually}
          className="text-primary-400 hover:text-primary-300 text-sm flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSaving}
        >
          <CloudArrowUpIcon className="w-4 h-4 mr-1" />
          Save
        </motion.button>
      )}
    </div>
  );
}
