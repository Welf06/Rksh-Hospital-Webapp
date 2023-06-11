import { useState, createContext, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Page from './components/Page'

import './styles/App.css'


export const DetailContext = createContext();

export default function App() {
  const [detail, setDetail] = useState('');
  const [page, setPage] = useState('patients');
  const [modal, setModal] = useState('');


  return (
    <div className="App">
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
        <Navbar />
        <Sidebar setPage={setPage} setModal={setModal} />
        <Page page={page} modal={modal} setModal={setModal} />
      </DetailContext.Provider>
    </div>
  );
}

