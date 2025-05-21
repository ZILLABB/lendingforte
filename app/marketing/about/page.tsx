import { Metadata } from 'next';
import AboutHero from '@/components/marketing/about/hero';
import AboutMission from '@/components/marketing/about/mission';
import AboutTeam from '@/components/marketing/about/team';
import AboutValues from '@/components/marketing/about/values';
import AboutTimeline from '@/components/marketing/about/timeline';
import AboutPartners from '@/components/marketing/about/partners';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'About Us | LendingForte',
  description: 'Learn about LendingForte\'s mission, values, and the team behind our premium financial solutions.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutTimeline />
      <AboutPartners />
      <CTASection />
    </>
  );
}
