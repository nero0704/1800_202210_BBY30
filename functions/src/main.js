import { init } from './firebaseInit.js';
import { ready, client, ajaxGET } from './client.js';
import { overlay } from './main-overlay.js';
import { getFirestore } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      ajaxGET("/login", () => {})
    })
  const db = getFirestore();

  if (localStorage.getItem("new") == "true") {
    console.log("New is true");
    overlay(db, user.uid);
  }
}