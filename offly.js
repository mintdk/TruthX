const language = localStorage.getItem("language") || "en";

const DARES = {
  en: ["Dance for 30 seconds", "Do 10 squats"],
  es: ["Baila 30 segundos", "Haz 10 sentadillas"],
  fr: ["Danse 30 secondes", "Fais 10 squats"]
};

const TRUTHS = {
  en: ["Confess a secret", "Say something embarrassing"],
  es: ["Confiesa un secreto", "Di algo vergonzoso"],
  fr: ["Avoue un secret", "Dis quelque chose de gênant"]
};

let players = [];
let currentPlayerIndex = null;

const addPlayersSection = document.getElementById("addPlayers");
const playerSelectSection = document.getElementById("playerSelect");
const resultScreen = document.getElementById("resultScreen");

const playersContainer = document.getElementById("players");
const currentPlayerEl = document.getElementById("currentPlayer");
const challengeTextEl = document.getElementById("challengeText");
const playerInput = document.getElementById("playerInput");

function addPlayer() {
  const name = playerInput.value.trim();
  if (!name) return;

  players.push({ name, status: "active" });
  playerInput.value = "";
}

function startGame() {
  if (players.length < 2) {
    alert("Add at least 2 players");
    return;
  }

  addPlayersSection.classList.add("hidden");
  playerSelectSection.classList.remove("hidden");
  renderPlayers();
}

function renderPlayers() {
  playersContainer.innerHTML = "";

  players.forEach((player, index) => {
    const btn = document.createElement("button");
    btn.textContent = player.name;

    if (player.status === "played") btn.classList.add("played");
    if (player.status === "retired") btn.classList.add("retired");

    btn.disabled = player.status !== "active";
    btn.onclick = () => selectPlayer(index);

    playersContainer.appendChild(btn);
  });
}

function selectPlayer(index) {
  currentPlayerIndex = index;

  playerSelectSection.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  currentPlayerEl.textContent = players[index].name;
  challengeTextEl.textContent = "";
}

function choose(type) {
  const list = type === "dare" ? DARES[language] : TRUTHS[language];
  const random = list[Math.floor(Math.random() * list.length)];
  challengeTextEl.textContent = random;
}
function completed() {
  players[currentPlayerIndex].status = "played";
  resetRoundIfNeeded();
  backToSelection();
}

function retire() {
  players[currentPlayerIndex].status = "retired";
  backToSelection();
}

function resetRoundIfNeeded() {
  const active = players.filter(p => p.status === "active");
  if (active.length === 0) {
    players.forEach(p => {
      if (p.status === "played") p.status = "active";
    });
  }
}

function backToSelection() {
  resultScreen.classList.add("hidden");
  playerSelectSection.classList.remove("hidden");
  renderPlayers();
}


function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
