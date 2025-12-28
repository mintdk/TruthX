
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_ID",
  appId: "TU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let userChoice = {};

function selectLanguage(lang) {
  userChoice.language = lang;
  document.getElementById("options").classList.remove("hidden");
}

function selectMode(mode) {
  userChoice.mode = mode;
  document.getElementById("styles").classList.remove("hidden");
}

async function selectStyle(style) {
  userChoice.style = style;

  await setDoc(doc(db, "sessions", Date.now().toString()), userChoice);

  alert("Selección guardada 🔥");
}

window.selectLanguage = selectLanguage;
window.selectMode = selectMode;
window.selectStyle = selectStyle;
