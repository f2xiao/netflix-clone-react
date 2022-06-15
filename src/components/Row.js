import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import axios from '.././axios'
import RowContent from './RowContent';


function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const postersContainer = useRef();
  const postersElement = postersContainer.current;
  const prevButton = useRef();
  const imgElement = useRef();
  const imgbase_url = `https://image.tmdb.org/t/p/original/`;

  
  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);
       
    }
    fetchMovies();
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
    const start = window.innerWidth + postersElement.offsetWidth;
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
    if (postersElement.scrollLeft > postersElement.scrollWidth - window.innerWidth - postersElement.offsetWidth * 2 ) {
      setShowNext(false);
    }
    setShowPrev(true);
    slide('next')
  }
  return (
    <RowContainer>
      <h2>{title}</h2>
      <Posters
        ref={postersContainer}
        onMouseEnter={() => { handleShowButton() }}
        onMouseLeave={() => { setShowNext(false); setShowPrev(false) }}>
        {movies.map(movie =>
        (
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <div  key={movie.id}>
              <img
              ref={imgElement}
              className={isLargeRow ? 'large' : undefined}
              alt={movie.title}
              src={`${imgbase_url}${isLargeRow ? (movie?.poster_path) : (movie?.backdrop_path)}`} 
              />
              <RowContent rating={movie.vote_average} genreIDs={movie.genre_ids} />
            </div>
          )
          )
        )}
        <button
          ref={prevButton}
          className={showPrev && (isLargeRow ? 'large prev black' : 'prev black')}
          onClick={handleClickPrev}>&#10094;</button>
        <button
          className={showNext && (isLargeRow ? 'large next black' : 'next black')} 
          onClick={handleClickNext}>&#10095;</button>
      </Posters>
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

`
const Posters = styled.div`
  display:flex;
  flex-direction: row;
  overflow-y: hidden;
  overflow-x: scroll;
  /* padding: 0 1.5em; */
  &::-webkit-scrollbar {
  display:none
}

padding-left: var(--padding-left);
  >div>img{
    display: block;
    max-height:100px;
    object-fit:contain;
    margin-right:10px;
    border-radius:4px;
    transition: transform 450ms;
    cursor: pointer;

    &:hover{
      transform: scale(1.08);
      opacity: 1;
    }

    &.large{
      max-height:250px;
    }
  }
  >button{
  position: absolute;
  top: 56px;
  opacity: 0;
  font-size:2em;
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
