import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../ui-system/globals.css'
import AuthProvider from '@/ui-system/components/auth-provider'
import AppNav from '@/ui-system/components/nav'
import { cookies } from 'next/headers'
import HistoryProvider from '@/ui-system/components/history-provider'
import React from 'react'

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

const Layout = ({
  children,
  actionslot
}: {
  children: React.ReactNode,
  actionslot: React.ReactNode
}) => {

  const { session, user } = getAuthSession();

  console.log('actionslot', actionslot)

  return (
    <HistoryProvider>
      <AuthProvider session={session}>
        <html lang="en">
          <body className={`${inter.className} bg-white flex sm:flex-row flex-col w-full`}>
            <AppNav user={user} session={session} />
            {children}
            {actionslot}
          </body>
        </html>
      </AuthProvider>
    </HistoryProvider>
  )
}

export default Layout;