import React from 'react';
// import logo from './logo.svg';
import '../src/reset.css';
import './App.css';


import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import MainContainer from './Components/MainContainer/MainContainer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <MainContainer />
    </div>
  );
}

export default App;
