import { Connection } from './connections';

export type Contact = {
  id: number;
  contactFirstName: string;
  contactSurname: string;
  contactEmail: string;
  contactPhone: string;
  contactNotes: string;
  userId: number;
  createdTimeUnix: number;
  updatedTimeUnix: number;
  connections: Connection[];
};