import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from '.././axios'


function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const postersContainer = useRef();
  const prevButton = useRef();
  const imgbase_url = `https://image.tmdb.org/t/p/original/`;
  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchMovies();
  }, [fetchUrl]);

  const slide = (button) => {
    // console.log(e.target.parentNode.parentNode.children[1].scrollLeft)
    
    let distanceX;
    if (button === 'next') {
      distanceX =postersContainer.current.scrollLeft + 400
    }
    if (button === 'prev') {
      distanceX =postersContainer.current.scrollLeft - 400
    }

    postersContainer.current.scroll({
      left: distanceX,
      behavior:'smooth'
    })
  }
  const handleClickPrev = () => {
    slide('prev');
  }
  const handleClickNext = () => {
    prevButton.current.style.opacity = 0.8;
    slide('next')
  }
  return (
    <RowContainer>
      <h2>{title}</h2>
      <Posters ref={postersContainer} onMouseEnter={()=>{setShow(true)}} onMouseLeave={()=>{setShow(false)}}>
        {movies.map(movie =>
          <img className={isLargeRow? 'large' : undefined}
            key={movie.id}
            alt={movie.title}
            src={`${imgbase_url}${isLargeRow ? (movie?.poster_path) : (movie?.backdrop_path)}`} />)}
        <button ref={prevButton} className={isLargeRow? 'large prev' : 'prev'} onClick={handleClickPrev}>&#10094;</button>
         <button className={ show && (isLargeRow? 'large next black' : 'next black')} onClick={handleClickNext}>&#10095;</button>
      </Posters>
    </RowContainer>
   
  )
}

export default Row

const RowContainer = styled.div`
position: relative;

padding-left: var(--padding-left);
>h2{
  padding:0.5em 0;
}

`
const Posters = styled.div`

  display:flex;
  flex-direction: row;
  overflow: auto;
  /* padding: 0 1.5em; */
  &::-webkit-scrollbar {
  display:none
}
  >img{
    display: block;
    max-height:100px;
    object-fit:contain;
    margin-right:10px;
    width:100%;
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
  &.black{
    opacity: 0.8;
  }

  text-align: center;

  height: 100px;
  width: 50px;
  border:none;
  /* transition: all 0.5s ease-in; */
  &.large{
    height: 250px;
  }

  cursor: pointer;

  &.prev{
    left:2em;
  }

  &.next{
    right:0;
  }
}
  
`
