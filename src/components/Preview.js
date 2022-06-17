import React from 'react';
import styled from 'styled-components';

function Preview({ preview, handleMouseLeave }) {

  return (
    <PreviewContainer
      onMouseLeave={(e)=>{handleMouseLeave(e)}}
      style={{
        top: preview?.position?.top,
        left: preview?.position?.left,
        opacity: preview?.opacity,
        width: preview?.size?.width,
        height: preview?.size?.height,
      }}
      >
      
        <img alt={preview?.movie?.name || preview?.movie?.original_title} src={preview?.imgSrc} />
        <PreviewInfo>
          <h5>
            {preview?.movie?.name || preview?.movie?.original_title }
          </h5>
          <p>
          {preview?.genres}
          </p>
       </PreviewInfo>
      
    </PreviewContainer>
  )
}

export default Preview

const PreviewContainer = styled.div`
  opacity: 0;
  position: absolute;
  font-size:0.8em;
  /* z-index:3; */
  /* transition: all 0.5s; */
  border-radius:5px;
  box-shadow: 5px 5px rgba(255,255,255,0.3);
  will-change: opacity, top, left;
 >img{
  display:block;
  width:100%;
 }
 
 
`
const PreviewInfo = styled.div`
  background: rgba(255,255,255,1);
  padding:0.5em 0.5em;
  height: 50%;
  width:100%;
 >h5{
  padding:0.5em 0.5em;
 }
 >p{
  padding:0.5em 0.5em;
 }
`