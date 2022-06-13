import React from 'react';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/layout/Nav'; 
import Row from './components/Row';
import requests from './Request';

function App() {
    return (
    <div className="App">
      <Nav />
      <Banner />
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending" fetchUrl={requests.fetchTrending}  />
      <Row title="TopRated" fetchUrl={requests.fetchTopRated}  />
      <Row title="ActionMovies" fetchUrl={requests.fetchActionMovies}  />
      <Row title="ComedyMovies" fetchUrl={requests.fetchComedyMovies}  />
      <Row title="HorrorMovies" fetchUrl={requests.fetchHorrorMovies}  />
      <Row title="RomanceMovies" fetchUrl={requests.fetchRomanceMovies}  />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}  />
      
    </div>
  );
}

export default App;