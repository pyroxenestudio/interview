import { configureStore } from '@reduxjs/toolkit';
import JobsInformationReducer from '../store/slices/companySlice';
import { generalApi } from '../api/generalApi';
import { setupListeners } from '@reduxjs/toolkit/query'
// import interviewReducer from '../store/slices/jobofferSlice';
// import jobOfferReducer from '../store/slices/jobofferSlice';

export const store = configureStore({
  reducer: {
    JobsInformation: JobsInformationReducer,
    [generalApi.reducerPath]: generalApi.reducer
    // interview: interviewReducer,
    // joboffer: jobOfferReducer 
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(generalApi.middleware)
  }
})

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch