// import { useClient } from 'next/data-client';

import PersonalLoanPage from "@/components/personal-loan/personal-loan";
import WhyChooseLendingFortePage from "@/components/personal-loan/why";

export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};

export default function PersonalLoan() {
  return (
    <>
      <PersonalLoanPage />
      <WhyChooseLendingFortePage />
    </>
  );
}
