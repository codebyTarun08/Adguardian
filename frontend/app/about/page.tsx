// app/about/page.jsx
import Navigation from '@/components/layout/Navigation';
import AboutContent from '@/components/AboutContent';

export const metadata = {
  title: 'About | AdGuardian',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AboutContent />
    </>
  );
}