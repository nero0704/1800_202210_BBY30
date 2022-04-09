import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { doc, collection, getDoc, getFirestore } from 'firebase/firestore';

run();
async function run() {
  // Instantiates firebase object.
  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/login";
    })
  const db = getFirestore();

  // Grabs the localstorage data, name of the snack and the adress of the store.
  const snack = localStorage.getItem("name");
  const store = localStorage.getItem("adress");

  const name = document.querySelector("#name");
  const adress = document.querySelector("#adress");

  name.innerHTML = snack;
  adress.innerHTML = store;
}

// Callback function/\.
window.initMap = () => {
  initialize(codeAddress);
}

var geocoder;
var map;

// Instantiates the google map. This will initialize the google map.
function initialize(callback) {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 14,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  console.log("Initialized.");
  callback();
}

// Geocodes the adress of the store location into Lat and Lng.
function codeAddress() {

  const snack = localStorage.getItem("name");
  const store = localStorage.getItem("adress");

  var address = store;
  geocoder.geocode({ 'address': address }, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      console.log("Geocoded.");
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}