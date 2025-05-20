'use client'

import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useContext, ReactNode } from 'react'

// Define the context type
type ToastContextType = {
  success: (message: string, options?: any) => void
  error: (message: string, options?: any) => void
  info: (message: string, options?: any) => void
  warning: (message: string, options?: any) => void
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Create a provider component
export function ToastProvider({ children }: { children: ReactNode }) {
  // Define toast functions with consistent styling
  const success = (message: string, options = {}) => {
    toast.success(message, {
      theme: 'colored',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    })
  }

  const error = (message: string, options = {}) => {
    toast.error(message, {
      theme: 'colored',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    })
  }

  const info = (message: string, options = {}) => {
    toast.info(message, {
      theme: 'colored',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    })
  }

  const warning = (message: string, options = {}) => {
    toast.warning(message, {
      theme: 'colored',
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
    })
  }

  return (
    <ToastContext.Provider value={{ success, error, info, warning }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </ToastContext.Provider>
  )
}

// Create a hook to use the toast context
export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
