import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { overlay } from './main-overlay.js';
import { getFirestore } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

ready(client);

const user = init();
const db = getFirestore();

if (localStorage.getItem("new") == "true") {
  console.log("New is true");
  overlay();
}