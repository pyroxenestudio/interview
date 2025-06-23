import { BrowserRouter, Route, Routes } from "react-router"
import AddInterview from "./screen/AddInterview"
import AddOrEditJobOffer from "./screen/AddOrEditJobOffer"
import Home from "./screen/home"
import Interviews from "./screen/interviews"
import Job from "./screen/job"
import Layout from "./screen/layout"
import { useGetAllQuery } from "./api/generalApi"

function App() {
  const {isSuccess} = useGetAllQuery();

  return (
    <>
    {!isSuccess && <>Show Error telling the data couldn't be loaded</>}
    {isSuccess && <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/add/:jobOfferId" element={<AddInterview />} />
            <Route path="/job/:id" element={<Job />} />
            <Route path="/job/add" element={<AddOrEditJobOffer />} />
            <Route path="/job/edit/:id" element={<AddOrEditJobOffer />} />
          </Route>
        </Routes>
      </BrowserRouter>}
    </>
  )
}

export default App
