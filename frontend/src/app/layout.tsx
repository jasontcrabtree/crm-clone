import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../ui-system/globals.css'
import AuthProvider from '@/ui-system/components/auth-provider'
import AppNav from '@/ui-system/components/nav'
import { cookies } from 'next/headers'
import TodoList from '@/ui-system/components/todo-list'
import HistoryProvider from '@/ui-system/components/history-provider'

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
  icons: {
    icon: "/favicon.svg",
  },
  authors: [
    {
      name: "Jason Crabtree",
      url: "https://jasontcrabtree.com",
    },
  ],
  creator: "Jason Crabtree",
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {


  const { session, user } = getAuthSession();

  return (
    <AuthProvider session={session}>
      <HistoryProvider>
        <html lang="en">
          <body className={`${inter.className} bg-white flex sm:flex-row flex-col`}>
            <AppNav user={user} session={session} />
            {children}
            <TodoList />
          </body>
        </html>
      </HistoryProvider>
    </AuthProvider>
  )
}

export default RootLayout;