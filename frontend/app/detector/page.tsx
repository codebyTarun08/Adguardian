// app/detector/page.jsx
import Navigation from '@/components/layout/Navigation';
import DetectorForm from '@/components/DetectorForm';

export const metadata = {
  title: 'Detector | AdGuardian',
};

export default function DetectorPage() {
  return (
    <>
      <Navigation />
      <DetectorForm />
    </>
  );
}