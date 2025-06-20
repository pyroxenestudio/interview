// import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from '../store';
// import type {JobOffer} from '../../db';

// export interface JobOfferState {
//   jobs: JobOffer[]
// }

// const initialState: JobOfferState = {
//   jobs: [],
// }

// export const jobOfferSlice = createSlice({
//   name: 'joboffer',
//   initialState,
//   reducers: {
//     fillJobOffers: (state, action: PayloadAction<JobOffer[]>) => {
//       state.jobs = action.payload;

//     }
//   },
// })

// // Selectors
// export const selectJobOfferStore = (state: RootState) => state.jobOffer;

// // export const selectCompanyByName = (companyName: string) => {
// //   return (state: RootState) => {
// //     const companies = selectInterviewStore(state).companies;
// //     return companies.find((value: CompanyJson) => {
// //       return value.name == companyName;
// //     });
// //   }
// // }

// // Action creators are generated for each case reducer function
// export const { fillJobOffers } = jobOfferSlice.actions

// export default jobOfferSlice.reducer;