import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../ui-system/globals.css'
import AuthProvider from '@/ui-system/components/auth-provider'
import AppNav from '@/ui-system/components/nav'
import { cookies } from 'next/headers'
import TodoList from '@/ui-system/components/todo-list'

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
  title: 'Bondbridge',
  description: 'CRM clone project built with Next.js, App Router, Tailwind CSS, and a .Net WebAPI backend',
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
        <body className={`${inter.className} bg-white flex sm:flex-row flex-col`}>
          <AppNav session={session} />
          {children}
          <TodoList />
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout;