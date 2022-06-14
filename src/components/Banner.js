import axios from '.././axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import requests from '../Request';


function Banner() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovie = async () => {
      const request = await axios.get(requests.fetchTopRated);
      // console.log(request.data.results.length - 1);
      const randomNum = Math.floor(Math.random() * (request.data.results.length));
      // console.log(randomNum);
      // console.log(request.data.results[randomNum]);
      setMovie(request.data.results[randomNum]);
    }
    fetchMovie();
   }, [])


  return (
    <BannerContainer style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path})`}}>
      <BannerContents>
        <h1>{movie.title}</h1>
        <p>{ movie.overview}</p>
      <div>
        <button>Play</button>
        <button>More info</button>
      </div>
      </BannerContents>
    </BannerContainer>
  )
}

export default Banner



const BannerContainer = styled.div`
  position:relative;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 448px;
  /* padding-bottom: 4em; */
  object-fit: contain;
`

const BannerContents = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: var(--padding-left);
  padding-top: 140px;
  >h1{
    font-size:3em;
    font-weight:800;
    padding-bottom: 0.3em;
  }
  >p{
    width: 45em;
    max-width: 360px;
    height: 80px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
    line-height: 1.3em;
    max-height: 4em;
    margin: 1em 0;
  }
  
  >div{
    padding-top: 0.9em;
    > button{
    padding: .75em 2em;
    margin-right: 1em;
    border-radius: 4px;
    border:0;
    &:hover{
      background-color: rgba(255,255,255,0.75);
    }
  }
  }
`