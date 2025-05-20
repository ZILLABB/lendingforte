// import { useClient } from 'next/data-client';

import PersonalLoanPage from "@/components/personal-loan/personal-loan";

export const metadata = {
  title: "Personal Loans - Lending Forte",
  description: "Explore our personal loan options with competitive rates and flexible terms",
};

export default function PersonalLoan() {
  return (
    <>
      <PersonalLoanPage />
      {/* <WhyChooseLendingFortePage /> */}
    </>
  );
}
