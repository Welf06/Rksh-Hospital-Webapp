import React from 'react'

import Patients from './Patients'
import Completed from './Completed'
import Doctors from './Doctor'
import Tests from './Tests'
import Treatments from './Treatments'

function Page({page, modal, setModal}) {
  return (
   <>
    {page === "patients" && <Patients/>}
    {page === "completed" && <Completed/>}
    {modal === "doctors" && <Doctors setModal={setModal}/>}
    {modal === "tests" && <Tests setModal={setModal}/>}
    {modal === "treatments" && <Treatments setModal={setModal}/>}
    </>
  );
}

export default Page