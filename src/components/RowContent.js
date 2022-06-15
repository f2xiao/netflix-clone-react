import React, { useState, useEffect, useContext}  from 'react'
import styled from 'styled-components'
import { GenresContext } from '../App';

function RowContent({ genreIDs, rating }) {
  const [genres, setGenres] = useState([]);
  const genresList = useContext(GenresContext);
  // console.log(genresList)

  useEffect(() => {
    if (genresList.length !== 0) {
      // console.log(typeof genresList[0].id);
      // console.log(typeof genreIDs[0]);
      // console.log(genreIDs)
      
      genreIDs.forEach(id => {
        const found = genresList.find((genre) => genre.id === id);
        
        setGenres((prevGenres) => {
          return [...prevGenres, found.name]  
        });
      });
      // console.log(genresList.length)
      // console.log(genreIDs)
      console.log(genres);
      
    }

  }, [genreIDs, genresList]);
  
  
  return (
    <RowContentContainer>
      <div>RowContent</div>
      {/* {genres.map((genre) => 
        (<span>{genre}</span>)
      )} */}
    </RowContentContainer>
  )
}

export default RowContent

const RowContentContainer = styled.div`
`