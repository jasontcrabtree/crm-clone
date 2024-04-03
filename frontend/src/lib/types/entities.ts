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
  connectionLabel: string;
  createdTimeUnix: number;
  updatedTimeUnix: number;

  contactId?: number;
  interactionId?: number;
  organisationId?: number;

  contactModel?: any;
  contactDetails?: Contact;
  interactionModel?: any;
  interactionDetails?: any;
  organisationModel?: any;
  organisationDetails?: Organisation;
};

export enum ConnectionType {
  Employee = 0,
  ExternalPartner = 1,
  Stakeholder = 2,
  Customer = 3,
  Referral = 4,
  Custom = 5,
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

export type EnumOrganisationType =
  | 'Business'
  | 'Government'
  | 'NotForProfit'
  | 'Charity'
  | 'Education'
  | 'Healthcare'
  | 'Other';

type InteractionType =
  | 'ContactCreated'
  | 'ContactUpdated'
  | 'ContactDeleted'
  | 'OrganisationCreated'
  | 'OrganisationUpdated'
  | 'OrganisationDeleted'
  | 'ConnectionCreated'
  | 'ConnectionUpdated'
  | 'ConnectionDeleted'
  | 'InteractionCreated'
  | 'InteractionUpdated'
  | 'InteractionDeleted'
  | 'MessageCreated'
  | 'MessageUpdated'
  | 'MessageDeleted'
  | 'RemoteMeeting'
  | 'InPersonMeeting'
  | 'Phonecall'
  | 'Email'
  | 'Text'
  | 'Conference'
  | 'Adhoc'
  | 'Sale'
  | 'Discovery'
  | 'Demo'
  | 'Collaboration'
  | 'Training'
  | 'Partnership'
  | 'Presentation'
  | 'Mentorship'
  | 'Education'
  | 'Contract'
  | 'CustomerService'
  | 'Dispute'
  | 'Other';

export type Interaction = {
  id: number;
  createdTimeUnix: number;
  updatedTimeUnix: number;
  interactionDate: string;
  interactionTitle?: string;
  interactionNotes?: string;
  detailedData?: string;
  interactionType: InteractionType;
  customInteractionType?: string;
  entityType?: string;
  entityId?: number;
  userId?: number;
};
