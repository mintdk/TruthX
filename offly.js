const players = [];
let activePlayers = [];
let currentPlayer = null;
let roundPlayed = new Set();

const truths = [
  "What is a secret you have never told anyone?",
  "Who do you like the most here?",
  "What was your most embarrassing moment?"
];

const dares = [
  "Do 10 push-ups",
  "Sing a song loudly",
  "Dance for 30 seconds"
];

function addPlayer() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;

  players.push({ name, retired: false });
  input.value = "";
}

function startGame() {
  if (players.length < 2) return alert("Add at least 2 players");

  activePlayers = [...players];
  document.getElementById("addPlayers").classList.add("hidden");
  document.getElementById("playersSection").classList.remove("hidden");
  renderPlayers();
}

function renderPlayers() {
  const grid = document.getElementById("playersGrid");
  grid.innerHTML = "";

  activePlayers.forEach(p => {
    const btn = document.createElement("button");
    btn.innerText = p.name;

    if (p.retired) btn.classList.add("retired");
    else if (roundPlayed.has(p.name)) btn.classList.add("played");

    grid.appendChild(btn);
  });
}

function spin() {
  const available = activePlayers.filter(
    p => !p.retired && !roundPlayed.has(p.name)
  );

  if (available.length === 0) {
    roundPlayed.clear();
    renderPlayers();
    return;
  }

  currentPlayer = available[Math.floor(Math.random() * available.length)];

  document.getElementById("playersSection").classList.add("hidden");
  document.getElementById("choiceSection").classList.remove("hidden");
  document.getElementById("currentPlayer").innerText = currentPlayer.name;
}

function chooseTruth() {
  showChallenge(truths);
}

function chooseDare() {
  showChallenge(dares);
}

function showChallenge(list) {
  const challenge = list[Math.floor(Math.random() * list.length)];

  document.getElementById("choiceSection").classList.add("hidden");
  document.getElementById("challengeSection").classList.remove("hidden");

  document.getElementById("challengePlayer").innerText = currentPlayer.name;
  document.getElementById("challengeText").innerText = challenge;
}

function completeTurn() {
  roundPlayed.add(currentPlayer.name);
  resetToPlayers();
}

function retirePlayer() {
  currentPlayer.retired = true;
  resetToPlayers();
}

function resetToPlayers() {
  document.getElementById("challengeSection").classList.add("hidden");
  document.getElementById("playersSection").classList.remove("hidden");
  renderPlayers();
}
