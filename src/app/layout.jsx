import './globals.css';

export const metadata = {
  title: 'Auth Process',
  description: 'Generic Auth Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
