# LendingForte Documentation

## Overview

LendingForte is a premium financial solutions web application built with Next.js, React, and Tailwind CSS. The application provides users with information about various loan products, a loan calculator, and a loan application system.

## Project Structure

The project follows a modern component-based architecture with a clear separation of concerns:

```
lendingforte/
├── app/                  # Next.js app directory (pages)
│   ├── apply/            # Loan application page
│   ├── marketing/        # Marketing pages (calculator, loans, etc.)
│   └── ...
├── components/           # React components
│   ├── apply/            # Loan application components
│   ├── layout/           # Layout components (header, footer, etc.)
│   ├── marketing/        # Marketing components
│   ├── providers/        # Context providers
│   └── ui/               # Reusable UI components
├── public/               # Static assets
│   └── images/           # Images used throughout the site
├── utils/                # Utility functions
└── ...
```

## Key Features

1. **Premium Dark Theme with Green Accents**
   - Modern dark theme with green accent colors
   - Consistent visual design across all pages
   - Theme toggle functionality

2. **Responsive Design**
   - Mobile-first approach
   - Responsive header with hamburger menu
   - Optimized for all device sizes

3. **Loan Calculator**
   - Interactive loan calculator
   - Real-time calculations
   - Visual representation of loan data

4. **Loan Application System**
   - Multi-step application form
   - Form validation
   - Progress saving
   - Firebase integration for data storage

5. **Performance Optimizations**
   - Lazy loading of components
   - Image optimization
   - Code splitting

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Firebase**: Backend services (authentication, database)
- **EmailJS**: Email service for form submissions

## Component Documentation

### Layout Components

#### Header (`components/layout/header/index.tsx`)
The main header component that includes the logo, navigation, and theme toggle.

#### Footer (`components/layout/footer/index.tsx`)
The footer component with links, contact information, and copyright.

### Marketing Components

#### Hero (`components/marketing/hero.tsx`)
The hero section on the homepage with a call-to-action.

#### Features (`components/marketing/features.tsx`)
Highlights the key features of LendingForte.

#### Loan Products (`components/marketing/loan-products.tsx`)
Showcases the different loan products offered.

### Calculator Components

#### Calculator Form (`components/marketing/calculator/form.tsx`)
The form for the loan calculator with input fields.

#### Calculator Results (`components/marketing/calculator/results.tsx`)
Displays the calculation results with visual representations.

### Apply Components

#### Apply Form (`components/apply/form.tsx`)
The multi-step loan application form.

#### Apply Steps (`components/apply/steps.tsx`)
Visual representation of the application steps.

## Utility Functions

### Lazy Loading (`utils/lazy-load.tsx`)
Utility for lazy loading components to improve performance.

## Firebase Integration

The application uses Firebase for:
- Storing loan application data
- User authentication (if implemented)

## EmailJS Integration

EmailJS is used for sending form submissions with the following credentials:
- Service ID: service_aug4hyu
- Template ID: template_e9tvy3f
- User ID: mRm23xSD-WMIu8ZDK

## Development

### Prerequisites
- Node.js 18.17.0 or later
- npm 9.0.0 or later

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/lendingforte.git

# Navigate to the project directory
cd lendingforte

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Deployment

The application is configured for deployment on Netlify with the following settings:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18.17.0

## Future Enhancements

1. **User Authentication**
   - Implement user accounts
   - Secure dashboard for loan management

2. **Advanced Calculator Features**
   - Loan comparison tool
   - Amortization schedule

3. **Document Upload**
   - Allow users to upload documents for loan applications

4. **Live Chat Support**
   - Implement a chat system for customer support
