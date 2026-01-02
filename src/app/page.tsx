'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Hero from '@/components/Hero/Hero';
import AboutSection from '@/components/About/AboutSection';
import ManifestoSection from '@/components/Manifesto/ManifestoSection';
import SkillsSection from '@/components/Skills/SkillsSection';
import LearningRoadmap from '@/components/Experience/LearningRoadmap';
import ResearchLab from '@/components/Research/ResearchLab';
import ProjectGallery from '@/components/Projects/ProjectGallery';
import BlogSection from '@/components/Blog/BlogSection';
import ContactSection from '@/components/Contact/ContactSection';
import SystemMonitor from '@/components/UI/SystemMonitor';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-void">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="animate-fade-in">
          <Hero />
          <AboutSection />
          <ManifestoSection />
          <SkillsSection />
          <LearningRoadmap />
          <ResearchLab />
          <ProjectGallery />
          <BlogSection />
          <ContactSection />
          <SystemMonitor />
        </div>
      )}
    </main>
  );
}
