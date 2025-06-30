import { useGetAllQuery } from '../api/generalApi';
import { Suspense, useDeferredValue } from 'react';
import useFilter from '../hooks/useFilter';
import JobOfferPreview from '../components/JobOfferPreview';
import Filters from '../components/Filters';
import { useSelector } from 'react-redux';
import { selectCompanies } from '../store/slices/companySlice';

export default function Home () {
  const {data: jobOffers} = useGetAllQuery();
  const {data: filteredJobOffers, changeFilter, changeSortBy} = useFilter(jobOffers);
  const deferredFilteredJobOffer = useDeferredValue(filteredJobOffers);
   const companies = useSelector(selectCompanies);

  console.log('Filtered', filteredJobOffers);

  // RENDER
  let list: React.ReactNode[] = [];
  if (deferredFilteredJobOffer?.length) {
    list = deferredFilteredJobOffer.map((offer) => {
      const nextMeeting = offer.interviews.filter((interview) => {
          return interview.meetingDate && !interview.canceled;
        })[0];

      return <JobOfferPreview
        company={companies[offer.job.company].name}
        position={offer.job.position}
        createdDate={offer.job.createdDate}
        interviews={offer.interviews.length}
        nextMeeting={nextMeeting?.meetingDate ?? undefined}
        location={nextMeeting?.location ?? undefined}
        link={nextMeeting?.meetingLink ?? undefined}
        id={offer.job.id}
      />
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

