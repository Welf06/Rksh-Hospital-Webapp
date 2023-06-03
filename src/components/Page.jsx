import React from 'react'

import Patients from './Patients'
import Completed from './Completed'
import Doctors from './Doctor'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page({page, modal, setModal}) {
  return (
   <>
    {page === "patients" && <Patients/>}
    {page === "completed" && <Completed/>}
    {modal === "doctors" && <Doctors setModal={setModal}/>}
    </>
  );
}

export default Page