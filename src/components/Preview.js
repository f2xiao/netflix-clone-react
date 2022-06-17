import React, {useRef} from 'react';
import styled from 'styled-components';


function Preview({ preview, handleMouseLeave }) {
  const ytBaseUrl = "https://www.youtube.com/embed/";
  const previewElement = useRef(null);
  const videoElement = useRef(null);

  const expandPreview = (e) => {
    previewElement.current.style.position = "fixed";
    previewElement.current.style.width = "90vw";
    previewElement.current.style.top = `3em`;
    previewElement.current.style.left = `5vw`;
    previewElement.current.style.height = "90vh";
    previewElement.current.style.fontSize = "1.5em";
    videoElement.current.style.width = "90vw";
    videoElement.current.style.height = "80vh";
  }
  return (
    <PreviewContainer
      ref={previewElement}
      onMouseLeave={(e)=>{handleMouseLeave(e)}}
      style={{
        top: preview?.position?.top,
        left: preview?.position?.left,
        opacity: preview?.opacity,
        width: preview?.size?.width,
        height: preview?.size?.height,
        position: preview?.position,
        fontSize: preview?.fontSize
      }}
    >
      {preview.video ? (
        <div>
          <iframe
          ref={videoElement}
          src={`${ytBaseUrl}${preview.video.key}?mute=1&autoplay=1 `}
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
          />
        </div>
      ) : (<img alt={preview?.movie?.name || preview?.movie?.original_title} src={preview?.imgSrc} />)}
        <PreviewInfo>
          <h5>
          {preview?.movie?.name || preview?.movie?.original_title}
          { preview.video &&
            <button onClick={(e) => {expandPreview(e)}}>
            <i className="arrow down" />
          </button>
          }
        </h5>
        
          <p>
          {preview?.genres}
          </p>
       </PreviewInfo>
      
    </PreviewContainer>
  )
}

export default Preview;

const PreviewContainer = styled.div`
  opacity: 0;
  background: rgba(255,255,255,1);
  position: absolute;
  font-size:0.8em;
  /* z-index:3; */
  /* transition: all 0.5s; */
  /* border-radius:5px; */
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  box-shadow: 5px 5px rgba(255,255,255,0.3);
  will-change: opacity, top, left;
 >img, >div{
  display:block;
  width:100%;
 }
 >div{
  background-color: rgba(0,0,0,0.9);
  /* position: relative; */
  z-index:2;
   >iframe{
    display:block;
    width:100%;
   }
 }
 
 
`
const PreviewInfo = styled.div`
  background: rgba(255,255,255,1);
  padding: 0.5em 0.5em;
 >h5{
  position: relative;
  padding: 0 0.5em;
  font-size: 1em;
  height: 2em;
  line-height: 2em;
  >button{
      position: absolute;
      right: 0.5em;
      top: 0.5em;
      padding-top:2px;
      padding-bottom:5px;
      height:32px;
      width:32px;
      border:2px solid rgba(0,0,0,0.9);
      border-radius: 50%;
      >i {
          &.arrow {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        }
        &.down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        }
      }
      }
 }
 >p{
  padding:0.5em 0.5em;
 }
`