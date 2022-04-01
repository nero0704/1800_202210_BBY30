import { init } from './firebaseInit.js';
import { ready, client, ajaxGET } from './client.js';
import { doc, setDoc, collection, getFirestore, getDoc } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      ajaxGET("/login", () => {})
    })
  const db = getFirestore();

  document.getElementById("submit").addEventListener("click", async() => {

    var title = document.getElementById("title-text").value;
    var desc = document.getElementById("description").value;
    var cater = document.getElementById("select").value;

    await setDoc(doc(collection(db, "requestform"), title), {
        request: desc,
        type: cater
      })
      .then(() => {
        ajaxGET("/requestSuccess", () => {})
      }).catch((error) => {
        console.log(error);
      })
  })
}