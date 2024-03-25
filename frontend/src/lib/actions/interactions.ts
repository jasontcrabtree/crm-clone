'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchUtil } from '../server/server-utils';

const apiEndpoint = process.env.BACKEND_API_URL;

export const protoGetInteractions = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/interactions/entity/ContactModel/17031994`,
  });

  console.log('protoGetInteractions data', data);

  return data;
};

export const getInteractionsByUser = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/interactions/user/all`,
  });

  console.log('getInteractionsByUser data', data);

  revalidatePath('/', 'layout');

  return data;
};

export const getInteractionByEntityId = async ({
  entityType = 'ContactModel',
  entityId = 17031994,
  body,
}: {
  entityType: string;
  entityId: number;
  body?: {};
}) => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/interactions/user/${entityType}/${entityId}`,
    body,
  });

  console.log('getInteractionByEntityId data', data);

  revalidatePath('/', 'layout');

  return data;
};

export const createNewInteraction = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'POST',
    url: `${apiEndpoint}/interactions/entity/ContactModel/17031994`,
  });

  console.log('createNewInteraction data', data);

  return data;
};

export const updateInteraction = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'PUT',
    url: `${apiEndpoint}/interactions/entity/ContactModel/17031994`,
  });

  console.log('updateInteraction data', data);

  return data;
};

export const deleteInteraction = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'DELETE',
    url: `${apiEndpoint}/interactions/entity/ContactModel/17031994`,
  });

  console.log('deleteInteraction data', data);

  return data;
};
