import { NavLink, useParams } from "react-router";
import { selectJobById, useGetAllQuery } from "../api/generalApi";
import { useSelector } from "react-redux";
import { selectCompanies } from "../store/slices/companySlice";
import { PyxButton } from 'pyx';

export default function Job() {
  const {id} = useParams();
  const {isError, isSuccess} = useGetAllQuery();
  
  // Selectors
  const found = useSelector(selectJobById(id));
  const companies = useSelector(selectCompanies);

  console.log('found:', found);
  let interviewList = null;
  if (found) {
    interviewList = found.interviews.map((interview) => {
      console.log(interview);
      return (<a className='block mb-1' href={interview.meetingLink ?? interview.location}>{`${interview.meetingDate?.toString()}`}</a>)
    });
    interviewList.push(<PyxButton variant='info'><NavLink to={'#'}>Add Interview</NavLink></PyxButton>)
  }

  return (
    <>
      {!found && isSuccess && <>LOADING</>}
      {!found && isError && <>Can not load the job</>}
      {found && companies &&
        <div>
          <nav className='flex'>
            <PyxButton variant="success"><NavLink to={`/job/edit/${id}`}>EDIT job</NavLink></PyxButton>
          </nav>
          <section>
            <h2 className='text-2xl font-medium'>{found.job.position}</h2>
          </section>
          <section className='mb-5'>
            <h2 className='text-2xl font-medium'>{companies[found.job.company]?.name}</h2>
            <p>{companies[found.job.company]?.description}</p>
          </section>
          <section className='mb-3'>
            <h2 className='text-xl mb-2'>Contacts</h2>
            {found.contacts.length ? "blabla" : <PyxButton variant="info"><NavLink to="#">Add Contact</NavLink></PyxButton>}
          </section>
          <section className=''>
            <h2 className='text-xl mb-2'>Interviews</h2>
            {interviewList}
          </section>
        </div>
      }
    </>
  )
}