import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { doc, setDoc, collection, getFirestore } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/app/login";
    })
  const db = getFirestore();

  document.getElementById("submit").addEventListener("click", async() => {

    var title = document.getElementById("title-text").value;
    var desc = document.getElementById("description").value;
    var cater = document.getElementById("select").value;

    await setDoc(doc(collection(db, "requests"), title), {
        type: cater,
        description: desc
      })
      .then(() => {
        window.location.href = "/app/requestSuccess";
      }).catch((error) => {
        console.log(error);
      })
  })
}