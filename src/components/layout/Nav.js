import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import logo from '../../logo.svg';

function Nav({handleOnMount, handleButtonClick, handleImgClick}) {
  const user = null;
  const [show, setShow] = useState(false);
  const buttonEle = useRef(null);
  const logoEle = useRef(null);
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
    handleOnMount(logoEle.current, buttonEle.current )
    // console.log(logoEle.current)
    // console.log(buttonEle.current)
    return () => {
      // clean up event listener on unmount
      window.removeEventListener('scroll', transitionNavBar);
    };
   }, [handleOnMount])
  return (
    <NavContainer className={ show && 'black'}>
      <img
        ref={logoEle}
        src={logo}
        alt="logo"
        className="logo"
        onClick={(e) => {handleImgClick(e)}} />
      {user ?
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" className="avatar" /> :
        <button
          ref={buttonEle}
          onClick={(e) => { handleButtonClick(e) }}>Sign In</button>
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
  > img.logo {
    width: 4em;
    pointer-events: none;
  }
  > img.avatar {
    height: 2em;
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