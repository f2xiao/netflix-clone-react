import React, {useState,useEffect} from 'react';
import '.././App.css';
import Banner from '.././components/Banner';
import Nav from '.././components/layout/Nav'; 
import Row from '.././components/Row';
import requests from './../Request';
import axios from '.././axios';
import Preview from '../components/Preview';

function HomeView() {
  const [genresList, setGenresList] = useState([]);
  const [preview, setPreview] = useState({});
  const fetchRows = [
  {
    title: "Netflix Originals",
    url: requests.fetchNetflixOriginals
    },
    {
      title: "Trending",
      url: requests.fetchTrending
    },
    {
      title: "Top Rated",
      url: requests.fetchTopRated
    },
    {
      title: "Action Movies",
      url: requests.fetchActionMovies
    },
    {
      title: "Comedy Movies",
      url: requests.fetchComedyMovies
    },
    {
      title: "Horror Movies",
      url: requests.fetchHorrorMovies
    },
    {
      title: "Romance Movies",
      url: requests.fetchRomanceMovies
    },
    {
      title: "Documentaries",
      url: requests.fetchDocumentaries
    },
  ];
  
  const showPreview = (e, movie) => {
    // preview info: movie genres
    let genres = '';
    movie.genre_ids?.forEach(id => {
      const found = genresList.find((genre) => genre.id === id);
      genres += `${found.name} `;
    });
    // prview header img url
    let imgSrc = e.target.src;
    
    // preview locations
    let { top, left, width, height, right } = e.target.getBoundingClientRect();
    console.log(e.target.getBoundingClientRect());
    
    console.log(right, window.innerWidth, width, height);
    let size = { "width": width * 1.5, "height": height + 56 };
    if (right > window.innerWidth) {
      left -= width;
    }
    left -= 1 / 4 * width;
    top = top - 56 +  window.scrollY;
    let position = { top, left };
    let opacity = 1;
    setPreview({ movie, genres, imgSrc, size, position, opacity })
    console.log(preview)
  }

  const hidePreview = (e) => {
    setPreview({opacity:0})
  }

  useEffect(() => { 
    const fetchGenres = async () => {
      const requestMovieGenres = await axios.get(requests.fetchMovieGenres);
      const requestTVGenres = await axios.get(requests.fetchTVGenres);
      setGenresList(requestMovieGenres.data.genres);
      setGenresList(prevList => [...prevList, ...requestTVGenres.data.genres]);
    }
    fetchGenres();
   }, [])

    return (
    <div>
      <Nav />
        <Banner />
        {fetchRows.map(row => {
          return (
              <Row key={row.title} title={row.title} fetchUrl={row.url}
              handleMouseOver={showPreview}
              />
            )
          })
        }
        <Preview handleMouseLeave={hidePreview} preview={preview} />
    </div>
  );
}

export default HomeView;

