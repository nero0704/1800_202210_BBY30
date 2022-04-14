import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { overlay } from './main-overlay.js';
import { getFirestore, getDoc, doc, collection } from 'firebase/firestore';

run();

async function run() {
  // Instantiates firebase app.
  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();

  // Displays the new user overlay when there is a "new" item in localstorage.
  if (localStorage.getItem("new") == "true") {
    console.log("New is true");
    overlay(db, user.uid);
  }

  // Changes the welcome text to greet the user.
  const userDoc = await getDoc(doc(collection(db, "users"), user.uid));
  console.log(userDoc.data())
  document.getElementById("welcome").querySelector("strong").innerText = "Welcome Home, " + userDoc.data().firstname + "!"
}