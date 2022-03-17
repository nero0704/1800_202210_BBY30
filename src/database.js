import { doc, setDoc, collection, timeStamp, getFirestore } from "firebase/firestore";

const db = getFirestore();

function createUsers(uid, email, name, tags) {
  var data = {
    email: email,
    name: name,
    tags: tags
  };
  setDoc(doc(db, "users", uid), data);
}

export { createUsers };