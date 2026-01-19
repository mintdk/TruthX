 const firebaseConfig = {
  apiKey: "AIzaSyDtckkcvckgTQZfnchhmeb97Fhcaz6ocVw",
  authDomain: "truthx-5b2d2.firebaseapp.com",
  databaseURL: "https://truthx-5b2d2-default-rtdb.firebaseio.com",
  projectId: "truthx-5b2d2",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let players = [];
let currentRound = [];

function addPlayer(){
  const input = document.getElementById("playerInput");
  const name = input.value.trim();
  if(!name) return;

  players.push({name,played:false,retired:false});
  input.value="";
  renderPlayers();
}

function renderPlayers(){
  const list = document.getElementById("playerList");
  list.innerHTML="";

  const grid=document.createElement("div");
  grid.className="players-grid";

  players.forEach(p=>{
    const b=document.createElement("div");
    b.className="player"+(p.played?" played":"")+(p.retired?" retired":"");
    b.innerText=p.name;
    grid.appendChild(b);
  });

  list.appendChild(grid);
}

function startGame(){
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  spinRoulette();
}

function spinRoulette(){
  currentRound = players.filter(p=>!p.played && !p.retired);
  if(currentRound.length===0){
    players.forEach(p=>p.played=false);
    currentRound=players.filter(p=>!p.retired);
  }

  const roulette=document.getElementById("roulette");
  roulette.innerHTML="";

  let i=0;
  const interval=setInterval(()=>{
    const p=currentRound[i%currentRound.length];
    roulette.innerText=p.name;
    i++;
  },300);

  setTimeout(()=>{
    clearInterval(interval);
    const chosen=currentRound[Math.floor(Math.random()*currentRound.length)];
    chosen.played=true;
    document.getElementById("activePlayer").innerText=chosen.name;
    document.getElementById("choice").classList.remove("hidden");
    renderPlayers();
  },3000);
}

function showTruth(){
  const txt=TRUTHS.en[Math.floor(Math.random()*TRUTHS.en.length)];
  showChallenge(txt);
}

function showDare(){
  const txt=DARES.en[Math.floor(Math.random()*DARES.en.length)];
  showChallenge(txt);
}

function showChallenge(txt){
  document.getElementById("choice").classList.add("hidden");
  document.getElementById("challengeText").innerText=txt;
  document.getElementById("challengeBox").classList.remove("hidden");
}

function complete(){
  document.getElementById("challengeBox").classList.add("hidden");
  spinRoulette();
}

function retire(){
  const name=document.getElementById("activePlayer").innerText;
  const p=players.find(p=>p.name===name);
  p.retired=true;
  document.getElementById("challengeBox").classList.add("hidden");
  spinRoulette();
}
