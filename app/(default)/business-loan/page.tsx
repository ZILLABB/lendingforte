// import { useClient } from 'next/data-client';

import BusinessLoanPage from "@/components/business-loan/business-loan";
import BusinessWhyPage from "@/components/business-loan/business-why";


export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};

export default function Businessloan() {
  return (
    <>
      <BusinessLoanPage />
      <BusinessWhyPage />
    </>
  );
}
