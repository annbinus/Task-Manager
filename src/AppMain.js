import React from 'react';
import './AppMain.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to my website!</h1>
        <p>This is some sample text.</p>
      </div>
    </div>
  );
}

export default App;
