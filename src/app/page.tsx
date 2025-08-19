// src/app/page.tsx
import { Layout } from '@/components/global/Layout';
import { Hero } from '@/components/sections/Hero';
import { WorkSection } from '@/components/sections/WorkSection';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <WorkSection />
    </Layout>
  );
}
