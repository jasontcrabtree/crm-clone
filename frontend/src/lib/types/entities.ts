export type Contact = {
  index?: number;
  id: number;
  contactFirstName: string;
  contactSurname: string;
  contactEmail: string;
  contactPhone?: string;
  contactNotes?: string;
  userId?: number;
  createdTimeUnix?: number;
  updatedTimeUnix?: number;
  connections?: Connection[];
};

export type Connection = {
  id: number;
  connectionType: string;
  connectionValue: string;
  contactId: number;
  createdTimeUnix: number;
  updatedTimeUnix: number;
};

export enum EnumOrganisationType {
  Business,
  Government,
  NotForProfit,
  Charity,
  Education,
  Healthcare,
  Other,
}

export type Organisation = {
  id: number;
  organisationName?: string;
  organisationWebsite: string;
  organisationPhone?: string;
  organisationAddress?: string;
  organisationCity: string;
  organisationCountry: string;
  organisationNotes?: string;
  organisationType: EnumOrganisationType;
  userId: number;
};
