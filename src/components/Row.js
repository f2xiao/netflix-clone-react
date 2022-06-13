import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from '.././axios'


function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const imgbase_url = `https://image.tmdb.org/t/p/original/`;
  useEffect(() => {
    const fetchMovies = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchMovies();
  }, [fetchUrl]);

  const scroll = (button, e) => {
    // console.log(e.target.parentNode.parentNode.children[1].scrollLeft)
    const element = e.target.parentNode.children[1];
    let distanceX;
    if (button === 'next') {
      distanceX =element.scrollLeft + 400
    }
    if (button === 'prev') {
      distanceX =element.scrollLeft - 400
    }

    element.scroll({
      left: distanceX,
      behavior:'smooth'
    })
  }
  const handleClickPrev = (e) => {
    scroll('prev', e);
  }
  const handleClickNext = (e) => {
    scroll('next', e)
  }
  return (
    <RowContainer>
      <h2>{title}</h2>
      <Posters>
        {movies.map(movie =>
          <img className={isLargeRow? 'large' : undefined}
            key={movie.id}
            alt={movie.title}
            src={`${imgbase_url}${isLargeRow ? (movie?.poster_path) : (movie?.backdrop_path)}`} />)}
      </Posters>
     
      <button className="prev" onClick={handleClickPrev}>&#10094;</button>
      <button className="next" onClick={handleClickNext}>&#10095;</button>
     
    </RowContainer>
   
  )
}

export default Row

const RowContainer = styled.div`
 position: relative;
>h2{
  padding:0.5em 1.5em;
}
>button{
  position: absolute;
  top:58%;
 
  cursor: pointer;

  &.prev{
    left:2.5em;
  }

  &.next{
    right:2.5em;
  }
}

`
const Posters = styled.div`
  display:flex;
  flex-direction: row;
  overflow: auto;
  padding: 0 1.5em;
  &::-webkit-scrollbar {
  display:none
}
  >img{
    display: block;
    max-height:100px;
    object-fit:contain;
    margin-right:10px;
    width:100%;
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
`
