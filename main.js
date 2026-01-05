const state = {
  language: null,
  mode: null,
  style: null
};

const firebaseConfig = {
  apiKey: "AIzaSyDtckkcvckgTQZfnchhmeb97Fhcaz6ocVw",
  authDomain: "truthx-5b2d2.firebaseapp.com",
  databaseURL: "https://truthx-5b2d2-default-rtdb.firebaseio.com",
  projectId: "truthx-5b2d2",
  storageBucket: "truthx-5b2d2.firebasestorage.app",
  messagingSenderId: "8938974196",
  appId: "1:8938974196:web:1751ed7cf33c61117767a1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const translations = {
  es: {
    subtitle: "Elige tu idioma",
    playTitle: "¿Cómo quieres jugar?",
    modeTitle: "Elige un modo"
  },
  en: {
    subtitle: "Choose your language",
    playTitle: "How do you want to play?",
    modeTitle: "Choose a mode"
  },
  fr: {
    subtitle: "Choisissez votre langue",
    playTitle: "Comment voulez-vous jouer ?",
    modeTitle: "Choisissez un mode"
  }
};
function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("modeText").innerText = t.playTitle;
  document.getElementById("styleText").innerText = t.modeTitle;
}

function selectLanguage(lang) {
  state.language = lang;
  applyLanguage(lang);

  document.getElementById("langButtons").classList.add("hidden");
  document.getElementById("modeSection").classList.remove("hidden");

  db.ref("sessions/temp").set(state);
}

function selectMode(mode) {
  state.mode = mode;
  document.getElementById("styleSection").classList.remove("hidden");
  db.ref("sessions/temp").update(state);
}

function selectStyle(style) {
  state.style = style;
  db.ref("sessions/temp").update(state);

  if (style === "friendly") location.href = "offly.html";
  if (style === "hot") location.href = "offt.html";
  if (style === "couples") location.href = "offle.html";
}
