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
  const [addNewOffer,] = useAddJobOfferMutation();
  const [editNewOffer,] = useUpdateJobOfferMutation();

  function addNewOfferActionForm(formData: FormData) {
    if (jobOffer) {
      editNewOffer({
        id: jobOffer.job.id,
        company: formData.get('company') as string,
        position: formData.get('position') as string,
        note: formData.get('note') as string,
        canceled: false,
        createdDate: jobOffer.job.createdDate
      });
    } else {
      addNewOffer({
        company: formData.get('company') as string,
        position: formData.get('position') as string,
        note: formData.get('note') as string,
        canceled: false,
        createdDate: new Date()
      })
    }
  }

  const keys = Object.keys(companies);
  // Use key as ForeignKey
  const companyOptions = Object.values(companies).map((company, index) => {
    return <option key={keys[index]} value={keys[index]}>{company.name}</option>
  });

  return (
    <>
      <h2>Offer Form</h2>
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