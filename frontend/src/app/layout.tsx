import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './../ui/globals.css'
import AuthProvider from '@/ui/components/auth-provider'
import AppNav from '@/ui/components/nav'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

const getAuthSession = () => {
  const userToken = cookies().get('crm-clone.token')?.value;
  return {
    session: !!userToken,
    user: {
      username: cookies().get('crm-clone.username')?.value,
    }
  };
}

export const metadata: Metadata = {
  title: 'CRM Clone App',
  description: '',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { session } = getAuthSession();

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body className={`${inter.className} p-12 bg-gray-100`}>
          <AppNav session={session} />
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout;