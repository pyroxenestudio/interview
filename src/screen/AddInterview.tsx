import { useSelector } from "react-redux";
import { selectJobById, useAddInterviewMutation } from "../api/generalApi";
// import { selectCompanies } from "../store/slices/companySlice";
import { useParams } from "react-router";

export default function AddInterview() {
  // params
  const {jobOfferId} = useParams();
  // Selectors
  const jobOffer = useSelector(selectJobById(jobOfferId));
  // Api
  const [addNewInterview, results] = useAddInterviewMutation()

  function addNewOfferActionForm(formData) {
    if (!jobOfferId) throw new Error("JobOffer ID not found");
    if (!jobOffer) throw new Error('JobOffer not found')
    addNewInterview({
      meetingLink: formData.get('meetingLink'),
      meetingDate: formData.get('meetingDate'),
      location: formData.get('location'),
      createdDate: new Date(),
      canceled: false,
      company: jobOffer.job.company, // The unique key
      jobOffer: parseInt(jobOfferId)
    })
  }

  console.log('resultado', results);
  console.log('jobOffer', jobOffer);

  return (
    <>
      <h2>Add New Interview</h2>
      <form action={addNewOfferActionForm}>
        <label htmlFor="meetingLink">
          Meeting Link
          <input name='meetingLink' type='url'></input>
        </label>
        <label htmlFor="meetingDate">
          Meeting Date
          <input name='meetingDate' type='date'></input>
        </label>
        <label htmlFor="location">
          Location
          <input name='location' type="text"></input>
        </label>
        <button type='submit'>Add new Interview</button>
      </form>
    </>
  )
}