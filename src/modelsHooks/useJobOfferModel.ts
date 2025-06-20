// import { useEffect } from 'react';
// import { db } from './../db';
// import { useDispatch, useSelector } from 'react-redux';
// import { fillJobOffers, selectJobOfferStore } from '../store/slices/jobofferSlice';

export function useJobOfferModel() {
  // const dispatch = useDispatch();
  // const jobOffers = useSelector(selectJobOfferStore);

  // useEffect(() => {
  //   if (!jobOffers.jobs.length) {
  //     db.joboffer.toArray().then((results) => {
  //       if (results) {
  //         console.log(results);
  //         dispatch(fillJobOffers(results));
  //       }
  //     })
  //   }
  // }, []);

  // async function findByCompany(company: string) {
  //   return await db.joboffer.get({company}).then((result) => {
  //     console.log(result);
  //   })
  // }

  // async function findAll() {
  //   return await db.joboffer.toArray();
  // }

  // async function findCanceled(orderBy: string) {
  //   return await db.joboffer.where('canceled').equals('true').sortBy(orderBy);
  // }

  // return {
  //   findByCompany,
  //   findAll,
  //   findCanceled
  // }
}