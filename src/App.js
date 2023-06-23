import { useState, createContext, useEffect, useContext } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login/Login';
import Sidebar from './components/common/sidebar';
import Navbar from './components/common/navbar';
import Page from './components/Page'


import { getToken } from "firebase/messaging";
import { toast } from "react-toastify";
import { messaging } from "./firebase";

import axios from "axios";

import './styles/App.css'


export const DetailContext = createContext();
// Testing Details:
//   email: info@cityhospital.com
//   password: mypassword123

export const LoginDetailsContext = createContext();

export const toastOptions = {
	position: "top-center",
	autoClose: 1000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};

export default function App() {
  const [detail, setDetail] = useState('');
  const [page, setPage] = useState('');
  const [modal, setModal] = useState('');
  const [loginDetails, setLoginDetails] = useState({});

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      setLoginDetails({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        name: localStorage.getItem('name'),
        hospitalAddress: localStorage.getItem('hospitalAddress'),
      });
      localStorage.getItem('page') && setPage(localStorage.getItem('page'));
    }
    else {
      setPage('login');
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem('page', page);
  }, [page]);

  useEffect(() => {
    if (loginDetails.email && loginDetails.password) 
    requestNotificationPermission();
  }, [loginDetails]);


  async function requestNotificationPermission() {
		const permission = await Notification.requestPermission();
		if (permission === "granted") {
			// Generating token for the instance
			console.log("getting the token");
			const token = await getToken(messaging, {
				validKey:
					"BEGnFm9aWNi4pW8_jlhusRsKF7PvglvtDwL4EpHYNkGk7fb6BhQVYXwxtKmJJ3o4RjITToCQY0iRODWjw-pnxQg",
			});
			console.log(token);
			// Sending the token to the Backend

			const url = `${process.env.REACT_APP_AWS_BACKEND_URL}/hospital/createGCMDevice/`;
			const data = {
				hospital: {
					email: loginDetails.email,
					password: loginDetails.password,
				},
        registration_id: token,
        update_device: true
			};
			const headers = { "Content-Type": "application/json" };

      axios.post(url, JSON.stringify(data), { headers })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
			 if (error.response)
          toast.error(error.response.data.detail, toastOptions);
			 else
			 toast.error(error.message, toastOptions)
        });

		} else if (permission === "denied") {
			console.log("you denied notification permission");
      toast.error("You denied notification permission.", toastOptions);
		}
	}

  return (
    <div className="App">
    <LoginDetailsContext.Provider value={{ loginDetails, setLoginDetails }}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <DetailContext.Provider value={{ detail, setDetail }}>
          <Page page={page} modal={modal} setModal={setModal} setPage={setPage}/>
        </DetailContext.Provider>
      </LoginDetailsContext.Provider>
    </div>
  );
}

