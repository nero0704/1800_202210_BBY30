// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzVgKTLtYr-EncsGWaW1a1qbx1esxkQ14",
  authDomain: "taste-of-home-1dedd.firebaseapp.com",
  projectId: "taste-of-home-1dedd",
  storageBucket: "taste-of-home-1dedd.appspot.com",
  messagingSenderId: "307553298856",
  appId: "1:307553298856:web:f273e6a1b3b0073e46959d",
  measurementId: "G-TLC2PW2WPW"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();