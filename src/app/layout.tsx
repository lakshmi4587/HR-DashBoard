import '../globals.css';
import Header from '@/components/Header';
import { BookmarkProvider } from '@/context/BookmarkContext'; // ✅ import the provider

export const metadata = {
  title: 'HR Dashboard',
  description: 'Employee performance management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-blue-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <BookmarkProvider> {/* ✅ wrap everything with BookmarkProvider */}
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-6">
            {children}
          </main>
        </BookmarkProvider>
      </body>
    </html>
  );
}
