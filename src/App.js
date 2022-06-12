import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/layout/Nav'; 
import Row from './components/Row';

function App() {
    return (
    <div className="App">
      <Nav />
      <Banner />
      <Row />
    </div>
  );
}

export default App;