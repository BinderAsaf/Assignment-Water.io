import React from 'react';
import './App.css';
import  SideBar  from './components/SideBar';
import  MultiplicationTable  from './components/MultiplicationTable';
import MenuStore from './stores/MenuStore';
function App() {
  return (
    <div className="App">
      <div className="sidenav">
         <SideBar store={MenuStore}/> 
      </div>
      <div className="main">
        <MultiplicationTable store={MenuStore}/>
      </div>
    </div>
  );
}

export default App;
