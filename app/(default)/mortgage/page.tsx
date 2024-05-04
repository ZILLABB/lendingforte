// import { useClient } from 'next/data-client';

import MortgagePage from "@/components/mortgage/mortgage";
import WhyChoosemortgage from "@/components/mortgage/whys";


export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};

export default function Mortgages() {
  return (
    <>
      <MortgagePage />
      <WhyChoosemortgage />
    </>
  );
}
