import { Metadata } from 'next';
import LoanHero from '@/components/marketing/loans/hero';
import LoanFeatures from '@/components/marketing/loans/features';
import LoanRates from '@/components/marketing/loans/rates';
import LoanEligibility from '@/components/marketing/loans/eligibility';
import LoanProcess from '@/components/marketing/loans/process';
import LoanFAQ from '@/components/marketing/loans/faq';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Mortgage Loans | LendingForte',
  description: 'Discover our competitive mortgage options with flexible terms, low rates, and personalized guidance to help you find the perfect home financing solution.',
};

export default function MortgageLoanPage() {
  // Mortgage loan specific content
  const loanData = {
    type: 'mortgage',
    title: 'Mortgage Loans',
    subtitle: 'Your path to homeownership starts here',
    description: 'Our mortgage solutions offer competitive rates, flexible terms, and personalized guidance to help you find the perfect home financing option, whether you\'re a first-time buyer or refinancing your current home.',
    minAmount: 50000,
    maxAmount: 1000000,
    minTerm: 180,
    maxTerm: 360,
    minRate: 3.49,
    maxRate: 6.99,
    features: [
      {
        title: 'Competitive Rates',
        description: 'Interest rates starting at 3.49% APR for qualified borrowers.',
        icon: 'ChartBarIcon'
      },
      {
        title: 'Flexible Down Payments',
        description: 'Options starting as low as 3% down for qualified first-time homebuyers.',
        icon: 'CurrencyDollarIcon'
      },
      {
        title: 'Fixed & Adjustable Rates',
        description: 'Choose from fixed-rate mortgages or adjustable-rate options to suit your needs.',
        icon: 'AdjustmentsHorizontalIcon'
      },
      {
        title: 'First-Time Buyer Programs',
        description: 'Special programs designed to help first-time homebuyers achieve their dreams.',
        icon: 'HomeIcon'
      },
      {
        title: 'Refinancing Options',
        description: 'Lower your rate, change your term, or tap into your home\'s equity.',
        icon: 'ArrowPathIcon'
      },
      {
        title: 'Personalized Guidance',
        description: 'Expert mortgage advisors to guide you through every step of the process.',
        icon: 'UserGroupIcon'
      }
    ],
    eligibility: [
      'Have a credit score of 620 or higher (580 for some FHA loans)',
      'Have a debt-to-income ratio below 43%',
      'Have stable employment and income history (typically 2+ years)',
      'Have sufficient funds for down payment and closing costs',
      'Purchase a property that meets our appraisal standards',
      'Plan to use the property as your primary residence (for primary home loans)'
    ],
    process: [
      {
        title: 'Pre-Qualification',
        description: 'Get an estimate of how much you might be able to borrow based on basic financial information.'
      },
      {
        title: 'Pre-Approval',
        description: 'Complete a formal application with documentation to receive a more accurate loan amount.'
      },
      {
        title: 'Home Shopping',
        description: 'Find your dream home with the confidence of knowing your budget.'
      },
      {
        title: 'Formal Application',
        description: 'Submit your full mortgage application with the property details.'
      },
      {
        title: 'Processing & Underwriting',
        description: 'We verify your information, order an appraisal, and review all documentation.'
      },
      {
        title: 'Closing',
        description: 'Sign your final paperwork and receive the keys to your new home.'
      }
    ],
    faqs: [
      {
        question: 'What\'s the difference between pre-qualification and pre-approval?',
        answer: 'Pre-qualification is an informal estimate based on information you provide without verification. Pre-approval involves a formal application, credit check, and documentation review, resulting in a more accurate loan amount and rate quote. Sellers typically take pre-approved buyers more seriously.'
      },
      {
        question: 'How much down payment do I need?',
        answer: 'Down payment requirements vary by loan type. Conventional loans typically require 5-20%, FHA loans require at least 3.5%, VA loans may require 0% for qualified veterans, and some first-time homebuyer programs offer down payments as low as 3%. A larger down payment generally results in better loan terms and lower monthly payments.'
      },
      {
        question: 'What costs are involved beyond the down payment?',
        answer: 'Additional costs include closing costs (typically 2-5% of the loan amount), which cover appraisal fees, title insurance, attorney fees, and lender fees. You may also need funds for property taxes, homeowners insurance, and possibly mortgage insurance if your down payment is less than 20%.'
      },
      {
        question: 'Should I choose a fixed or adjustable-rate mortgage?',
        answer: 'Fixed-rate mortgages offer consistent payments throughout the loan term, providing stability and predictability. Adjustable-rate mortgages (ARMs) typically start with a lower rate that can change after the initial fixed period, which might be beneficial if you plan to move or refinance before the rate adjusts. Your choice depends on your financial situation, risk tolerance, and how long you plan to stay in the home.'
      },
      {
        question: 'How long does the mortgage process take?',
        answer: 'The typical mortgage process takes 30-45 days from application to closing. However, this timeline can vary based on factors such as loan type, property type, your financial situation, and current market conditions. Pre-approval can help expedite the process once you find a home.'
      },
      {
        question: 'Can I refinance my mortgage in the future?',
        answer: 'Yes, you can refinance your mortgage to potentially secure a lower interest rate, change your loan term, switch between fixed and adjustable rates, or access your home\'s equity. The best time to refinance depends on market conditions, your financial situation, and your long-term goals.'
      }
    ]
  };

  return (
    <>
      <LoanHero 
        loanType={loanData.type}
        title={loanData.title}
        subtitle={loanData.subtitle}
        description={loanData.description}
        minAmount={loanData.minAmount}
        maxAmount={loanData.maxAmount}
      />
      <LoanFeatures 
        loanType={loanData.type}
        features={loanData.features}
      />
      <LoanRates 
        loanType={loanData.type}
        minAmount={loanData.minAmount}
        maxAmount={loanData.maxAmount}
        minTerm={loanData.minTerm}
        maxTerm={loanData.maxTerm}
        minRate={loanData.minRate}
        maxRate={loanData.maxRate}
      />
      <LoanEligibility 
        loanType={loanData.type}
        requirements={loanData.eligibility}
      />
      <LoanProcess 
        loanType={loanData.type}
        steps={loanData.process}
      />
      <LoanFAQ 
        loanType={loanData.type}
        faqs={loanData.faqs}
      />
      <CTASection />
    </>
  );
}
