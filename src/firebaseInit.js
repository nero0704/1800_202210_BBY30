import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function init(type) {
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
  let uid;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      console.log(uid);
      console.log("Initialized.");
    } else {
      window.location.href("/login");
    }
  });

  switch (type) {
    case "db":
      return db;
    case "uid":
      return uid;
    case "auth":
      return auth;
  }
}
export { init };