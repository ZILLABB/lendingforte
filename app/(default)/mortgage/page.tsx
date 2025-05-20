// import { useClient } from 'next/data-client';

import MortgagePage from "@/components/mortgage/mortgage";


export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};

export default function Mortgages() {
  return (
    <>
      <MortgagePage />
      {/* <WhyChoosemortgage /> */}
    </>
  );
}
