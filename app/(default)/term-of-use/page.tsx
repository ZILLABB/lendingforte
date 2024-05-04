import TermsOfUse from "@/components/term-of-use/term-of-use";
// import { useClient } from 'next/data-client';

export const metadata = {
  title: "Loan Application - Lending Forte",
  description: "Page description",
};


export default function Termsofuse() {
  return (
    <>
      <TermsOfUse />
    </>
  );
}
