import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://booksapi-890ba-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyADwbkb1l-79hOOpQfedKoMq59h2qAcMUU",
  authDomain: "booksapi-890ba.firebaseapp.com",
  databaseURL: "https://booksapi-890ba-default-rtdb.firebaseio.com",
  projectId: "booksapi-890ba",
  storageBucket: "booksapi-890ba.firebasestorage.app",
  messagingSenderId: "778541962257",
  appId: "1:778541962257:web:ba4997d67c206f1b330db0",
  measurementId: "G-MENHE884YV",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, remove };
export default app;
