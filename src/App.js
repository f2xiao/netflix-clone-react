import React, {useState,useEffect, createContext} from 'react';
import './App.css';
import Banner from './components/Banner';
import Nav from './components/layout/Nav'; 
import Row from './components/Row';
import requests from './Request';
import axios from './axios';
import styled from 'styled-components';

const GenresContext = createContext();
function App() {
  const [genresList, setGenresList] = useState([]);
  const [movie, setMovie] = useState({});
  // const [styleObj, setStyleObj] = useState({});
  const handleMouseEnter = (e, movie) => {
    let genres = '';
    movie.genre_ids?.forEach(id => {
      const found = genresList.find((genre) => genre.id === id);
      genres += `${found.name} `;
    });
    let imgScr = e.target.src;
    
    let { top, left, width, right } = e.target.getBoundingClientRect();
    // console.log(top, left);
    // console.log(e.target.getBoundingClientRect());
    console.log(right, window.innerWidth, width);
    if (right > window.innerWidth) {
      left -= width;
    }
    top = top - 24;
    let opacity = 1;
    setMovie({ ...movie, genres, imgScr, top , left, opacity })
  }

  const handleMouseLeave = () => {
    let opacity = 0;
    setMovie((preMovie) => ({...preMovie, opacity }));
  }
  useEffect(() => { 
    const fetchGenres = async () => {
      const requestMovie = await axios.get(requests.fetchMovieGenres);
      const requestTV = await axios.get(requests.fetchTVGenres);
      setGenresList(requestMovie.data.genres);
      setGenresList(prevList => [...prevList, ...requestTV.data.genres]);
    }

    fetchGenres();
   }, [])

    return (
    <GenresContext.Provider value={genresList} className="App">
      <Nav />
        <Banner />
        <Modal
          style={{ top: movie.top, left: movie.left, opacity: movie.opacity }}
        >
          <div>
            <img alt={movie?.name || movie?.original_title} src={movie?.imgScr} />
            <h6>
              {movie?.name || movie?.original_title }
            </h6>
            <p>
            {movie.genres}
            </p>
          </div>
        </Modal>
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Netflix Originals"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Trending"
          fetchUrl={requests.fetchTrending} />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Top Rated"
          fetchUrl={requests.fetchTopRated} />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies} />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies} />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies} />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies} />
        <Row
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries} />
    </GenresContext.Provider>
  );
}
export { GenresContext}
export default App;

const Modal = styled.div`
  opacity: 0;
 position: fixed;
 z-index:1;
 /* transition: all 0.5s ease-in-out; */
 >div>img{
      display: block;
      cursor: pointer;
      max-height:150px;
      object-fit:contain;
      margin-right:10px;
      border-radius:4px;
 }
`