'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const handleUserAuthentication = async (
  formData: FormData,
  action: string
) => {
  let registerRes = {
    status: 0,
    ok: false,
  };

  const apiKey = process.env.CLIENT_SERVER_API_KEY;

  // Api key needed to access backend
  if (!apiKey) {
    throw new Error('API key is undefined');
  }

  const jsonFormObject = Object.fromEntries(formData.entries());

  if (action === 'register') {
    registerRes = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(jsonFormObject),
    });
    if (!registerRes.ok) throw new Error('Error registering user');
  }

  // After user registration, retrieve user login JWT
  if (registerRes.status === 200 || action === 'login') {
    const loginRes = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify(jsonFormObject),
    });

    const loginData = await loginRes.json();

    cookies().set('crm-clone.token', loginData.token);
    cookies().set('crm-clone.username', loginData.username);

    redirect('/');
  }
};

export const logoutSession = async (): Promise<void> => {
  cookies().delete('crm-clone.token');
  cookies().delete('crm-clone.username');

  redirect('/sign-in');
};
