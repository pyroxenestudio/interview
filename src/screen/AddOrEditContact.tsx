import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectContactById } from "../api/generalApi";
import { selectCompanies } from "../store/slices/companySlice";

// interface AddOrEditContact {}

export function AddOrEditContact() {
  // Params
  const {id} = useParams();

  // Selectors
  const contact = useSelector(selectContactById(id));
  const companies = useSelector(selectCompanies);

  function addNewContactActionForm(formData: FormData) {
    console.log(formData);
  }

  const keys = Object.keys(companies);
  // Use key as ForeignKey
  const companyOptions = Object.values(companies).map((company, index) => {
    return <option key={keys[index]} value={keys[index]}>{company.name}</option>
  });
  
  return (
    <>
      <h2>Contact Form</h2>
      <form action={addNewContactActionForm}>
        <label htmlFor="name">
          Name
          <input name='name' type="text" required defaultValue={contact ? contact.name : undefined}></input>
        </label>
        <label htmlFor="company">
          Company
          <select name='company' required defaultValue={contact ? contact.company : undefined}>
            {companyOptions}
          </select>
        </label>
        <label htmlFor="phone">
          Phone
          <input name='phone' type="tel" required defaultValue={contact ? contact.phone : undefined}></input>
        </label>
        <label htmlFor="email">
          Email
          <input name='email' type="email" required defaultValue={contact ? contact.email : undefined}></input>
        </label>
        <button type='submit'>{contact ? 'Edit Contact' : 'Add new Contact'}</button>
      </form>
    </>
  )
}