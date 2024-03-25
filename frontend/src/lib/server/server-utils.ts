'use server';

import { cookies } from 'next/headers';
import { ApiReqContract } from '../types/utils';

/**
 * Small wrapper around fetch with authentication and error handling.
 */
export const fetchUtil = async ({
  method,
  url,
  body,
  cache = 'no-store',
}: {
  method: string;
  url: string;
  body?: {};
  cache?: 'no-store' | 'force-cache';
}) => {
  const apiKey = process.env.CLIENT_SERVER_API_KEY;

  if (!apiKey) {
    throw new Error('API key is undefined');
  }

  const options: ApiReqContract = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': apiKey,
      Authorization: `Bearer ${cookies().get('crm-clone.token')?.value}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const apiRes = await fetch(url, {
    ...options,
    cache: cache,
    next: { tags: ['contacts'] },
  });

  if (!apiRes.ok) {
    console.log('ERROR apiRes', apiRes);
    throw new Error(apiRes.statusText);
  }

  const { data } = await apiRes.json();

  return data;
};

export const convertFormDataToJson = (formData: FormData) => {
  const convertedJson = Object.fromEntries(formData.entries());

  return convertedJson;
};
