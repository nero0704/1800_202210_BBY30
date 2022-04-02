import { init } from './firebaseInit.js';
import { ready, client } from './client.js';
import { collection, getDocs, getFirestore, where, query, runTransaction } from 'firebase/firestore';

class userInfo {
  constructor(name, email, username) {
    this.name = name;
    this.email = email;
    this.username = username;
  }
}

run();

async function run() {

  ready(client);
  const user = await init()
    .catch((error) => {
      console.log(error)
      window.location.href = "/app/login";
    })
  const db = getFirestore();

  if (localStorage.getItem("new") == "true") {
    console.log("New is true");
    overlay(db, user.uid);
  }

  
}