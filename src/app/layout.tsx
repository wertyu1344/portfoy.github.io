import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Ömer Said Akçin | Flutter Developer',
  description: 'Professional portfolio of Ömer Said Akçin, a mobile app developer specializing in Flutter development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-background text-text">
        {children}
      </body>
    </html>
  );
}
