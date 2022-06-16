import React, { useState, useEffect, useContext, useRef}  from 'react'
import styled from 'styled-components'
import { GenresContext } from '../App';

function RowContent({ genreIDs, rating, title, isLargeRow, imgSrc }) {
  const [genres, setGenres] = useState([]);
  const genresList = useContext(GenresContext);
  // console.log(genresList)
  // console.log(imgSrc)

  useEffect(() => {
    if (genresList.length !== 0) {
      // console.log(typeof genresList[0].id);
      // console.log(typeof genreIDs[0]);
      // console.log(genreIDs)
      
      genreIDs?.forEach(id => {
        const found = genresList.find((genre) => genre.id === id);
        if (genres.includes(found.name)) return;
        setGenres((prevGenres) => {
          return [...prevGenres, found.name]  
        });
      });
      // console.log(genresList.length)
      // console.log(genreIDs)
      // console.log(genres);
      
    }
    
  }, [genreIDs, genresList]);
  
  
  return (
    <RowContentContainer>
      <div style={{ backgroundImage: `url(${imgSrc})` }}></div>
      <h5>{!isLargeRow && title}</h5>
      <p>
        {
          genres.map((genre) => (
            <span>{genre} </span>
          ))
        }
      </p>
    </RowContentContainer>
  )
}

export default RowContent

const RowContentContainer = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  z-index:3;
  border-radius: 4px;
  box-shadow: 5px 5px rgba(255,255,255,0.8);
  /* border: 1px solid rgba(255,255,255,0.8); */
  background-color: rgba(255,255,255);
  width: 200px;
  >div{
    height: 100px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  /* object-fit: contain; */
  >h5, p{
    font-size: 12px;
    padding:0.5em 0.5em;
  }
`

export { RowContentContainer };