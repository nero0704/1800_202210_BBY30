import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// This function initializes the firebase.
function init() {
  // Returns new promise to hold the execution 
  // so that any firebase related functions don't execute until initialized.
  return new Promise((resolve, reject) => {
    const firebaseConfig = {
      apiKey: "AIzaSyBzVgKTLtYr-EncsGWaW1a1qbx1esxkQ14",
      authDomain: "taste-of-home-1dedd.firebaseapp.com",
      projectId: "taste-of-home-1dedd",
      storageBucket: "taste-of-home-1dedd.appspot.com",
      messagingSenderId: "307553298856",
      appId: "1:307553298856:web:f273e6a1b3b0073e46959d",
    };
    const app = initializeApp(firebaseConfig);
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User is not logged in."));
      }
    });
    console.log("Firebase App initialized.");
  });
}

export { init };