import React from 'react';
import './AppMain.css';
import Sidebar from './Components/Sidebar' // Importing sidebar
import Subject from './Components/Subject'; // Importing subject

function AppMain() {
  return (
    <div className="AppMain">
      <Sidebar />
      <Subject />
    </div>
  );
}

export default AppMain;
