import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../features/user/userSlice';
import logo from '../../logo.svg';
import { Link } from "react-router-dom";

function Nav({handleOnMount, handleButtonClick, handleImgClick, signIn}) {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const buttonEle = useRef(null);
  const logoEle = useRef(null);
  // console.log(user)
  
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      // show nav background
      setShow(true);
    } else {
      // hide nav background
      setShow(false);
    }
  }
  useEffect(() => {
    // add scroll event handler on mount for nav background
    window.addEventListener('scroll', transitionNavBar);
    if (handleOnMount) {
      handleOnMount(logoEle.current, buttonEle.current )
    }
    // console.log(logoEle.current)
    // console.log(buttonEle.current)
    return () => {
      // clean up event listener on unmount
      window.removeEventListener('scroll', transitionNavBar);
    };
   }, [handleOnMount])
  return (
    <NavContainer className={show && 'black'}>
      {user ?
        (<Link to="/" >
          <img
            src={logo}
            alt="logo"
            style={{width: '4em', pointerEvents:'none'}}
          />
        </Link>)
        :
      <img
        ref={logoEle}
        src={logo}
        alt="logo"
        style={{ width: '4em' }}
        className={signIn? 'logo' : 'undefined'}
        onClick={(e) => {handleImgClick(e)}} />
      }
      {user ?
        (<Link to="/profile">
        <img
          className="avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
        />
        </Link>)
         :
          (!signIn && (<button
          ref={buttonEle}
          onClick={(e) => { handleButtonClick(e) }}>Sign In</button>))
      }
    </NavContainer>
  )
}

export default Nav

const NavContainer = styled.div`
  position: fixed;
  top:0;
  width:100vw;
  z-index:1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5em var(--padding-left);
  transition: all 0.5s ease-in;
  >img.logo{
    cursor: pointer;
  }
  > * > img.avatar{
    height:2em;
    cursor: pointer;
    border-radius: 4px;
  }
  
  &.black {
    background-color: rgb(20, 20, 20);
  }
  >button{
    padding: 0.5em 1em;
    font-size: 1.2em;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 1px 0 rgb(0 0 0 / 45%);
  }
`