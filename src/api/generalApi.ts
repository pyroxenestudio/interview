import { createApi } from '@reduxjs/toolkit/query/react'
import { findJobOffers, findInterviews, findContacts, findJoinContracts, type JobOffer, addJobOffer as addJobOfferDB, addInterview as addInterviewDB, type Interview, updateJobOffer} from '../db';
import { createSelector } from '@reduxjs/toolkit';
import type { JobsInterviewsContacts } from '../store/slices/companySlice';

interface ResponseInterface {
  data: boolean,
  meta: {
    offline: boolean,
    error?: Error | unknown,
    body: unknown
  }
}

const localBaseQuery = async function(body?: unknown): Promise<ResponseInterface> {
  try {
    const data = false; // do the fetch
    if (!data) {
      throw new Error("The fetch has failed");
    }
    return {data: true, meta: {offline: false, body}}
  } catch (error) {
    return { data: false, meta: {offline: true, error, body}}
  }
};

export const generalApi = createApi({
  reducerPath: 'general',
  baseQuery: localBaseQuery,
  endpoints: (build) => ({
    // build.query<final response (what is going to be saved in cache), argsType>
    getAll: build.query<JobsInterviewsContacts[], void>({
      query: () => '',
      transformResponse: async (_data, meta) => {
        console.log('useGetAllQuery TRANSFORMANDO');
        if (meta.offline) {
          return await Promise.all([findJobOffers(), findInterviews(), findContacts(), findJoinContracts()]).then((results) => {
            if (results) {
              const [jobs, interviews, contacts, jobsAndContact] = results;
              return jobs.map((job) => {
                // Table N:M for contacts and jobOffers
                const contactsID = jobsAndContact.filter(jc => jc.idJobOffer == job.id);
                return {
                  job: job,
                  interviews: interviews.filter((interview) => interview.jobOffer == job.id),
                  contacts: contacts.filter((contact) => contactsID.find((key) => contact.id == key.idContact))
                }
              });
            }
            return [];
          });
        }
        return []; // TODO in the future, it will be response
      }
    }),
    // build.mutation<final response (what is going to be saved in cache), argsType (in this case the body)>
    addJobOffer: build.mutation<JobOffer | undefined, Omit<JobOffer, 'id'>>({
      query: (body) => body,
      transformResponse: async (_data, meta) => {
        if (meta.offline) {
          const job = meta.body as Omit<JobOffer, 'id'>;
          return await addJobOfferDB(job).then((id) => {
            return {id, ...job}
          });
        }
        return;
      },
      // _args is the args in the query, in this case is body 
      onQueryStarted: async (_args, {dispatch, queryFulfilled }) => {
        try {
          const {data: job } = await queryFulfilled;
          dispatch(generalApi.util.updateQueryData('getAll', undefined, (draft) => {
            if (job) {
              draft.push({
                job,
                interviews: [],
                contacts: []
              });
            }
            return draft.sort((a, b) => a.job.createdDate > b.job.createdDate ? -1 : 1);
          }))
        } catch {
          console.log('Error');
        }
      }
    }),
    updateJobOffer: build.mutation<JobOffer | undefined, JobOffer>({
      query: (body) => body,
      transformResponse: async (_data, meta) => {
        if (meta.offline) {
          const job = meta.body as JobOffer;
          return await updateJobOffer(job).then(() => {
            return job;
          });
        }
        return;
      },
      // _args is the args in the query, in this case is body 
      onQueryStarted: async (_args, {dispatch, queryFulfilled }) => {
        try {
          const {data: job } = await queryFulfilled;
          dispatch(generalApi.util.updateQueryData('getAll', undefined, (draft) => {
            if (job) {
              draft.push({
                job,
                interviews: [],
                contacts: []
              });
            }
            return draft.sort((a, b) => a.job.createdDate > b.job.createdDate ? -1 : 1);
          }))
        } catch {
          console.log('Error');
        }
      }
    }),
    // build.mutation<final response (what is going to be saved in cache), argsType (in this case the body)>
    addInterview: build.mutation<Interview | undefined, Omit<Interview, 'id'>>({
      query: (body) => body,
      transformResponse: async (_data, meta) => {
        if (meta.offline) {
          const interview = meta.body as Omit<Interview, 'id'>;
          return await addInterviewDB(interview).then((id) => {
            return {id, ...interview}
          });
        }
        return;
      },
      // _args is the args in the query, in this case is body 
      onQueryStarted: async (_args, {dispatch, queryFulfilled }) => {
        try {
          const {data: interview } = await queryFulfilled;
          if (interview) {
            dispatch(generalApi.util.updateQueryData('getAll', undefined, (draft) => {
              const jobOffer = draft.find((jobOffer) => {
                return jobOffer.job.id == interview.jobOffer;
              });
              if (jobOffer) {
                jobOffer.interviews.push(interview);
                jobOffer.interviews.sort((a, b) => a.createdDate > b.createdDate ? -1 : 1);
              }
              return draft;
            }));
          }
        } catch {
          console.log('Error');
        }
      }
    })
  }),
});

export const selectAllJobs = generalApi.endpoints.getAll.select();

// This can memorize by parameter
export const selectJobsByCompany = (company: string) => {
  const selector = createSelector(
    [selectAllJobs],
    (all) => {
      if (all?.data) {
        return all.data.filter((result: JobsInterviewsContacts) => result.job.company == company);
      } else {
        return [];
      }
    }
  )
  return selector;
}

export function selectJobById(id: string | number | undefined) {
  const selector = createSelector(
    [selectAllJobs],
    (all) => {
      console.log('BUSCANDO', id);
      if (all.data && id) {
        if (typeof id === 'string') id = parseInt(id);
        let pivot = Math.floor(all.data.length/2);
        // It is already sorted first is newer and last one is older
        let tempJobOffers = all.data.slice();
        while(pivot > -1) {
          if (tempJobOffers[pivot].job.id == id) {
            const found = tempJobOffers[pivot];
            return found;
          } else if (pivot == 0) {
            return;
          }

          if (id > tempJobOffers[pivot].job.id) {
            tempJobOffers = tempJobOffers.slice(0, pivot);
          } else {
            tempJobOffers = tempJobOffers.slice(pivot);
          }
          pivot = Math.floor(tempJobOffers.length/2);
        }
      }
    }
  )
  return selector;
}

export const { useGetAllQuery, useAddJobOfferMutation, useAddInterviewMutation, useUpdateJobOfferMutation } = generalApi