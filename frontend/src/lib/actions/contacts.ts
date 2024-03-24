'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { convertFormDataToJson, fetchUtil } from '../server/server-utils';
import { Contact } from '../types/contacts';
import { createEntity } from './entities';

const apiEndpoint = process.env.BACKEND_API_URL;

export const getAllContacts = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/contacts`,
  });

  console.log('data', data);

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
  // const data = convertFormDataToJson(formData);

  // const newContact = await fetchUtil({
  //   method: 'POST',
  //   url: `${apiEndpoint}/contacts`,
  //   body: {
  //     ...data,
  //   },
  // });

  // return newContact;

  const data = await createEntity(formData, 'contacts');
  console.log('data', data);
  revalidatePath('/contacts', 'layout');

  return;
};

// export const createContact = async (prevState: null, formData: FormData) => {
//   const data = convertFormDataToJson(formData);

//   const newContact = await fetchUtil({
//     method: 'POST',
//     url: `${apiEndpoint}/contacts`,
//     body: {
//       ...data,
//     },
//   });

//   revalidatePath('/contacts', 'layout');

//   return newContact;
// };

// export const updateContact = async (prevState: Contact, formData: FormData) => {
//   const data = convertFormDataToJson(formData);

//   const updatedContact = await fetchUtil({
//     method: 'PUT',
//     url: `${apiEndpoint}/contacts/${prevState.id}`,
//     body: {
//       ...data,
//     },
//   });

//   revalidatePath('/contacts', 'layout');

//   return updatedContact;
// };
