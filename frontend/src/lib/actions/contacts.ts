import { unstable_noStore as noStore } from 'next/cache';

const apiEndpoint = process.env.BACKEND_API_URL;
const apiKey = process.env.CLIENT_SERVER_API_KEY;

export const getAllContacts = async () => {
  // Api key needed to access backend
  if (!apiKey) {
    throw new Error('API key is undefined');
  }

  noStore();

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
    },
    // body: JSON.stringify(jsonFormObject),
  };

  const apiRes = await fetch(`${apiEndpoint}/contacts`, options);

  if (!apiRes.ok) {
    throw new Error(apiRes.statusText);
  }

  const { data } = await apiRes.json();

  return data;
};
