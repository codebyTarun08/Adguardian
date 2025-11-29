// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'AdGuardian - Fake Ad Detection',
  description: 'Protecting users from fraudulent advertisements using advanced Machine Learning and NLP.',
};

export default function RootLayout({ children } : any) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}