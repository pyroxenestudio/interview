import { useGetAllQuery } from '../api/generalApi';
import { Suspense, useDeferredValue } from 'react';
import useFilter from '../hooks/useFilter';
import JobOfferPreview from '../components/JobOfferPreview';
import Filters from '../components/Filters';

export default function Home () {
  const {data: jobOffers, error, isLoading} = useGetAllQuery();
  const {data: filteredJobOffers, changeFilter, changeSortBy} = useFilter(jobOffers);
  const deferredFilteredJobOffer = useDeferredValue(filteredJobOffers);

  console.log('Filtered', filteredJobOffers);

  // RENDER
  let list: React.ReactNode[] = [];
  if (deferredFilteredJobOffer?.length) {
    list = deferredFilteredJobOffer.map((offer) => {
      return <JobOfferPreview company={offer.job.company} createdDate={offer.job.createdDate} interviews={offer.interviews.length - 1} nextMeeting={new Date()} location={'Este es el location'} link={'Este es el link'} id={offer.job.id}/>
    });
  }

  return (
    <>
      <Suspense fallback={<>Loading Jobs</>}>
        <Filters changeFilter={changeFilter} changeSortBy={changeSortBy}/>
        {list}
      </Suspense>
    </>
  )
}

