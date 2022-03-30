import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { getFirestore } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();

  const searchInput = document.querySelector("[data-search]")

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    console.log(value)
  });
}