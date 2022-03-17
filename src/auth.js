import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { createUsers } from "./database.js";


// Creates a new user with email and password, then create a user profile in "users" collection.
function signup(auth, email, password) {

  console.log(email);
  console.log(password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

// Log in users.
function login(auth, email, password) {

  console.log(email);
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Successfully Loged in.");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.code);
    });
}

export { signup, login };