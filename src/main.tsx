import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './screen/home.tsx';
import Layout from './screen/layout.tsx';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import 'pyx/pyx.css';
import Job from './screen/job.tsx';
import Interviews from './screen/interviews.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/job/:id" element={<Job />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
