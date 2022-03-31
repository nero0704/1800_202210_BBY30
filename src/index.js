import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signup, login } from "./auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBzVgKTLtYr-EncsGWaW1a1qbx1esxkQ14",
  authDomain: "taste-of-home-1dedd.firebaseapp.com",
  projectId: "taste-of-home-1dedd",
  storageBucket: "taste-of-home-1dedd.appspot.com",
  messagingSenderId: "307553298856",
  appId: "1:307553298856:web:f273e6a1b3b0073e46959d",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

window.signup = () => {
  let id = document.getElementById("login-email").value;
  let pw = document.getElementById("login-password").value;
  console.log(id);
  console.log(pw);
  signup(auth, id, pw);
}

window.login = () => {
  let id = document.getElementById("login-email").value;
  let pw = document.getElementById("login-password").value;
  console.log(id);
  console.log(pw);
  login(auth, id, pw);
}