import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, collection, getFirestore } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
    })
  const db = getFirestore();
  const auth = getAuth();

  const input = document.querySelectorAll("input");
  input.forEach((i) => {
    if (window.location.pathname == "/login") {
      i.addEventListener("input", disableLogin);
    } else {
      document.querySelector("button").disabled = true;
      i.addEventListener("input", disableSignup);
    }
  })

  // Disable Login & Signup buttons while input field is empty.
  function disableSignup() {
    if (document.getElementById("login-email").value &&
      document.getElementById("login-password").value &&
      document.getElementById("login-name").value &&
      document.getElementById("login-username").value) {
      document.querySelector("button").disabled = false;
      console.log("Enabled.")
    } else {
      document.querySelector("button").disabled = true;
      console.log("Disabled.")
    }
  }

  function disableLogin() {
    if (document.getElementById("login-email").value &&
      document.getElementById("login-password").value) {
      document.querySelector("button").disabled = false;
      console.log("Enabled.")
    } else {
      document.querySelector("button").disabled = true;
      console.log("Disabled.")
    }
  }

  // Toggles to show password when eye is clicked.
  window.showPassword = () => {
    let icon = document.getElementById("show-password").classList;
    let pass = document.getElementById("login-password");
    if (icon.contains("fa-eye")) {
      icon.remove("fa-eye")
      icon.add("fa-eye-slash");
      changeInputType(pass, "text");
    } else {
      icon.remove("fa-eye-slash")
      icon.add("fa-eye");
      changeInputType(pass, "password");
    }
  };

  // Changes type of an object.
  function changeInputType(oldObject, oType) {
    var newObject = document.createElement('input');
    newObject.type = oType;
    if (oldObject.value) newObject.value = oldObject.value;
    if (oldObject.placeholder) newObject.placeholder = oldObject.placeholder;
    if (oldObject.id) newObject.id = oldObject.id;
    if (oldObject.className) newObject.className = oldObject.className;
    oldObject.parentNode.replaceChild(newObject, oldObject);
    return newObject;
  }

  // Signup function called when Signup button is pressed.
  window.signup = () => {
    createUserWithEmailAndPassword(auth, document.getElementById("login-email").value, document.getElementById("login-password").value)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await setDoc(doc(collection(db, "users"), user.uid), {
          email: document.getElementById("login-email").value,
          name: document.getElementById("login-name").value,
          username: document.getElementById("login-username").value
        })
        console.log("Successfully Signed up.");
        localStorage.setItem('new', 'true');
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  }

  // Login function called when Login button is pressed.
  window.login = () => {
    signInWithEmailAndPassword(auth, document.getElementById("login-email").value, document.getElementById("login-password").value)
      .then((userCredential) => {
        console.log("Successfully Logged in.");
        const user = userCredential.user;
        console.log(user);
        window.location.href = "/";
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  }
}