import React from 'react'
import { useEffect } from 'react';
import { messaging } from '../firebase';
import { getToken, onMessage, onBackgroundMessage } from 'firebase/messaging';

import Patients from './Patients'
import Completed from './Completed'
import Doctors from './Doctor'
import Tests from './Tests'
import Treatments from './Treatments'

function Page({page, modal, setModal}) {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted'){
      // Generating token for the instance
      console.log("getting the token")
      const token = await getToken(messaging, 
        {validKey : "BEGnFm9aWNi4pW8_jlhusRsKF7PvglvtDwL4EpHYNkGk7fb6BhQVYXwxtKmJJ3o4RjITToCQY0iRODWjw-pnxQg"});
        console.log(token)
      // Sending the token to the Backend
    }
    else if (permission === 'denied') {
      console.log("you denied notification permission")
    }
    
  }

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
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