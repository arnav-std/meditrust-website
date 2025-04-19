// jss/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAwkibqUpHYu_V52kyqsw4I-up96GpqJtc",
    authDomain: "loginapp-47943.firebaseapp.com",
    projectId: "loginapp-47943",
    storageBucket: "loginapp-47943.appspot.com",
    messagingSenderId: "210937720299",
    appId: "1:210937720299:web:c65b4412d87f7469fa7dae",
    measurementId: "G-W4VSHZ1WKM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Make auth and db accessible globally
window.firebaseAuth = auth;
window.firebaseDB = db;
