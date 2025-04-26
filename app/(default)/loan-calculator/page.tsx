// import { useClient } from 'next/data-client';

import LoanCalculator from "@/app/reuseable/calculator";


export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};

export default function Mortgages() {
  return (
    <>
      <LoanCalculator />
    </>
  );
}
