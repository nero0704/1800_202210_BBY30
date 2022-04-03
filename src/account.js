import { ajaxGET, client, ready } from "./client";
import { init } from "./firebaseInit";
import { getFirestore, updateDoc, doc, collection } from "firebase/firestore";

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