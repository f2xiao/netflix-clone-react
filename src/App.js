import { useEffect } from "react";
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
import { onAuthStateChanged } from "firebase/auth"
import { login, logout } from "./features/user/userSlice";

export default function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => { 
    const  unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // login
        console.log(user)
        dispatch(login({
          email: user.email,
          uid:user.uid
        }))
        // ...
      } else {
        // logout
        dispatch(logout())
      }
    });
    return unsubscribe;
   }, [])

  return (
    <div className="App">
      {!user ? <LoginView /> : (
        <Routes>
          <Route exact path="/" element={<HomeView />} />
          <Route exact path="/profile" element={<ProfileView />} />
        </Routes>
      )}
    </div>
  );
}