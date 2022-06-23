import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import SignIn from '../components/SignIn';

function LoginView({signIn, showSignIn}) {
  const [email, setEmail] = useState('');
  const inputEle = useRef(null);

  return (
    <LoginViewContainer>
      <div style={{minHeight: '85vh', display:'flex', justifyContent:'center'}}>
        {  
          signIn ? <SignIn email={email} /> : (
              <FormContainer>
                  <div>
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                  <form action="" onSubmit={(e)=>{ email&&showSignIn(e) }}>
                      <input
                        ref={inputEle}
                        type="email"
                        id="email"
                        required
                        autoFocus
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        placeholder='Email address' />
                    <button type="submit">Get Started &gt;</button>
                  </form>
                </div>
              </FormContainer>
          )}
      </div>
    </LoginViewContainer>
  )
}
const bgImg = `https://assets.nflxext.com/ffe/siteui/vlv3/5ea364b1-8e59-4693-8ad8-f0eaee32d1bf/7c2448d0-4964-452d-ad19-91e4307c226a/CA-en-20220530-popsignuptwoweeks-perspective_alpha_website_medium.jpg`
export default LoginView
const LoginViewContainer = styled.div`
background-image: url(${bgImg});
background: cover;
`;
const FormContainer = styled.div`
  text-align: center;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 >div{
  width: 90vw;
  max-width: 700px;
  margin-top:6em;
  >h1{
  font-size:4em;
 }
 >h2{
  margin-top: 1em;
  font-size: 2em;
 }
 >h3{
  margin: 1em auto;
  font-size: 1.5em;
 }
 >form{
  /* max-width:700px; */
  margin:0 auto;
  >input{
    &:focus{
      outline:none
    }
    height:4em;
    width:70%;
    min-width: 350px;
    padding:0 0.5em;
    font-size: 1em;
    color:white;
  }
  >button{
    height: 4em;
    width:30%;
    min-width: 130px;
    font-size: 1em;
    font-weight:700;
  }
 }
 }
`;