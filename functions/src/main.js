import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { overlay } from './main-overlay.js';
import { getFirestore, getDoc, doc, collection } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/app/login";
    })
  const db = getFirestore();

  if (localStorage.getItem("new") == "true") {
    console.log("New is true");
    overlay(db, user.uid);
  }

  const userDoc = await getDoc(doc(collection(db, "users"), user.uid));
  console.log(userDoc.data())
  const welcomeText = document.getElementById("welcome").querySelector("strong").innerText = "Welcome Home, " + userDoc.data().firstname + "!"
}