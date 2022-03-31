import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { collection, getDocs, getFirestore, where, query } from 'firebase/firestore';



class Snacks {
  constructor(snack, country, type) {
    this.snack = snack;
    this.country = country;
    this.type = type;
  }
}




run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();

  createCards(searchBar);

  async function createCards(callback) {
    const querySnapshot = await getDocs(collection(db, "snacks"));
    let snacks = []
    querySnapshot.forEach((doc) => {
      snacks.push(({
        name: doc.id,
        type: doc.data().type,
        country: doc.data().country
      }));
    });
    console.log(snacks);

    const userCardTemplate = document.querySelector("[data-user-template]")

    callback();
  };

  function searchBar() {
    console.log("Create cards");
    const searchInput = document.getElementById("mysearch");
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value
      console.log(value);
      snacks.forEach(snack => {
        const isVisible =
          snack.name.includes(value) || snack.country.includes(value) ||
          snack.type.includes(value)
        snack.element.classList.toggle("hide", !isVisible)
      })
    });
  }
}