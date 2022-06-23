import React, {useState, useRef} from 'react'
import styled from 'styled-components';
import { auth } from '.././firebase.js';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
function SignIn({ email }) {
  const [input, setInput] = useState(email);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const register = (e) => { 
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in， dispatch login action to the store
      // console.log(userCredential)
      alert('Register successfully!')
      const authUser = userCredential.user;
      // console.log(authUser);

      // ...
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
    
   }
  const signin = (e) => { 
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('Signin successfully!')
    // console.log(user)
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage);
  });

   }
  return (
    <SignInContainer>
      <div style={{padding:'4em', background:'rgba(255,255,255,0.8)', borderRadius:'4px', width:'40%', maxWidth:500}}>
      <h1>Sign In</h1>
      <FormContainer>
          <form action="/" onSubmit={(e)=>{signin(e)}}>
            <label htmlFor="">
              <label htmlFor="">Email or phone number</label>
              <input
                required
                ref={emailRef}
                type="email"
                name="" id="email"
                autoFocus
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={input}
                onChange={(e) => { setInput(e.target.value) }} />
            </label>
            <label>
              <label htmlFor="">Password</label>
              <input required ref={passwordRef} minLength="8" type="password" name="" id="" />
            </label>
            <button type="submit">Sign in</button>
          </form>
          <p style={{marginTop:'3em', fontSize:'1.2em'}}>
            New to Netflix?<span style={{display:'inline-block', marginLeft:'0.3em', textDecoration:'underline', cursor:'pointer'}} onClick={(e)=>{register(e)}}>Sign up now.</span>
          </p>
      </FormContainer>
      </div>
    </SignInContainer>
  )
}

export default SignIn
const flexBox = styled.div`
display: flex;
flex-direction: column;
`
const SignInContainer = styled(flexBox)`
justify-content: center;
align-items: center;
width:100%;
>div>h1{
  margin-bottom: 1.5em;
}
`
const FormContainer = styled(flexBox)`
> form{
  >label{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    background: rgba(255,255,255,1);
  }
  > label, button {
    height:3em;
    width:100%;
    margin-bottom: 1em;
  }
  > label > * {
    margin-bottom: 0.5em;
    width: 100%;
    padding-left: 1em;
  }
  button{
    font-size:1.2em;
    font-weight: 700;
  }
}

`


