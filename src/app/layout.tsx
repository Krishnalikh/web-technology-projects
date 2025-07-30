import './globals.css'
import { ThemeProvider } from '@/components/theme_provider'
import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata = {
  title: 'ADmyBRAND Insights',
  description: 'AI-powered analytics dashboard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Top Navigation Bar */}
          <header className="w-full px-6 py-4 border-b border-gray-200 dark:border-zinc-700 bg-gradient-to-r from-white via-gray-50 to-white dark:from-zinc-900 dark:to-zinc-800 shadow-sm dark:shadow-lg">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <h1 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400 tracking-wider">
                ADmyBRAND Insights
              </h1>

              <nav className="flex flex-row gap-8 text-[15px] font-semibold">
                {[
                  { name: 'Dashboard', href: '/dashboard' },
                  { name: 'Booking Profile', href: '/bookings' },
                  { name: 'Campaigns', href: '/campaign' },
                  { name: 'Trends', href: '/trends' },
                  { name: 'Pricing', href: '/pricing' },
                  { name: 'Resources', href: '/resources' },
                  { name: 'Contacts', href: '/contacts' },
                ].map((link) => (
                  <div key={link.name} className="flex-shrink-0">
                    <Link
                      href={link.href}
                      className="inline-block px-5 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300 ease-in-out"
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>
          </header>

          {/* Page Content */}
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
