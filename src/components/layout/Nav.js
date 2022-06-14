import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../logo.svg';

function Nav() {
  const [show, setShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
   }, [])
  return (
    <NavContainer className={ show && 'black'}>
      <img src={logo} alt="logo" className="logo" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" className="avatar" />
    </NavContainer>
  )
}

export default Nav

const NavContainer = styled.div`
  position: fixed;
  width:100%;
  z-index:1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em var(--padding-left);
  transition: all 0.5s ease-in;
  > img.logo {
    width: 4em;
    cursor: pointer;
  }
  > img.avatar {
    height: 2em;
    cursor: pointer;
    border-radius: 4px;
  }
  
  &.black {
    background-color: rgb(20, 20, 20);
  }
`