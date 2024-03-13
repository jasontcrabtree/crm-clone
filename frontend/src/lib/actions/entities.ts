'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { convertFormDataToJson, fetchUtil } from '../server/server-utils';
import { Contact } from '../types/contacts';
import { EntityTypes } from '../types/utils';
import { redirect } from 'next/navigation';

const apiEndpoint = process.env.BACKEND_API_URL;

export const createEntity = async (
  formData: FormData,
  entityType: EntityTypes
) => {
  console.log('FormData', convertFormDataToJson(formData), entityType);
  const newEntity = await fetchUtil({
    method: 'POST',
    url: `${apiEndpoint}/${entityType}`,
    body: convertFormDataToJson(formData),
  });

  console.log('newEntity', newEntity);

  //   revalidatePath(`/${entityType}`, 'layout');
  return newEntity;
};

export const getAllEntityItems = async (entityType: EntityTypes) => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/${entityType}`,
  });

  return data;
};

export const getEntityById = async (id: number, entityType: EntityTypes) => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/${entityType}/${id}`,
  });

  return data;
};

export const updateEntityById = async (
  id: number,
  formData: FormData,
  entityType: EntityTypes
) => {
  noStore();

  const data = await fetchUtil({
    method: 'PUT',
    url: `${apiEndpoint}/${entityType}/${id}`,
    body: {
      ...convertFormDataToJson(formData),
    },
  });

  return data;
};

export const deleteEntityById = async (id: number, entityType: EntityTypes) => {
  noStore();

  await fetchUtil({
    method: 'DELETE',
    url: `${apiEndpoint}/${entityType}/${id}`,
  });

  revalidatePath(`/${entityType}`, 'layout');
  redirect(`/${entityType}`);
};
