import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { collection, getDocs, getFirestore, where, query } from 'firebase/firestore';


run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();

  let data = []
  let snacks = []
  parse(searchBar);

  async function parse(callback) {

    const querySnapshot = await getDocs(collection(db, "snacks"));
    const userCardTemplate = document.querySelector("[data-user-template]");
    const cardContainer = document.querySelector("[user-cards]");

    querySnapshot.forEach((doc) => {
      data.push({
        name: doc.id,
        type: doc.data().type,
        country: doc.data().country,
        img: doc.data().img
      });
    })
    snacks = data.map(snack => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const name = card.querySelector("[data-name]")
      const type = card.querySelector("[data-snack]")
      const country = card.querySelector("[data-country]")
      const img = card.querySelector("[data-country]")

      name.textContent = snack.name
      type.textContent = snack.type
      country.textContent = snack.country
      cardContainer.append(card);
      return { name: snack.name, type: snack.type, country: snack.country, element: card }
    })
    console.log(snacks)
    callback();
  }




  function searchBar() {
    console.log("Create cards");
    const searchInput = document.getElementById("mysearch");
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase()
      console.log(value)
      snacks.forEach(snack => {
        const isVisible =
          snack.name.toLowerCase().includes(value) ||
          snack.country.toLowerCase().includes(value) ||
          snack.type.toLowerCase().includes(value)
        snack.element.classList.toggle("hide", !isVisible)
      })
    });
  }
}