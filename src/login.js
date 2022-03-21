import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
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
console.log(app);
console.log(db);

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

const input = document.querySelectorAll("input");
input.forEach((i) => {
  i.addEventListener('change', disableSignup);
})

function disableSignup() {
  if (!(document.getElementById("login-email").value &&
      document.getElementById("login-password").value &&
      document.getElementById("login-name").value &&
      document.getElementById("login-username").value)) {
    document.querySelector("button").disabled = true;
  } else {
    document.querySelector("button").disabled = false;
  }
}

window.signup = () => {
  let id = document.getElementById("login-email").value;
  let pw = document.getElementById("login-password").value;
  let name = document.getElementById("login-name").value;
  let username = document.getElementById("login-username").value;

  createUserWithEmailAndPassword(auth, id, pw)
    .then(async(userCredential) => {
      // Signed in
      const user = userCredential.user;
      await setDoc(doc(collection(db, "users"), user.uid), {
        email: id,
        name: name,
        username: username
      })
      location.href = "/";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
      // ..
    });
}

window.login = () => {
  let id = document.getElementById("login-email").value;
  let pw = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, id, pw)
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