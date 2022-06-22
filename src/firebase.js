// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgn73SBLLQmRag03kC2gcE9ZMKQBnCHmw",
  authDomain: "netflix-clone-react-d7bd3.firebaseapp.com",
  projectId: "netflix-clone-react-d7bd3",
  storageBucket: "netflix-clone-react-d7bd3.appspot.com",
  messagingSenderId: "618755773953",
  appId: "1:618755773953:web:f93ac6513e0a8acf7d9200"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth}