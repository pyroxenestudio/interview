import { useSelector } from "react-redux";
import { selectInterviewById, selectJobById, useAddInterviewMutation, useUpdateInterviewMutation } from "../api/generalApi";
// import { selectCompanies } from "../store/slices/companySlice";
import { useParams } from "react-router";

export default function AddOrEditInterview() {
  // params
  const {jobOfferId, idInterview} = useParams();
  // Selectors
  const jobOffer = useSelector(selectJobById(jobOfferId));
  const interview = useSelector(selectInterviewById(idInterview));
  // Api
  const [addNewInterview,] = useAddInterviewMutation();
  const [updateInterview,] = useUpdateInterviewMutation();

  function addNewOfferActionForm(formData: FormData) {
    if (!interview) {
      if (!jobOfferId) throw new Error("JobOffer ID not found");
      if (!jobOffer) throw new Error('JobOffer not found');
      addNewInterview({
        meetingLink: formData.get('meetingLink') as string,
        meetingDate: formData.get('meetingDate'),
        location: formData.get('location') as string,
        createdDate: new Date(),
        canceled: false,
        company: jobOffer.job.company, // The unique key
        jobOffer: parseInt(jobOfferId)
      });
    } else {
      updateInterview({
        meetingLink: formData.get('meetingLink') as string,
        meetingDate: formData.get('meetingDate'),
        location: formData.get('location') as string,
        createdDate: new Date(),
        canceled: false,
        company: interview.company, // The unique key
        jobOffer: interview.jobOffer, // The unique key
        id: interview.id
      })
    }
  }

  console.log('jobOffer', jobOffer);

  return (
    <>
      <h2>Add New Interview</h2>
      <form action={addNewOfferActionForm}>
        <label htmlFor="meetingLink">
          Meeting Link
          <input name='meetingLink' type='url' defaultValue={interview ? interview.meetingLink : undefined}></input>
        </label>
        <label htmlFor="meetingDate">
          Meeting Date
          <input name='meetingDate' type='date' defaultValue={interview ? interview.meetingDate?.toString() : undefined}></input>
        </label>
        <label htmlFor="location">
          Location
          <input name='location' type="text" defaultValue={interview ? interview.location : undefined}></input>
        </label>
        <button type='submit'>{interview ? 'Edit Interview' : 'New Interview'}</button>
      </form>
    </>
  )
}