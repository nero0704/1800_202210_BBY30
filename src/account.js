import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { overlay } from './main-overlay.js';
import { getFirestore, getDoc, doc, collection } from 'firebase/firestore';


run();

async function run() {
  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();
  const userDoc = await getDoc(doc(collection(db, "users"), user.uid));
  console.log(userDoc.data())
  const welcomeText = document.getElementById("welcome").querySelector("strong").innerText = userDoc.data().firstname
  console.log(userDoc.data().firstname)
}

window.snackOverlay = async() => {

  const user = await init()
    .catch((error) => {
      console.log(error)
    })
  const db = getFirestore();
  const uid = user.uid;

  let snacks;
  let countries;

  document.getElementById("snack").addEventListener("click", async() => {
    ajaxGET("/new?format=snacks", (data) => {
      document.getElementById("overlay").innerHTML = data;
      document.getElementById("overlay").style.display = "grid";
      countries = document.getElementById("tags-container").getElementsByClassName("active");

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

        localStorage.removeItem("new");
        document.getElementById("overlay").innerHTML = "";
        document.getElementById("overlay").style.display = "none";
      });

    })
  })

}


window.countryOverlay = async() => {

  const user = await init()
    .catch((error) => {
      console.log(error)
    })
  const db = getFirestore();
  const uid = user.uid;


  let snacks;
  let countries;

  document.getElementById("country").addEventListener("click", async() => {
    ajaxGET("/new?format=countries", (data) => {
      document.getElementById("overlay").innerHTML = data;
      document.getElementById("overlay").style.display = "grid";
      countries = document.getElementById("tags-container").getElementsByClassName("active");

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

        snacks = document.getElementById("tags-container").getElementsByClassName("active");

        let countriesData = [];


        for (let i = 0; i < countries.length; i++) {
          countriesData.push(countries[i].innerHTML);
        }


        updateDoc(doc(collection(db, "users"), uid), {
          countries: countriesData,

        });

        localStorage.removeItem("new");
        document.getElementById("overlay").innerHTML = "";
        document.getElementById("overlay").style.display = "none";
      });

    })
  })

}