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
}: {
  method: string;
  url: string;
  body?: {};
}) => {
  const apiKey = process.env.CLIENT_SERVER_API_KEY;

  console.log('url', url);

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
    next: { tags: ['contacts'] },
  });

  if (!apiRes.ok) {
    let errorDetails = '';
    try {
      const errorResponse = await apiRes.json();
      errorDetails = JSON.stringify(errorResponse);
    } catch (error) {
      errorDetails = 'Failed to parse error response body';
    }

    console.error('API Request Failed:', {
      url,
      status: apiRes.status,
      statusText: apiRes.statusText,
      errorDetails,
    });

    throw new Error(apiRes.statusText);
  }

  if (apiRes.status === 204) {
    return null;
  }

  const { data } = await apiRes.json();

  return data;
};

export const convertFormDataToJson = (formData: FormData) => {
  const convertedJson = Object.fromEntries(formData.entries());

  return convertedJson;
};
