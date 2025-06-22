import type { Filter, SortBy } from "../types/filters"

interface FiltersProps {
  changeFilter: (filter: Filter) => void;
  changeSortBy: (sortBy: SortBy) => void;
}

export default function Filters ({changeFilter, changeSortBy}: FiltersProps) {
  const filterOptions: Record<Filter, string> = {
    all: 'All',
    canceled: 'Canceled',
    meeting: 'Meetings'
  };

  const sortByOptions: Record<SortBy, string> = {
    meeting: 'Meetings',
    createdDate: 'Created Date'
  };

  const filteredSelect = (
    <select name='filter' onChange={(e) => {changeFilter(e.currentTarget.value as Filter)}}>
      {Object.keys(filterOptions).map((key) => {
        return <option key={key} value={key}>{filterOptions[key as keyof typeof filterOptions]}</option>
      })}
    </select>
  )

  const SortBySelect = (
    <select name='sortby' onChange={(e) => {changeSortBy(e.currentTarget.value as SortBy)}}>
      {Object.keys(sortByOptions).map((key) => {
        return <option key={key} value={key}>{sortByOptions[key as keyof typeof sortByOptions]}</option>
      })}
    </select>
  )

  return (
    <section className='mb-2'>
      <h2 className='text-xl font-bold text-left mb-2'>Filters</h2>
      {filteredSelect}
      {SortBySelect}
    </section>
  )
}