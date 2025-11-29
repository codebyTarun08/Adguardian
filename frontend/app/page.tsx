// app/page.jsx
import Navigation from '@/components/layout/Navigation';
import HomeContent from '@/components/HomeContent';

export default function HomePage() {
  // The layout takes care of the background. We just render the content.
  return (
    <>
      <Navigation />
      <HomeContent />
      {/* Footer can be added here if needed */}
    </>
  );
}