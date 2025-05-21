import { Metadata } from 'next';
import ContactHero from '@/components/marketing/contact/hero';
import ContactForm from '@/components/marketing/contact/form';
import ContactInfo from '@/components/marketing/contact/info';
import ContactMap from '@/components/marketing/contact/map';
import ContactFAQ from '@/components/marketing/contact/faq';

export const metadata: Metadata = {
  title: 'Contact Us | LendingForte',
  description: 'Get in touch with LendingForte for any questions about our financial services or to schedule a consultation with our experts.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
      <ContactFAQ />
    </>
  );
}
