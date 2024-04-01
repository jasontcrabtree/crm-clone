/*
Connection endpoint works with the following data:
label and type are required
id of different entities to create the connection (multiple connections supported)
connectionType enums:
[ Employee, ExternalPartner, Stakeholder, Customer, Referral, Custom ]
*/

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
  const data = await createEntity(formData, 'connections');
  revalidatePath('/connections', 'layout');

  return data;
};
