'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { fetchUtil } from '../server/server-utils';
import { createEntity } from './entities';

const apiEndpoint = process.env.BACKEND_API_URL;

export const getAllOrganisations = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/organisations`,
  });
  return data;
};

export const getAllOrganisationInteractions = async () => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/interactions/entity/OrganisationModel`,
  });

  return data;
};

export const getOrganisationById = async (id: number) => {
  noStore();

  const data = await fetchUtil({
    method: 'GET',
    url: `${apiEndpoint}/organisations/${id}`,
  });

  return data;
};

export const createOrganisation = async (
  prevState: null,
  formData: FormData
) => {
  const data = await createEntity(formData, 'organisations');
  revalidatePath('/organisations', 'layout');

  return data;
};
