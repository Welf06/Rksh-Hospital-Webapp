import { useState, createContext, useEffect, useContext } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login/Login';
import Sidebar from './components/common/sidebar';
import Navbar from './components/common/navbar';
import Page from './components/Page'

import './styles/App.css'


export const DetailContext = createContext();
// Testing Details:
// const detail = {
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
  const [page, setPage] = useState('trips');
  const [modal, setModal] = useState('');
  const [login, setLogin] = useState('');
  const [loginDetails, setLoginDetails] = useState({});

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      setLoginDetails({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password')
      });
      setLogin('true');
    }
    else {
      setLogin('false');
    }
  }, []);

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
      {login === '' && <div className="loader"></div>}
      {login === 'false'&& <Login setLogin={setLogin} />}
      {login === 'true' && (

        <DetailContext.Provider value={{ detail, setDetail }}>
          <Navbar setPage={setPage} />
          <Sidebar setPage={setPage} setModal={setModal} />
          <Page page={page} modal={modal} setModal={setModal} setPage={setPage}/>
        </DetailContext.Provider>
      )}
      </LoginDetailsContext.Provider>
    </div>
  );
}

