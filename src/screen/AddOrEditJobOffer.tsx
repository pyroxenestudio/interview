import { useSelector } from "react-redux";
import { selectCompanies } from "../store/slices/companySlice";
import { selectJobById, useAddJobOfferMutation, useUpdateJobOfferMutation } from "../api/generalApi";
import { useParams } from "react-router";

export default function AddOrEditJobOffer() {
  // Params
  const {id} = useParams();
  // Selectors
  const companies = useSelector(selectCompanies);
  const jobOffer = useSelector(selectJobById(id));
  // Api
  const [addNewOffer, resultsAdd] = useAddJobOfferMutation();
  const [editNewOffer, resultsUpdate] = useUpdateJobOfferMutation();

  function addNewOfferActionForm(formData) {
    if (jobOffer) {
      editNewOffer({
        id: jobOffer.job.id,
        company: formData.get('company'),
        position: formData.get('position'),
        note: formData.get('note'),
        canceled: false,
        createdDate: jobOffer.job.createdDate
      });
    } else {
      addNewOffer({
        company: formData.get('company'),
        position: formData.get('position'),
        note: formData.get('note'),
        canceled: false,
        createdDate: new Date()
      })
    }
  }

  const companyOptions = Object.values(companies).map((values) => {
    return <option key={values.name}>{values.name}</option>
  });

  console.log('resultado Add', resultsAdd);
  console.log('resultado Update', resultsUpdate);

  return (
    <>
      <h2>Add New Offer</h2>
      <form action={addNewOfferActionForm}>
        <label htmlFor="position">
          Position
          <input name='position' type="text" required defaultValue={jobOffer ? jobOffer.job.position : undefined}></input>
        </label>
        <label htmlFor="company">
          Company
          <select name='company' required defaultValue={jobOffer ? jobOffer.job.company : undefined}>
            {companyOptions}
          </select>
        </label>
        <label htmlFor="note">
          Note
          <textarea name='note' defaultValue={jobOffer ? jobOffer.job.note : undefined}></textarea>
        </label>
        <button type='submit'>{jobOffer ? 'Edit Job Offer' : 'Add new Offer Job'}</button>
      </form>
    </>
  )
}