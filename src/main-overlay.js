import { ajaxGET } from "./client";

function overlay(db, uid) {

  let countries;
  let snacks;

  ajaxGET("/new?format=countries", (data) => {

    document.getElementById("overlay").innerHTML = data;
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

        countries = document.getElementById("tags-container").getElementsByClassName("active");
        document.getElementById("overlay").innerHTML = data;

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

          localStorage.removeItem("new");
          document.getElementById("overlay").innerHTML = "";
          document.getElementById("overlay").style({ display: none });

          snacks = document.getElementById("tags-container").getElementsByClassName("active");

          let countriesData = [];
          let snacksData = [];

          for (let i = 0; i < countries.length; i++) {
            countriesData.push(countries[i].innerHTML);
            console.log(countries[i].innerHTML);
          }
          for (let i = 0; i < snacks.length; i++) {
            snacksData.push(snacks[i].innerHTML);
            console.log(snacks[i].innerHTML);
          }

          updateDoc(doc(collection(db, "users"), uid), {
            countries: countriesData,
            tags: snacksData
          });



        });
      });
    })
  })
}

export { overlay };