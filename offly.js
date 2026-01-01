let players = [];
let current = 0;

function addName() {
  const input = document.getElementById("nameInput");
  if (!input.value.trim()) return;

  players.push(input.value.trim());
  input.value = "";
  renderPlayers();
}

function startGame() {
  if (players.length === 0) return;

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("choices").classList.remove("hidden");

  renderPlayers();
}

function renderPlayers() {
  const div = document.getElementById("players");
  div.innerHTML = "";

  players.forEach((name, i) => {
    const el = document.createElement("div");
    el.textContent = name;
    el.className = "player" + (i === current ? " active" : "");
    div.appendChild(el);
  });
}

function chooseTruth() {
  showResult(randomItem(TRUTHS.es));
}

function chooseDare() {
  showResult(randomItem(DARES.es));
}

function showResult(text) {
  document.getElementById("choices").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("playerName").textContent = players[current];
  document.getElementById("challengeText").textContent = text;
}

function nextTurn() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("choices").classList.remove("hidden");

  current = (current + 1) % players.length;
  renderPlayers();
}

function giveCompliment() {
  alert("💖 Cumplido enviado");
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
