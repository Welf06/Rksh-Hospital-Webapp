import { useState, createContext, useEffect } from 'react';


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
      <DetailContext.Provider value={{ detail, setDetail }}>
        <Navbar />
        <Sidebar setPage={setPage} setModal={setModal} />
        <Page page={page} modal={modal} setModal={setModal} />
      </DetailContext.Provider>
    </div>
  );
}

