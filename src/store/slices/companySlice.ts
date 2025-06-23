import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import companyJson from './../../company.json';
import type { RootState } from '../store';
import type { Contact, Interview, JobOffer, JobOfferContact } from '../../db';

interface CompanyJson {
  name: string;
  description: string;
  web: string;
  email: string;
}

export interface JobsInterviewsContacts {
  job: JobOffer;
  interviews: Interview[];
  contacts: Contact[];

}

export interface JobsInformationState {
  companies: {[key: string]: CompanyJson};
  jobs: JobsInterviewsContacts[];
}

const initialState: JobsInformationState = {
  companies: companyJson,
  jobs: []
}

export const JobsInformationSlice = createSlice({
  name: 'JobsInformation',
  initialState,
  reducers: {
    fillJobs: (state, action: PayloadAction<{jobs: JobOffer[];interviews: Interview[];contacts: Contact[];jobsAndContact: JobOfferContact[]}>) => {
      const {jobs, interviews, contacts, jobsAndContact} = action.payload;
      // Join the data
      state.jobs = jobs.map((job) => {
        console.log('filter interview');
        console.log(interviews.filter((interview) => interview.jobOffer == job.id));
        // Table N:M for contacts and jobOffers
        const contactsID = jobsAndContact.filter(jc => jc.idJobOffer == job.id);
        return {
          job: job,
          interviews: interviews.filter((interview) => interview.jobOffer == job.id),
          contacts: contacts.filter((contact) => contactsID.find((key) => contact.id == key.idContact))
        }
      });
    },
    // addOffer: (state, action: PayloadAction<JobOffer>) => {
    //   state.jobs.push({
    //     job: action.payload,
    //     interviews: [],
    //     contacts: []
    //   });
    //   state.jobs.sort((a, b) => a.job.createdDate > b.job.createdDate ? -1 : 1);
    // },
    // addInterview: (state, action: PayloadAction<Interview>) => {
    //   const jobOffer = state.jobs.find((jobOffer) => {
    //     return jobOffer.job.id == action.payload.jobOffer;
    //   });
    //   if (jobOffer) {
    //     jobOffer.interviews.push(action.payload);
    //     jobOffer.interviews.sort((a, b) => a.createdDate > b.createdDate ? -1 : 1);
    //   }
    // },
    // addContact: (state, action: PayloadAction<Contact>) => {

    // }
  },
})

// Selectors
export const selectJobsInformationStore = (state: RootState) => state.JobsInformation;

export const selectCompanies = (state: RootState) => state.JobsInformation.companies;

// export const selectJobsInformationByName = (companyName: string) => {
//   return (state: RootState) => {
//     const companies = selectJobsInformationStore(state).companies;
//     return companies.find((value: CompanyJson) => {
//       return value.name == companyName;
//     });
//   }
// }

// Action creators are generated for each case reducer function
export const { fillJobs } = JobsInformationSlice.actions

export default JobsInformationSlice.reducer