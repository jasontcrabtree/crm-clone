import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './../ui/globals.css'
import AuthProvider from '@/ui/components/auth-provider'
import AppNav from '@/ui/components/nav'

const inter = Inter({ subsets: ['latin'] })

const getAuthSession = async () => {
  const res = await fetch('http://localhost:5298/', {});

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}

export const metadata: Metadata = {
  title: 'CRM Clone App',
  description: '',
}

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const authData = await getAuthSession();

  if (authData) {
    console.log('authData', authData)
  }

  return (
    <AuthProvider session={authData}>
      <html lang="en">
        <body className={`${inter.className} p-12`}>
          <AppNav />
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout;