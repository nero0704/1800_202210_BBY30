import { init } from './firebaseInit.js';
import { ready, client, ajaxGET } from './client.js';
import { overlay } from './main-overlay.js';
import { getFirestore, getDoc, updateDoc, doc, collection } from 'firebase/firestore';

var user, db, uid;

run();

async function run() {
  ready(client);
  user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  db = getFirestore();
  uid = user.uid;
}

window.snackOverlay = async() => {
  let snacks;

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
    document.getElementById("done").addEventListener("click", () => {
      snacks = document.getElementById("tags-container").getElementsByClassName("active");
      let snacksData = [];
      for (let i = 0; i < snacks.length; i++) {
        snacksData.push(snacks[i].innerHTML);
      }
      updateDoc(doc(collection(db, "users"), uid), {
        snacks: snacksData
      });
      document.getElementById("overlay").innerHTML = "";
      document.getElementById("overlay").style.display = "none";
    });
  })
}


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
    document.getElementById("next").addEventListener("click", () => {
      countries = document.getElementById("tags-container").getElementsByClassName("active");
      let countriesData = [];
      for (let i = 0; i < countries.length; i++) {
        countriesData.push(countries[i].innerHTML);
      }
      updateDoc(doc(collection(db, "users"), uid), {
        countries: countriesData,
      });
      document.getElementById("overlay").innerHTML = "";
      document.getElementById("overlay").style.display = "none";
    });
  })
}