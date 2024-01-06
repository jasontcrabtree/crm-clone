'use server';

export const registerUser = async (formData: FormData) => {
  console.log('formData', formData);

  const apiKey = process.env.CLIENT_SERVER_API_KEY;
  if (!apiKey) {
    throw new Error('API key is undefined');
  }

  const registerRes = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: '{"username":"jason1","password":"password123"}',
      //   body: JSON.stringify(formData),
    }
  );

  if (!registerRes.ok) throw new Error('Error registering user');

  const data = await registerRes.json();

  console.log('data', data);

  return data;
};
