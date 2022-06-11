import React from 'react'
import styled from 'styled-components'

function Banner() {
  return (
    <BannerContainer>
      <BannerContents>
      <h1>Movie Name</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum qui eum nemo, voluptatum ad, atque, explicabo reprehenderit magnam odit inventore iure veritatis doloremque quis consequatur. Ad molestias repudiandae animi iste.</p>
      <div>
        <button>Play</button>
        <button>More info</button>
      </div>
      </BannerContents>
    </BannerContainer>
  )
}

export default Banner

const url = 'https://thelesfilms.files.wordpress.com/2016/06/netflix-banner.jpg';

const BannerContainer = styled.div`
  background: url(${url});
  background-size: cover;
  background-position: center;
  width: 100%;
  padding-bottom: 2.5em;
`

const BannerContents = styled.div`
  display: flex;
  flex-direction: column;
  width:40%;
  margin-left: 2.5em;
  >h1{
    padding-top: 2em;
  }
  >p{
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1em;
    line-height: 1em;
    max-height: 4em;
    margin: 1em 0;
  }
`