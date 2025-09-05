// src/app/page.tsx - FIXED VERSION
import { Layout } from '@/components/global/Layout';
import { Hero } from '@/components/sections/Hero';
import { WorkSection } from '@/components/sections/WorkSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';
// import { ExtractedSvg } from '@/components/ui/ExtractedSvg'; // Unused import

export default function Home() {
  return (
    <Layout>
      <Hero />
      <WorkSection />
      {/* OR if you want to be explicit: */}
      {/* <WorkSection projects={workProjects} /> */}
      <TeamSection />
      <ContactSection />
    </Layout>
  );
}