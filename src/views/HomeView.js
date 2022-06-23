import React, {useState,useEffect} from 'react';
import '.././App.css';
import Banner from '.././components/Banner';
import Nav from '.././components/layout/Nav'; 
import Row from '.././components/Row';
import requests from './../Request';
import axios from '.././axios';
import Preview from '../components/Preview';

const api_key = process.env.REACT_APP_API_KEY;

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

  const fetchVideoInfo = async (id, type) => {
    const url = `${type}/${id}/videos?api_key=${api_key}&language=en-US`;
    let response;
    try {
      response = await axios.get(url, {validateStatus: (status) => status === 200});
      if (response.data.results.length === 0) {
        return null;
      }
    } catch (error) {
      return null;
    } 
    return response;
  }
  
  const showPreview = async (e, movie) => {
    // preview info: movie genres
    let genres = '';
    movie.genre_ids?.forEach(id => {
      const found = genresList.find((genre) => genre.id === id);
      genres += `${found.name} `;
    });
    
    // fetch video info
    let videoInfo1 = await fetchVideoInfo(movie.id, "movie");
    let videoInfo2 = await fetchVideoInfo(movie.id, "tv");
    let videoInfo = videoInfo1 ? videoInfo1 : videoInfo2;
    let video;
    if (videoInfo?.data) {
      video = videoInfo?.data.results.find(ele => ele.type === "Trailer" || ele.type === "Teaser");
      if (!video) {
        video = videoInfo?.data.results[0]
      }
    }
    // console.log(video)
    
    // console.log(videoInfo?.data?.results, movie.id);
    
    // console.log(foundVideo);
    // prview header img url
    let imgSrc = e.target.src;
    
    // preview locations
    let { top, left, width, height, right,bottom } = e.target.getBoundingClientRect();
    // console.log(e.target.getBoundingClientRect());
    
    // console.log(right, window.innerWidth, width, height);
    
    if (right > window.innerWidth) {
      left -= width;
    }
    if (bottom > window.innerHeight) {
      top -= height + 56;
    }
   
    left -= 1 / 4 * width;
    top = top - 56 + window.scrollY;
    
    let containerStyle = { top, left, "width": width * 1.5, "height": height + 56, opacity:1};
    
    setPreview({ movie, genres, imgSrc,video, containerStyle })
    // console.log(preview)
  }
  const hidePreview = (e) => {
    let containerStyle = { opacity: 0, position: "absolute", fontSize: '0.8em' };
    setPreview({containerStyle})
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
    <div style={{paddingBottom:'4em'}}>
      {/* <Nav /> */}
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

