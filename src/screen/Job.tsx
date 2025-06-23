import { NavLink, useParams } from "react-router";
import { selectJobById, useGetAllQuery } from "../api/generalApi";
import { useSelector } from "react-redux";
import { selectCompanies } from "../store/slices/companySlice";

export default function Job() {
  const {id} = useParams();
  const {isError, isSuccess} = useGetAllQuery();
  
  // Selectors
  const found = useSelector(selectJobById(id));
  const companies = useSelector(selectCompanies);

  console.log('found:', found);

  return (
    <>
      {!found && isSuccess && <>LOADING</>}
      {!found && isError && <>Can not load the job</>}
      {found && companies &&
        <>
          <NavLink to={`/interviews/add/${id}`}>Add new interview for this job</NavLink>
          <NavLink to={`/job/edit/${id}`}>EDIT job</NavLink>
          <h2>{found.job.position}</h2>
          <p>{companies[found.job.company]?.description}</p>
          <h2>Contacts</h2>
          <h2>Interviews</h2>
        </>
      }
    </>
  )
}