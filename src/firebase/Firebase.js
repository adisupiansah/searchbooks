import { initializeApp } from "firebase/app";
import {getDatabase, ref, set, get, remove} from "firebase/database";

const firebaseConfig = {
    databaseURL: "https://booksapi-890ba-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, remove }