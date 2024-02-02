'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchUtil } from '../server/server-utils';

const apiEndpoint = process.env.BACKEND_API_URL;

export const getAllContacts = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/contacts`,
  });

  return data;
};

export const newContact = async () => {
  const data = await fetchUtil({
    method: 'POST',
    url: `${apiEndpoint}/contacts`,
    body: {
      contactEmail: `jasondevtesting+${new Date().getMinutes()}.${new Date().getMilliseconds()}@gmail.com`,
      contactFirstName: `Jason H${new Date().getHours()} M${new Date().getMinutes()} MS${new Date().getMilliseconds()}`,
      contactPhone: '0273224961',
      contactSurname: 'C',
      contactNotes: 'Second demo in NextJS',
    },
  });
  // revalidateTag('contacts');
  revalidatePath('/contacts/[slug]', 'layout');
  return data;
};
