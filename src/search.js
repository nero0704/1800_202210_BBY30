import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { collection, getDocs, getFirestore, where, query } from 'firebase/firestore';


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

  let data = []
  let snacks = []
  parse(searchBar);

  // Pulls snacks data from firestore and displays it on the searching section.
  async function parse(callback) {

    // Grabs list of snacks
    const querySnapshot = await getDocs(collection(db, "snacks"));
    const userCardTemplate = document.querySelector("[data-user-template]");
    const cardContainer = document.querySelector("[user-cards]");

    // Parsing data into a data array.
    querySnapshot.forEach((doc) => {
      data.push({
        name: doc.id,
        type: doc.data().type,
        country: doc.data().country,
        img: doc.data().img,
        adress: doc.data().store
      });
    })

    // Creates a data map with the data.
    snacks = data.map(snack => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const name = card.querySelector("[data-name]")
      const type = card.querySelector("[data-snack]")
      const country = card.querySelector("[data-country]")
      const adress = card.querySelector("[data-adress]")

      name.textContent = snack.name
      type.textContent = snack.type
      country.textContent = snack.country
      adress.textContent = snack.adress

      cardContainer.append(card);
      return { name: snack.name, type: snack.type, country: snack.country, adress: snack.adress, element: card }
    })
    console.log(snacks)

    // Creates a card and expand the card conatiner with it.
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const name = card.querySelector("#name").innerHTML;
        const adress = card.querySelector("#adress").innerHTML;
        localStorage.setItem("name", name);
        localStorage.setItem("adress", adress);
        window.location.href = "/card"
      })
    })
    callback();
  }

  // When a user input is detected, make cards that have matching name, tag, or countries visible, and the rest invisible.
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