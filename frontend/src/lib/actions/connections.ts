'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchUtil } from '../server/server-utils';
import { createEntity } from './entities';

const apiEndpoint = process.env.BACKEND_API_URL;

export const getAllConnectionsByAggregate = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/connections`,
  });
  return data;
};

export const getConnectionById = async (id: number) => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/connections/${id}`,
  });

  return data;
};

export const createConnection = async (prevState: null, formData: FormData) => {
  noStore();

  const data = await createEntity(formData, 'connections');
  revalidatePath('/connections', 'layout');

  return data;
};
