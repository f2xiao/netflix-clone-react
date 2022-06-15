import React, {useState,useEffect, createContext} from 'react';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/layout/Nav'; 
import Row from './components/Row';
import requests from './Request';
import axios from './axios';

const GenresContext = createContext();
function App() {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTVGenres] = useState([]);
  useEffect(() => { 
    const fetchGenres = async () => {
      const requestMovie = await axios.get(requests.fetchMovieGenres);
      const requestTV = await axios.get(requests.fetchTVGenres);
      setMovieGenres(requestMovie.data.genres);
      setTVGenres(requestTV.data.genres);
      // console.log(requestMovie.data);
      // console.log(requestTV.data);
    }

    fetchGenres();
   }, [])

    return (
    <GenresContext.Provider value={[...tvGenres, ...movieGenres]} className="App">
      <Nav />
      <Banner />
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending" fetchUrl={requests.fetchTrending}  />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}  />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}  />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}  />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}  />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}  />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}  />
    </GenresContext.Provider>
  );
}
export { GenresContext}
export default App;