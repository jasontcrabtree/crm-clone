'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const logoutSession = async (): Promise<void> => {
  cookies().delete('crm-clone.token');
  cookies().delete('crm-clone.username');

  redirect('/');
};

export default logoutSession;
