// import { useClient } from 'next/data-client';

import BusinessLoanPage from "@/components/business-loan/business-loan";


export const metadata = {
  title: "Business Loans - Lending Forte",
  description: "Discover our business financing solutions tailored to your company's needs",
};

export default function Businessloan() {
  return (
    <>
      <BusinessLoanPage />
      {/* <BusinessWhyPage /> */}
    </>
  );
}
