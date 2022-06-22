import React from 'react'
import styled from 'styled-components'
import { Github, Stripe, ReactLogo, Firebase } from "@styled-icons/boxicons-logos"
import {CodeBlock} from "@styled-icons/boxicons-regular"
import {Styledcomponents} from "@styled-icons/simple-icons"
import { StyledIconBase } from '@styled-icons/styled-icon'
import TMDBurl from '../../TMDB-icon.svg';
function Footer() {
  return (
    <FooterContainerWrapper>
      <FooterContainer>
        <FooterDivider>
        </FooterDivider>
        <FooterContent>
          <p style={{margin:"0 0 30px"}}>Cloned by&nbsp;
            <a href="https://github.com/f2xiao" target="_blank" rel="noopener noreferrer">
              <span>f2xiao&nbsp;
              <span><Github title="github icon" /></span>
              </span>
            </a>
          </p>
          <ul>
            <li><a href="https://github.com/f2xiao/netflix-clone-react" target="_blank" rel="noopener noreferrer">
            <span><CodeBlock /></span>
              <span>&nbsp;with</span>
            </a></li>
            <li><a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
              <span><ReactLogo /></span>
              <span>&nbsp;React</span>
            </a></li>
            <li><a href="https://styled-components.com/" target="_blank" rel="noopener noreferrer">
              <span><Styledcomponents /></span>
              <span>&nbsp;Styled Components</span>
            </a></li>
            <li><a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">
              <span><Firebase /></span>
              <span>&nbsp;Firebase</span>
            </a></li>
            <li><a href="https://www.themoviedb.org/documentation/apis" target="_blank" rel="noopener noreferrer">
              <span>
                <img src={TMDBurl} alt="TMDB icon" />
              </span>
              <span>&nbsp;TMDB API</span>
            </a></li>
            <li><a href="https://stripe.com/en-ca" target="_blank" rel="noopener noreferrer">
              <span><Stripe /></span>
              <span>&nbsp;Stripe</span>
            </a></li>
          </ul>
        </FooterContent>
      </FooterContainer>
    </FooterContainerWrapper>
  )
}

export default Footer

const FooterContainerWrapper = styled.div`
  margin-top: 3em;
  background-color: rgba(255,255,255,0.8);
`
const FooterContainer = styled.div`
a:hover{
      text-decoration: underline;
    }
@media only screen and (min-width: 740px){
  max-width:1000px;
}
  width:90%;
  margin: 0 auto;
  padding: 30px 0;
  

  ${StyledIconBase}, img {
    height:20px;
    width:20px;
    display: inline-block;
    vertical-align: middle;
  }
`
const FooterDivider = styled.div`
  
`
const FooterContent = styled.div`
>span{
  vertical-align: "center";
  display: inline-block;
}
margin-bottom: 20px;
>ul{
  display:flex;
  flex-wrap: wrap;
  >li{
    width:25%;
    margin-bottom:16px;
    min-width: 190px;
    padding-right:12px;
  }
  
}
`



