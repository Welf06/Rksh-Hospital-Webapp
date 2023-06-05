import { useState } from 'react';

import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
import Page from './components/Page'

import './styles/App.css'

export default function App() {
  const [page, setPage] = useState('patients');
  const [modal, setModal] = useState('');
  return (
    <div className="App">
      <Navbar />
      <Sidebar setPage={setPage} setModal={setModal}/>
      <Page page={page} modal={modal} setModal={setModal}/>
      </div>
  );
}

