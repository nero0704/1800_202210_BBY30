import { ajaxGET } from "./client";
import { updateDoc, doc, collection } from "firebase/firestore";

function overlay(db, uid) {

  // Gets the Country overlay using ajaxGET.
  ajaxGET("/new?format=countries", (data) => {

    // Displays snacks overlay.
    document.getElementById("overlay").innerHTML = data;
    document.getElementById("overlay").style.display = "grid";

    // Adds event listener to the tags, so when they are clicked, "active" class is added on each element.
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

    document.getElementById("next").addEventListener("click", async() => {
      ajaxGET("/new?format=snacks", (data) => {

        // Before changing the tags list, grab the active classes from countries list.
        const countries = document.getElementById("tags-container").getElementsByClassName("active");

        // Changes the snacks overlay to countries overlay.
        document.getElementById("overlay").innerHTML = data;

        // Adds event listener to the tags, so when they are clicked, "active" class is added on each element.
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

        // When user is finished, creates a new dataformat and updates the user document.
        document.getElementById("done").addEventListener("click", () => {

          // Grabs tags that are active / selected.
          const snacks = document.getElementById("tags-container").getElementsByClassName("active");

          let countriesData = [];
          let snacksData = [];

          // Parses countries data into an array.
          for (let i = 0; i < countries.length; i++) {
            countriesData.push(countries[i].innerHTML);
          }
          // Parses snacks data into an array.
          for (let i = 0; i < snacks.length; i++) {
            snacksData.push(snacks[i].innerHTML);
          }

          // Updates the user document.
          updateDoc(doc(collection(db, "users"), uid), {
            countries: countriesData,
            snacks: snacksData
          });

          // Remove the "new" item in localstorage to prevent the overlay showing again.
          localStorage.removeItem("new");

          // Removes the overlay.
          document.getElementById("overlay").innerHTML = "";
          document.getElementById("overlay").style.display = "none";
        });
      });
    })
  })
}

export { overlay };