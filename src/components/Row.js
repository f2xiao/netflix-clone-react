import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import axios from '.././axios'
import { GenresContext } from '../App';


function Row({ title, fetchUrl, isLargeRow = false, handleMouseEnter, handleMouseLeave }) {
  const [movies, setMovies] = useState([]);
  const genresList = useContext(GenresContext);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const postersContainer = useRef(null);
  const postersElement = postersContainer.current;
  const parentContainer = useRef(null);
  // console.log(rowContentContainer);
  const imgContainer = useRef();
  const imgEle = imgContainer.current;
  const imgbase_url = `https://image.tmdb.org/t/p/original`;
  // console.log(imgContainer.current.src);
  // console.log(postersElement.children);
  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);
    }
    fetchMovies();
    // setTop(parentContainer.current.offsetTop)
    
  }, [fetchUrl]);

  const slide = (button) => {
    
    let distanceX;
    if (button === 'next') {
      distanceX =postersElement.scrollLeft +  postersElement.offsetWidth
    }
    if (button === 'prev') {
      distanceX =postersElement.scrollLeft -  postersElement.offsetWidth
    }

    postersContainer.current.scroll({
      left: distanceX,
      behavior:'smooth'
    })
  }
  const handleShowButton = () => {
    const start = window.innerWidth;
    const end = postersElement.scrollWidth;
    const range = end - start;
    const distance = postersElement.scrollLeft;
    // console.log(`start is ${start}, range is ${range}, end is ${end}`);
    // console.log(`scrollLeft is ${distance}`);
    if ( distance < range) { 
      setShowNext(true);
    }
    if (distance !== 0) {
      setShowPrev(true);
    }
  
  }
  const handleClickPrev = () => {
    if (postersElement.scrollLeft < postersElement.offsetWidth) {
      setShowPrev(false);
    }
    setShowNext(true);
    slide('prev');
  }
  const handleClickNext = () => {
    if (postersElement.scrollLeft > postersElement.scrollWidth - window.innerWidth - postersElement.offsetWidth ) {
      setShowNext(false);
    }
    setShowPrev(true);
    slide('next')
  }

  return (
    <RowContainer
      onMouseEnter={() => { handleShowButton() }}
      onMouseLeave={() => { setShowNext(false); setShowPrev(false) }}
      >
      <h2>{title}</h2>
      <Posters
        ref={postersContainer}
      >
        {movies.map(movie =>
        (
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            
              <img
                ref={imgContainer}
              className={isLargeRow ? 'large' : undefined}
              key={movie?.poster_path || movie?.backdrop_path}
                alt={movie.name}
                src={`${imgbase_url}${isLargeRow ? (movie?.poster_path) : (movie?.backdrop_path)}`}
              // onMouseEnter={(e) => { handleMouseEnter(e, movie) }}
              onMouseOver={(e) => { handleMouseEnter(e, movie) }}
              // onMouseLeave={()=>{handleMouseLeave()}}
              />
           
          )
          )
        )}
      </Posters>
        <button
          className={isLargeRow ? `large prev ${showPrev && 'black'}` : `prev ${showPrev && 'black'}`}
          onClick={handleClickPrev}>&#10094;</button>
        <button
          className={isLargeRow ? `large next ${showNext && 'black'}` : `next ${showNext && 'black'}`} 
          onClick={handleClickNext}>&#10095;</button>
    </RowContainer>
   
  )
}

export default Row

const RowContainer = styled.div`
position: relative;

>h2{
  padding:0.5em;
  padding-left: 2.7em;
}
>button{
  position: absolute;
  top: 56px;
  opacity: 0;
  font-size:2em;
  z-index:99;
  &.black{
    opacity: 0.7;
  }

  text-align: center;

  height: 100px;
  width: 60px;
  border:none;
  border-radius:4px;
  &.large{
    height: 250px;
  }

  cursor: pointer;

  &.prev{
    left:0;
  }

  &.next{
    right:0;
  }
}

`
const Posters = styled.div`
  /* position: relative; */
  display:flex;
  flex-direction: row;
  overflow-y: auto;
  overflow-x: scroll;
  &::-webkit-scrollbar {
  display:none
}

padding-left: var(--padding-left);
>img{
      display: block;
      cursor: pointer;
      max-height:100px;
      object-fit:contain;
      margin-right:10px;
      border-radius:4px;
      &.large{
        max-height:250px;
      }
    }
  
`
