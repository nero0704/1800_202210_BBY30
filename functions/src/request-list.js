import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { collection, getFirestore, getDocs } from 'firebase/firestore';

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/app/login";
    })
  const db = getFirestore();

  let data = []
  let requests = []

  parse();

  async function parse() {

    const querySnapshot = await getDocs(collection(db, "requests"));
    const userCardTemplate = document.querySelector("[data-request-template]");
    const cardContainer = document.querySelector("[request-list]");

    querySnapshot.forEach((doc) => {
      data.push({
        title: doc.id,
        type: doc.data().type,
        description: doc.data().description
      });
    })

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