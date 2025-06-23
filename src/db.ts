import Dexie, { type EntityTable } from 'dexie';

interface JobOffer {
  id: number;
  position: string;
  note: string;
  createdDate: Date;
  canceled: boolean;
  company: string; // ForeignKey
}

interface Interview {
  id: number;
  meetingDate?: Date;
  meetingLink?: string;
  location?: string;
  createdDate: Date;
  canceled: boolean;
  company: string; // ForeignKey
  jobOffer: number; // ForeignKey
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  company: string; // ForeignKey
}

interface JobOfferContact {
  idJobOffer: number;
  idContact: number;
}

const db = new Dexie('InterviewDB') as Dexie & {
  JobOffer: EntityTable<JobOffer,'id'>;
  Interview: EntityTable<Interview , 'id'>;
  Contact: EntityTable<Contact , 'id'>;
  JobOfferContact: EntityTable<JobOfferContact>;
}

// Schema declaration:
db.version(1).stores({
  JobOffer: '++id, canceled, company',
  Interview: '++id, canceled, company, joboffer',
  Contact: '++id, canceled, name, company, email',
  JobOfferContact: '[idJobOffer+idContact]'
});

// FIND
export async function findJobOffers() {
  return db.JobOffer.toArray().then((results) => {
    return results.sort((a,b) => {return a.createdDate > b.createdDate ? -1 : 1});
  });
}

export async function findInterviews() {
  return db.Interview.toArray().then((results) => {
    return results.sort((a,b) => {return a.createdDate > b.createdDate ? -1 : 1});
  });
}

export async function findContacts() {
  return db.Contact.toArray();
}

export async function findJoinContracts() {
  return db.JobOfferContact.toArray();
}

// ADD
export async function addJobOffer(job: Omit<JobOffer, 'id'>) {
  // Dexie: The object will be modified if the key is auto-generated, to include the generated key. That is why I do the {...job}
  return db.JobOffer.add({...job});
}

export async function addInterview(interview: Omit<Interview, 'id'>) {
  return db.Interview.add({...interview});
}

export async function addContact(contact: Omit<Contact, 'id'>, jobOfferId: number) {
  const id = await db.Contact.add({...contact});
  return db.JobOfferContact.add({
    idJobOffer: jobOfferId,
    idContact: id
  });
}

// UPDATE
export async function updateJobOffer(job: JobOffer) {
  return db.JobOffer.put({...job});
}

export async function updateInterview(interview: Interview) {
  return db.Interview.put({...interview});
}

export async function updateContact(contact: Contact) {
  return db.Contact.put({...contact});
}

export type { JobOffer, Interview, Contact, JobOfferContact };
export { db };