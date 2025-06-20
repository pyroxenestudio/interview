import { useEffect } from 'react';
// import { db } from './../db';
// import companies from '../company.json';
// import { useSelector } from 'react-redux';
// import { useJobOfferModel } from '../modelsHooks/useJobOfferModel';
import { useSelector } from 'react-redux';
import { selectAllJobs, selectJobsByCompany, useGetAllQuery, useAddJobOfferMutation, useAddInterviewMutation } from '../api/generalApi';

export default function Home () {
  // const dispatch = useDispatch();
  const {data, error, isLoading} = useGetAllQuery();
  const indra = useSelector(selectJobsByCompany('PATATA'));
  const allJobsSelector = useSelector(selectAllJobs);
  const [addJobOffer, result] = useAddJobOfferMutation();
  const [addInterview ,resultInterview] = useAddInterviewMutation();
  console.log('SELECTOR DE LA API PATATA', indra);
  console.log('allJobsSelector', allJobsSelector);
  console.log('data', data, 'error', error, 'isLoading', isLoading);
  console.log('RESULT MUTATION', result);
  console.log('RESULT MUTATION INTERVIEW', resultInterview);

  const addNewOffer = function() {
    const newOffer = {
      position: 'FullStack',
      note: 'La nota',
      company: 'HOLAAAAA',
      createdDate: new Date(),
      canceled: false
    };
    addJobOffer(newOffer);
  }

  const newInterview = function() {
    const newInterview = {
      createdDate: new Date(),
      canceled: false,
      company: 'indra',
      meetingDate: new Date(),
      meetingLink: 'www.google.es',
      location: 'Location',
      jobOffer: 1
    }
    addInterview(newInterview);
  }

  return (
    <>
      <button onClick={addNewOffer}>
        Add offer
      </button>
      <button onClick={newInterview}>
        Add Interview
      </button>
    </>
  )
}
