import { initializeApp } from "firebase/app";
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyBLRKdnJRAKjNjh3t5SRwofz0UajwXyIwk",
    authDomain: "lendingforte.firebaseapp.com",
    databaseURL: "https://lendingforte-default-rtdb.firebaseio.com",
    projectId: "lendingforte",
    storageBucket: "lendingforte.appspot.com",
    messagingSenderId: "460740639625",
    appId: "1:460740639625:web:bed63551a57e6e3953ff58"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database }