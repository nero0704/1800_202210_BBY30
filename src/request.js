import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { doc, setDoc, collection, getFirestore } from 'firebase/firestore';

run();

async function run() {
  // Instantiates firebase app
  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();

  // Makes a new request document on firebase when submitted.
  document.getElementById("submit").addEventListener("click", async() => {

    // Grabs text from input fields.
    var title = document.getElementById("title-text").value;
    var desc = document.getElementById("description").value;
    var cater = document.getElementById("select").value;

    // Creates a request document.
    await setDoc(doc(collection(db, "requests"), title), {
        type: cater,
        description: desc
      })
      .then(() => {
        // On complete, move to another page that request was successfully made.
        window.location.href = "/requestSuccess";
      }).catch((error) => {
        // On exception
        console.log(error);
      })
  })
}