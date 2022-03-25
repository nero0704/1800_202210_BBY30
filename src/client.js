import { init } from './firebaseInit.js';
import { doc, updateDoc, collection } from 'firebase/firestore';

// invoke ready and pass in a callback function
ready(function() {

  console.log("Client script loaded.");

  // a function declaration inside of a callback ... which takes a callback function :O
  function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //console.log('responseText:' + xhr.responseText);
        callback(this.responseText);

      } else {
        console.log(this.status);
      }
    }
    xhr.open("GET", url);
    xhr.send();
  }

  window.addEventListener("load", () => {
    const db = init("db");
    const uid = init("uid");

    if (localStorage.getItem("new") == "true") {

      let countries;
      let snacks;

      ajaxGET("/new?format=countries", async(data) => {

        document.getElementById("overlay").innerHTML = data;
        await document.onload;

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
          ajaxGET("/new?format=snacks", async(data) => {

            countries = document.getElementById("tags-container").getElementsByClassName("active");
            document.getElementById("overlay").innerHTML = data;
            await document.onload;

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
          });


          document.getElementById("done").addEventListener("click", () => {

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
        })
      })
    }

    ajaxGET("/nav", (data) => {
      try {
        document.getElementById("footer-nav").innerHTML = data;
      } catch (error) {
        console.log("Footer not found.");
      }
    });
  });

});

// process the callback function
function ready(callback) {
  if (document.readyState != "loading") {
    callback();
    console.log("ready state is 'complete'");
  } else {
    document.addEventListener("DOMContentLoaded", callback);
    console.log("Listener was invoked");
  }
}

export { ready };