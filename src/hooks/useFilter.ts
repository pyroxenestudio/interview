import { useEffect, useMemo, useState } from "react";
import type { Filter, SortBy } from "../types/filters";
import type { JobsInterviewsContacts } from "../store/slices/companySlice";

/**
 * 
 * @param {JobsInterviewsContacts} data is the information to be filtered 
 * @returns filtered data
 */
export default function useFilter(data: JobsInterviewsContacts[] | undefined) {
  const [filter, setFilter] = useState<Filter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('createdDate');
  const [filterIsReady, setFilterIsReady] = useState<boolean>(false);

  // Prepare filters so, it doesn't filter at first render, because by default is already filtered
  useEffect(() => {
    if (data && !filterIsReady) {
      setFilterIsReady(true);
    }
  }, [data, filterIsReady])

  const filteredData = useMemo(() => {
    if (data && filterIsReady) {
      let dataToBeFiltered = data.slice();
      console.log('FILTRANDO');
      //  STEP 1 Filter
      if (filter != 'all') {
        // Filtrar
        switch (filter) {
          case 'canceled':
            dataToBeFiltered = dataToBeFiltered.filter((data) => data.job.canceled);
            break;
          case 'meeting':
            dataToBeFiltered = dataToBeFiltered.filter((data) => data.interviews.filter((interview) => interview.meetingDate));
            break;
        }
      }

      // STEP 2 SortBy
      switch (sortBy) {
        case 'createdDate':
          console.log('SHORT BY CREATEDDATE');
          break;
        case 'meeting':
          console.log('SHORT BY MEETING');
          break;
        default:
          break;
      }
      return dataToBeFiltered;
    }
  }, [sortBy, filter, data])
  
  
  return {
    changeSortBy: setSortBy,
    changeFilter: setFilter,
    data: filteredData ?? data
  }
}