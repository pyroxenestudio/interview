import { BrowserRouter, Route, Routes } from "react-router"
import AddOrEditInterview from "./screen/AddOrEditInterview"
import AddOrEditJobOffer from "./screen/AddOrEditJobOffer"
import Home from "./screen/home"
import Interviews from "./screen/Interviews";
import Job from "./screen/Job";
import Layout from "./screen/layout"
import { useGetAllQuery } from "./api/generalApi"
import { AddOrEditContact } from "./screen/AddOrEditContact";

function App() {
  const {isSuccess, isLoading} = useGetAllQuery();

  return (
    <>
    {!isSuccess && !isLoading && <>Show Error telling the data couldn't be loaded</>}
    {isSuccess && <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/add/:jobOfferId" element={<AddOrEditInterview />} />
            <Route path="/interviews/edit/:idInterview" element={<AddOrEditInterview />} />
            <Route path="/job/:id" element={<Job />} />
            <Route path="/job/add" element={<AddOrEditJobOffer />} />
            <Route path="/job/edit/:id" element={<AddOrEditJobOffer />} />
            {/* <Route path="/contacts" element={<Contacts />} /> */}
            <Route path="/contacts/add" element={<AddOrEditContact />} />
            <Route path="/contacts/edit/:id" element={<AddOrEditContact />} />
          </Route>
        </Routes>
      </BrowserRouter>}
    </>
  )
}

export default App
