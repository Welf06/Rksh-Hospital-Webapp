import logo from './assets/logo.svg';
// import './styles/App.css';
import { Button } from "@material-tailwind/react";

import Sidebar from './components/sidebar';
import Navbar from './components/navbar';
 
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar/>
      </div>
  );
}

