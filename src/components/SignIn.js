import React, {useState} from 'react'
import styled from 'styled-components';
function SignIn({ email }) {
  const [input, setInput] = useState(email);
  return (
    <SignInContainer>
      <div style={{padding:'4em', background:'rgba(255,255,255,0.8)', borderRadius:'4px', width:'40%', maxWidth:500}}>
      <h1>Sign In</h1>
      <FormContainer>
          <form action="/" onSubmit>
            <label htmlFor="">
              <label htmlFor="">Email or phone number</label>
              <input
                required
                type="email"
                name="" id="email"
                autoFocus
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={input}
                onChange={(e) => { setInput(e.target.value) }} />
            </label>
            <label>
              <label htmlFor="">Password</label>
              <input required minLength="8" type="password" name="" id="" />
            </label>
            <button type="submit">Sign in</button>
          </form>
          <p style={{marginTop:'3em', fontSize:'1.2em'}}>
            New to Netflix?<a style={{display:'inline-block', marginLeft:'0.3em'}} href="/#">Sign up now.</a>
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


