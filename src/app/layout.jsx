import './globals.css';
import { Provider } from '@/components/ui/provider';

export const metadata = {
  title: 'Auth Process',
  description: 'Generic Auth Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
