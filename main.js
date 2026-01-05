// 🔥 Firebase config (USA TU CONFIG REAL)
const firebaseConfig = {
  apiKey: "AIzaSyDtckkcvckgTQZfnchhmeb97Fhcaz6ocVw",
  authDomain: "truthx-5b2d2.firebaseapp.com",
  projectId: "truthx-5b2d2",
  storageBucket: "truthx-5b2d2.firebasestorage.app",
  messagingSenderId: "8938974196",
  appId: "1:8938974196:web:1751ed7cf33c61117767a1"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let state = {
  language: "en",
  mode: "",
  style: ""
};

const texts = {
  en: {
    subtitle: "Choose your language",
    mode: "How do you want to play?",
    style: "Choose a mode",
    offline: "Offline",
    online: "Online",
    friendly: "Friendly",
    hot: "Hot",
    couples: "Couples"
  },
  es: {
    subtitle: "Elige tu idioma",
    mode: "¿Cómo quieres jugar?",
    style: "Elige un modo",
    offline: "Offline",
    online: "Online",
    friendly: "Amistoso",
    hot: "Picante",
    couples: "Parejas"
  },
  fr: {
    subtitle: "Choisis ta langue",
    mode: "Comment veux-tu jouer ?",
    style: "Choisis un mode",
    offline: "Hors ligne",
    online: "En ligne",
    friendly: "Amical",
    hot: "Chaud",
    couples: "Couples"
  }
};
function selectLanguage(lang) {
  state.language = lang;
  applyLanguage();
  document.getElementById("modeSection").classList.remove("hidden");
}
function selectMode(mode) {
  state.mode = mode;
  document.getElementById("styleSection").classList.remove("hidden");
}

function selectStyle(style) {
  state.style = style;

  firebase.database().ref("sessions").push(state);

  if (style === "friendly") location.href = "offly.html";
  if (style === "hot") location.href = "offt.html";
  if (style === "couples") location.href = "offle.html";
}

function applyLanguage() {
  const t = texts[state.language];

  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("modeText").innerText = t.mode;
  document.getElementById("styleText").innerText = t.style;
}
