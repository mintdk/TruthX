let userChoice = {
  language: "en",
  mode: null,
  style: null
};
const translations = {
  es: {
    subtitle: "Elige tu idioma",
    playTitle: "¿Cómo quieres jugar?",
    modeTitle: "Modo",
    buttons: {
      es: "Español",
      en: "Inglés",
      fr: "Francés",
      offline: "Offline",
      online: "Online",
      friendly: "Amistoso",
      hot: "Hot",
      couples: "Parejas"
    }
  },
  en: {
    subtitle: "Choose your language",
    playTitle: "How do you want to play?",
    modeTitle: "Mode",
    buttons: {
      es: "Spanish",
      en: "English",
      fr: "French",
      offline: "Offline",
      online: "Online",
      friendly: "Friendly",
      hot: "Hot",
      couples: "Couples"
    }
  },
  fr: {
    subtitle: "Choisis ta langue",
    playTitle: "Comment veux-tu jouer ?",
    modeTitle: "Mode",
    buttons: {
      es: "Espagnol",
      en: "Anglais",
      fr: "Français",
      offline: "Hors ligne",
      online: "En ligne",
      friendly: "Amical",
      hot: "Séduisant",
      couples: "Couple"
    }
  }
};

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.documentElement.lang = lang;

  document.getElementById("subtitle").innerText = t.subtitle;
  document.getElementById("playTitle").innerText = t.playTitle;
  document.getElementById("modeTitle").innerText = t.modeTitle;

  document.getElementById("btnEs").innerText = t.buttons.es;
  document.getElementById("btnEn").innerText = t.buttons.en;
  document.getElementById("btnFr").innerText = t.buttons.fr;

  document.getElementById("btnOffline").innerText = t.buttons.offline;
  document.getElementById("btnOnline").innerText = t.buttons.online;

  document.getElementById("btnFriendly").innerText = t.buttons.friendly;
  document.getElementById("btnHot").innerText = t.buttons.hot;
  document.getElementById("btnCouples").innerText = t.buttons.couples;
}

function selectLanguage(lang) {
  userChoice.language = lang;
  localStorage.setItem("language", lang);

  applyLanguage(lang);
  document.getElementById("options").classList.remove("hidden");
}
function selectMode(mode) {
  userChoice.mode = mode;
  localStorage.setItem("mode", mode);

  const styles = document.getElementById("styles");
  styles.classList.remove("hidden");
  styles.scrollIntoView({ behavior: "smooth", block: "center" });
}

function selectStyle(style) {
  userChoice.style = style;
  localStorage.setItem("style", style);

  if (userChoice.mode === "offline" && style === "friendly") {
    window.location.href = "/TruthX/offly.html";
  } else {
    alert("Mode coming soon 🔥");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    userChoice.language = savedLang;
    applyLanguage(savedLang);
  }
});

window.selectLanguage = selectLanguage;
window.selectMode = selectMode;
window.selectStyle = selectStyle;
