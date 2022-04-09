import { init } from './firebaseInit.js';
import { ready, client, ajaxGET } from './client.js';
import { getFirestore, updateDoc, doc, collection } from 'firebase/firestore';

var user, db, uid;

run();

async function run() {
  // Instantiates firebase app.
  ready(client);
  user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  db = getFirestore();
  uid = user.uid;
}

// Displays Snack tags overlay.
window.snackOverlay = async() => {
  ajaxGET("/new?format=snacks", (data) => {
    document.getElementById("overlay").innerHTML = data;
    document.getElementById("overlay").style.display = "grid";
    const tags = document.getElementById("tags-container").querySelectorAll("section");
    tags.forEach((tag) => {
      tag.addEventListener('click', () => {
        if (tag.classList.contains("active")) {
          tag.classList.remove("active");
        } else {
          tag.classList.add("active");
        }
      });
    });

    // Gathers tags that are active and puts it up on database.
    document.getElementById("done").addEventListener("click", () => {
      const snacks = document.getElementById("tags-container").getElementsByClassName("active");
      let snacksData = [];
      for (let i = 0; i < snacks.length; i++) {
        snacksData.push(snacks[i].innerHTML);
      }
      updateDoc(doc(collection(db, "users"), uid), {
        snacks: snacksData
      });

      // Removes overlay.
      document.getElementById("overlay").innerHTML = "";
      document.getElementById("overlay").style.display = "none";
    });
  })
}

// Displays Countries tags overlay.
window.countryOverlay = async() => {
  let countries;

  ajaxGET("/new?format=countries", (data) => {
    document.getElementById("overlay").innerHTML = data;
    document.getElementById("overlay").style.display = "grid";
    const tags = document.getElementById("tags-container").querySelectorAll("section");
    tags.forEach((tag) => {
      tag.addEventListener('click', () => {
        if (tag.classList.contains("active")) {
          tag.classList.remove("active");
        } else {
          tag.classList.add("active");
        }
      });
    });

    // Gathers tags that are active and puts it up on database.
    document.getElementById("next").addEventListener("click", () => {
      countries = document.getElementById("tags-container").getElementsByClassName("active");
      let countriesData = [];
      for (let i = 0; i < countries.length; i++) {
        countriesData.push(countries[i].innerHTML);
      }
      updateDoc(doc(collection(db, "users"), uid), {
        countries: countriesData,
      });

      // Removes overlay.
      document.getElementById("overlay").innerHTML = "";
      document.getElementById("overlay").style.display = "none";
    });
  })
}