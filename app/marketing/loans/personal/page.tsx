import { Metadata } from 'next';
import LoanHero from '@/components/marketing/loans/hero';
import LoanFeatures from '@/components/marketing/loans/features';
import LoanRates from '@/components/marketing/loans/rates';
import LoanEligibility from '@/components/marketing/loans/eligibility';
import LoanProcess from '@/components/marketing/loans/process';
import LoanFAQ from '@/components/marketing/loans/faq';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Personal Loans | LendingForte',
  description: 'Explore our flexible personal loan options with competitive rates, quick approvals, and personalized service to meet your financial needs.',
};

export default function PersonalLoanPage() {
  // Personal loan specific content
  const loanData = {
    type: 'personal',
    title: 'Personal Loans',
    subtitle: 'Flexible financing for your personal needs',
    description: 'Our personal loans provide the financial flexibility you need for life\'s expenses, from debt consolidation to home improvements, with competitive rates and terms tailored to your situation.',
    minAmount: 1000,
    maxAmount: 50000,
    minTerm: 12,
    maxTerm: 60,
    minRate: 5.99,
    maxRate: 15.99,
    features: [
      {
        title: 'Flexible Loan Amounts',
        description: 'Borrow between $1,000 and $50,000 based on your needs and qualifications.',
        icon: 'CurrencyDollarIcon'
      },
      {
        title: 'Competitive Rates',
        description: 'Interest rates starting at 5.99% APR with autopay discount.',
        icon: 'ChartBarIcon'
      },
      {
        title: 'Quick Decisions',
        description: 'Get pre-approved in minutes and receive funds as soon as the next business day.',
        icon: 'ClockIcon'
      },
      {
        title: 'No Collateral Required',
        description: 'Unsecured loans that don\'t require you to pledge assets as security.',
        icon: 'ShieldCheckIcon'
      },
      {
        title: 'No Prepayment Penalties',
        description: 'Pay off your loan early without additional fees or penalties.',
        icon: 'BanknotesIcon'
      },
      {
        title: 'Fixed Monthly Payments',
        description: 'Predictable payments that won\'t change over the life of your loan.',
        icon: 'CalendarIcon'
      }
    ],
    eligibility: [
      'Be at least 18 years old',
      'Have a valid Social Security number',
      'Have a regular source of income',
      'Have a credit score of 660 or higher for the best rates',
      'Have a debt-to-income ratio below 40%',
      'Have no recent bankruptcies or major delinquencies'
    ],
    process: [
      {
        title: 'Apply Online',
        description: 'Complete our simple online application in just minutes.'
      },
      {
        title: 'Get Pre-Approved',
        description: 'Receive a quick decision based on the information you provide.'
      },
      {
        title: 'Verify Information',
        description: 'Submit required documentation to verify your identity and income.'
      },
      {
        title: 'Final Approval',
        description: 'Once verified, receive final approval and loan agreement.'
      },
      {
        title: 'Receive Funds',
        description: 'After signing your agreement, funds are deposited into your account.'
      }
    ],
    faqs: [
      {
        question: 'What can I use a personal loan for?',
        answer: 'Our personal loans can be used for almost any legitimate purpose, including debt consolidation, home improvements, major purchases, medical expenses, wedding costs, vacation expenses, and more. However, they cannot be used for illegal activities, gambling, or post-secondary education expenses.'
      },
      {
        question: 'How long does the application process take?',
        answer: 'The online application takes just 5-10 minutes to complete. Most applicants receive a pre-approval decision within minutes. Once you submit your documentation, final approval typically takes 1-2 business days, and funds are usually deposited within 24 hours of approval.'
      },
      {
        question: 'Do you check my credit score when I apply?',
        answer: 'Yes, we perform a soft credit check during the pre-approval process, which doesn\'t affect your credit score. If you proceed with the full application, we\'ll conduct a hard credit inquiry, which may temporarily lower your score by a few points.'
      },
      {
        question: 'Can I pay off my loan early?',
        answer: 'Yes, you can pay off your personal loan at any time without prepayment penalties. Making extra payments or paying off your loan early can help you save on interest costs.'
      },
      {
        question: 'What if I have less-than-perfect credit?',
        answer: 'While the best rates are available to those with excellent credit, we consider applications from individuals with a range of credit profiles. Factors such as income stability and debt-to-income ratio are also considered in our approval process.'
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
