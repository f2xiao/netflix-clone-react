import { useEffect, useState } from "react";
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

  const showSignIn = ((e) => {
    // prevent refresh 
    e.preventDefault();
    // show SignIn comp and hide the signin button
    setSignIn(true);
  })
  
  const hideSignIn = (e) => {
    // prevent refresh
    e.preventDefault();
     // hide SignIn comp and show the signin button
     setSignIn(false);
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
      <Nav
        handleImgClick={hideSignIn}
        handleButtonClick={showSignIn}
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