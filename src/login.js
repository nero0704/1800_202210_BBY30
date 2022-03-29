import { init } from './firebaseInit';
import { ready } from './client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, collection } from 'firebase/firestore';

ready();

let db = DB();
let auth = AUTH();

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

// Adds eventlistener to input fields.
const input = document.querySelectorAll("input");
input.forEach((i) => {
  i.addEventListener('change', disableButton);
})

// Disable Login & Signup buttons while input field is empty.
function disableButton() {
  if (window.location.pathname == "/signup") {
    if (!(document.getElementById("login-email").value &&
        document.getElementById("login-password").value &&
        document.getElementById("login-name").value &&
        document.getElementById("login-username").value)) {
      document.querySelector("button").disabled = true;
    } else {
      document.querySelector("button").disabled = false;
    }
  } else if (window.location.pathname == "login") {
    if (!(document.getElementById("login-name").value &&
        document.getElementById("login-username").value)) {
      document.querySelector("button").disabled = true;
    } else {
      document.querySelector("button").disabled = false;
    }
  }
}


// Signup function called when Signup button is pressed.
window.signup = () => {
  let id = document.getElementById("login-email").value;
  let pw = document.getElementById("login-password").value;
  let name = document.getElementById("login-name").value;
  let username = document.getElementById("login-username").value;

  createUserWithEmailAndPassword(auth, id, pw)
    .then(async(userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      await setDoc(doc(collection(db, "users"), user.uid), {
        email: id,
        name: name,
        username: username
      })
      console.log("Successfully Signed up.");
      localStorage.setItem('new', 'true');
      location.href = "/";
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
}

// Login function called when Login button is pressed.
window.login = () => {
  let id = document.getElementById("login-email").value;
  let pw = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, id, pw)
    .then((userCredential) => {
      console.log("Successfully Logged in.");
      const user = userCredential.user;
      location.href = "/";
    })
    .catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
}