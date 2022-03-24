import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzVgKTLtYr-EncsGWaW1a1qbx1esxkQ14",
  authDomain: "taste-of-home-1dedd.firebaseapp.com",
  projectId: "taste-of-home-1dedd",
  storageBucket: "taste-of-home-1dedd.appspot.com",
  messagingSenderId: "307553298856",
  appId: "1:307553298856:web:f273e6a1b3b0073e46959d",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
console.log("Initialized.");

if (localStorage.getItem('new') == 'true') {
  console.log("New is true.");
  document.getElementById("overlay").classList.add("active");
};

const tags = document.getElementById("tags-container").querySelectorAll("section");
tags.forEach((tag) => {
  tag.addEventListener('click', (t) => {
    if (tag.classList.contains("active")) {
      tag.classList.remove("active");
    } else {
      tag.classList.add("active");
    }
  });
});

document.getElementById("submit").addEventListener("click", () => {
  const countries = document.getElementById("tags-container").getElementsByClassName("active");
  for (let i = 0; i < countries.length; i++) {
    // TODO: Find a way to remove <class active> from countries[i]
    console.log(countries[i]);
  }
});

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