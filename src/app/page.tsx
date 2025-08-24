// src/app/page.tsx
import { Layout } from '@/components/global/Layout';
import { Hero } from '@/components/sections/Hero';
import { WorkSection } from '@/components/sections/WorkSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { workProjects } from '@/lib/data/work-projects';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <WorkSection
        projects={workProjects.slice(0, 3)}
      />
      <TeamSection />
      <ContactSection />
    </Layout>
  );
}
