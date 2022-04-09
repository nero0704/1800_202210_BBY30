import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { collection, getFirestore, getDocs } from 'firebase/firestore';

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

  let data = []
  let requests = []

  parse();

  async function parse() {
    // Pulls all requests from firestore and puts into the requests list.
    const querySnapshot = await getDocs(collection(db, "requests"));
    const userCardTemplate = document.querySelector("[data-request-template]");
    const cardContainer = document.querySelector("[request-list]");

    // Data snapshot
    querySnapshot.forEach((doc) => {
      data.push({
        title: doc.id,
        type: doc.data().type,
        description: doc.data().description
      });
    })

    // Makes a new data map of requests
    requests = data.map(request => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const title = card.querySelector("[data-title]")
      const type = card.querySelector("[data-type]")
      const description = card.querySelector("[data-description]")

      title.textContent = request.title
      type.textContent = request.type
      description.textContent = request.description
      cardContainer.append(card);
      return { title: request.title, type: request.type, description: request.description, element: card }
    })
  }
}