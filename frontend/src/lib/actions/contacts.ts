'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchUtil } from '../server/server-utils';
import { createEntity } from './entities';

const apiEndpoint = process.env.BACKEND_API_URL;

export const getAllContacts = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/contacts`,
  });

  return data;
};

export const getAllContactInteractions = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/interactions/entity/ContactModel`,
  });

  return data;
};

export const getContactById = async (id: number) => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/contacts/${id}`,
  });

  return data;
};

export const createContact = async (prevState: null, formData: FormData) => {
  const data = await createEntity(formData, 'contacts');
  revalidatePath('/contacts', 'layout');

  return data;
};
