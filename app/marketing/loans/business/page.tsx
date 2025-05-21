import { Metadata } from 'next';
import LoanHero from '@/components/marketing/loans/hero';
import LoanFeatures from '@/components/marketing/loans/features';
import LoanRates from '@/components/marketing/loans/rates';
import LoanEligibility from '@/components/marketing/loans/eligibility';
import LoanProcess from '@/components/marketing/loans/process';
import LoanFAQ from '@/components/marketing/loans/faq';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Business Loans | LendingForte',
  description: 'Fuel your business growth with our flexible business financing solutions, competitive rates, and personalized service tailored to your company\'s needs.',
};

export default function BusinessLoanPage() {
  // Business loan specific content
  const loanData = {
    type: 'business',
    title: 'Business Loans',
    subtitle: 'Financing solutions to grow your business',
    description: 'Our business loans provide the capital you need to start, expand, or optimize your business operations, with flexible terms and competitive rates designed for entrepreneurs and established companies alike.',
    minAmount: 10000,
    maxAmount: 500000,
    minTerm: 12,
    maxTerm: 84,
    minRate: 6.75,
    maxRate: 18.99,
    features: [
      {
        title: 'Flexible Funding Options',
        description: 'Term loans, lines of credit, equipment financing, and SBA loans to meet your specific needs.',
        icon: 'CurrencyDollarIcon'
      },
      {
        title: 'Competitive Rates',
        description: 'Interest rates starting at 6.75% APR for qualified businesses.',
        icon: 'ChartBarIcon'
      },
      {
        title: 'Fast Approvals',
        description: 'Decisions in as little as 24 hours for established businesses with strong financials.',
        icon: 'ClockIcon'
      },
      {
        title: 'Customized Repayment',
        description: 'Repayment terms tailored to your business cash flow and revenue cycles.',
        icon: 'CalendarIcon'
      },
      {
        title: 'No Early Repayment Fees',
        description: 'Pay off your loan ahead of schedule without penalties.',
        icon: 'BanknotesIcon'
      },
      {
        title: 'Dedicated Business Advisors',
        description: 'Expert guidance from financial professionals who understand your industry.',
        icon: 'UserGroupIcon'
      }
    ],
    eligibility: [
      'Business must be operational for at least 1 year (2+ years preferred)',
      'Minimum annual revenue of $100,000',
      'Business owner must have a credit score of 650 or higher',
      'No recent bankruptcies or tax liens',
      'Positive cash flow and ability to service debt',
      'Industry must not be on our restricted list'
    ],
    process: [
      {
        title: 'Initial Consultation',
        description: 'Discuss your business needs and financing options with our business lending specialists.'
      },
      {
        title: 'Application Submission',
        description: 'Complete our business loan application and provide required documentation.'
      },
      {
        title: 'Business Review',
        description: 'We analyze your business financials, credit history, and business plan.'
      },
      {
        title: 'Loan Proposal',
        description: 'Receive a customized loan proposal with terms tailored to your business.'
      },
      {
        title: 'Documentation',
        description: 'Submit any additional documentation required for final approval.'
      },
      {
        title: 'Funding',
        description: 'Once approved, receive funds in your business account within 1-3 business days.'
      }
    ],
    faqs: [
      {
        question: 'What types of business loans do you offer?',
        answer: 'We offer several types of business financing: Term loans for one-time capital needs, lines of credit for ongoing access to funds, equipment financing for purchasing business equipment, SBA loans with government guarantees, and commercial real estate loans for property purchases or refinancing. Our business advisors can help determine which option best suits your needs.'
      },
      {
        question: 'What documentation will I need to apply?',
        answer: 'Required documentation typically includes: Business financial statements (balance sheet, income statement, cash flow statement) for the past 2-3 years, personal and business tax returns for the past 2 years, bank statements for the past 3-6 months, a business plan for newer businesses, a debt schedule outlining existing business debts, and legal documents such as business licenses, articles of incorporation, and commercial leases.'
      },
      {
        question: 'How long does the business loan approval process take?',
        answer: 'The timeline varies based on loan type and amount. For established businesses with strong documentation, decisions can be made in as little as 24-48 hours. More complex loans, such as SBA loans or commercial real estate financing, may take 2-4 weeks. Once approved, funding typically occurs within 1-3 business days.'
      },
      {
        question: 'Can I apply if my business is a startup?',
        answer: 'Yes, though financing options may be more limited for startups. We generally prefer businesses with at least one year of operating history, but we do offer specialized startup financing options. These typically require a strong business plan, good personal credit, and possibly collateral or a personal guarantee. Our startup loans often have higher rates to account for the increased risk.'
      },
      {
        question: 'Do you require collateral for business loans?',
        answer: 'Collateral requirements vary by loan type and amount. Some smaller loans and lines of credit may be unsecured for businesses with strong credit and financials. Larger loans typically require collateral such as business assets, equipment, inventory, accounts receivable, or commercial real estate. SBA loans almost always require collateral, though they may proceed with limited collateral if the business demonstrates strong repayment ability.'
      },
      {
        question: 'Can I use a business loan to refinance existing debt?',
        answer: 'Yes, debt refinancing is a common use for our business loans. Refinancing can help you secure a lower interest rate, reduce monthly payments, extend your repayment term, or consolidate multiple debts into a single payment. To qualify for refinancing, your business typically needs to demonstrate improved financial performance or credit profile since the original loan was obtained.'
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
