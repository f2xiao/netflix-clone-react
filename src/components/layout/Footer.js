import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <FooterContainerWrapper>
      <FooterContainer>
        <FooterDivider>
        </FooterDivider>
        <FooterContent>
        <p style={{margin:"0 0 30px"}}>Questions? Call&nbsp;
          <a href="/#"><span>1-844-542-4813</span></a>
          </p>
        <ul>
          <li><a href="/#"><span>FAQ</span></a></li>
          <li><a href="/#"><span>Help Center</span></a></li>
          <li><a href="/#"><span>Terms of Use</span></a></li>
          <li><a href="/#"><span>Privacy</span></a></li>
          <li><a href="/#"><span>Cookie Preferences</span></a></li>
          <li><a href="/#"><span>Corporate Information</span></a></li>
        </ul>
        </FooterContent>
      </FooterContainer>
    </FooterContainerWrapper>
  )
}

export default Footer

const FooterContainerWrapper = styled.div`
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
`
const FooterDivider = styled.div`
  
`
const FooterContent = styled.div`
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



