import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
} from "react-router-dom";
import { selectUser } from "./features/user/userSlice";
import HomeView from "./views/HomeView"
import LoginView from "./views/LoginView"
import ProfileView from "./views/ProfileView";
import { auth } from './firebase.js';
import { onAuthStateChanged, signOut } from "firebase/auth"
import { login, logout } from "./features/user/userSlice";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";


export default function App() {
  const [signIn, setSignIn] = useState(false);
  const [navEleObj, setNavEleObj] = useState({
    "logo": null,
    "signIn": null
  }); 

  const passEleRef = useCallback((logoEle, signInEle) => {
    // pass logo and signin button ref to LoginView comp
      setNavEleObj({
        "logo": logoEle,
        "signIn": signInEle
      });
    },[])

  const showSignIn = ((e) => {
    const { logo, signIn } = { ...navEleObj };
    // prevent refresh 
    e.preventDefault();
    // show SignIn comp

    setSignIn(true);
    // console.log(logo, signIn)
    // hide the signin button
   signIn.style.display = "none";
    // enable logo image click
    logo.style.pointerEvents = "auto";
    logo.style.cursor = "pointer";
    // console.log(logoEle);
  })
  
  const hideSignIn = (e) => {
    const { logo, signIn } = { ...navEleObj };
    // prevent refresh
    e.preventDefault();
    // disable logo image click
    logo.style.pointerEvents = "none";
     // show SignIn comp
     setSignIn(false);
     // hide the signin button
     signIn.style.display = "block";
  }

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const signout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(logout());
      
    }).catch((error) => {
      // An error happened.
    });
   }

  useEffect(() => { 
    // attach a listener to auth state changes, so whenever there is a changes on auth state, the handler will be executed
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // login user
        // console.log(user)
        dispatch(login({
          email: user.email,
          uid:user.uid
        }))
        // ...
      } else {
        // logout user
        dispatch(logout())
      }
    });
    return unsubscribe;
   }, [])
  return (
    <div className="App">
      <Nav handleOnMount={passEleRef} handleImgClick={hideSignIn} handleButtonClick={showSignIn}
      signIn={signIn}
      />
      {!user ? <LoginView showSignIn={showSignIn} signIn={signIn} /> : (
        <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route exact path="/profile" element={<ProfileView handleClick={signout} />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}