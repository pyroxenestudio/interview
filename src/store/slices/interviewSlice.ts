import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import type {Interview as InterviewInterface} from '../../db';

export interface InterviewState {
  interviews: InterviewInterface[]
}

const initialState: InterviewState = {
  interviews: [],
}

export const InterviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {},
})

// Selectors
export const selectInterviewStore = (state: RootState) => state.interview;

// export const selectCompanyByName = (companyName: string) => {
//   return (state: RootState) => {
//     const companies = selectInterviewStore(state).companies;
//     return companies.find((value: CompanyJson) => {
//       return value.name == companyName;
//     });
//   }
// }

// Action creators are generated for each case reducer function
// export const {} = CompanySlice.actions

export default InterviewSlice.reducer;