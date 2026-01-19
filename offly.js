const players = [];
let selectedIndex = null;

const truths = [
  "Tell your biggest secret.",
  "Who was your last crush?",
  "What is your worst habit?"
];

const dares = [
  "Dance for 20 seconds.",
  "Do 10 push-ups.",
  "Sing a song loudly."
];

function addPlayer(){
  const input = document.getElementById("playerInput");
  if(!input.value) return;
  players.push({name:input.value, state:"active"});
  input.value="";
  renderSetup();
}

function renderSetup(){
  const list = document.getElementById("playersList");
  list.innerHTML="";
  players.forEach(p=>{
    const b=document.createElement("button");
    b.innerText=p.name;
    list.appendChild(b);
  });
}

function startGame(){
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  renderGrid();
}

function renderGrid(){
  const grid = document.getElementById("playerGrid");
  grid.innerHTML="";
  players.forEach(p=>{
    const b=document.createElement("button");
    b.innerText=p.name;
    b.className=p.state;
    grid.appendChild(b);
  });
}

function spinWheel(){
  const active = players.map((p,i)=>p.state==="active"?i:null).filter(i=>i!==null);
  if(active.length===0){resetRound(); return;}

  selectedIndex = active[Math.floor(Math.random()*active.length)];

  document.getElementById("game").classList.add("hidden");
  document.getElementById("selection").classList.remove("hidden");
  document.getElementById("selectedName").innerText = players[selectedIndex].name;
}

function chooseTruth(){
  showChallenge(truths);
}

function chooseDare(){
  showChallenge(dares);
}

function showChallenge(arr){
  document.getElementById("selection").classList.add("hidden");
  document.getElementById("challengeScreen").classList.remove("hidden");
  document.getElementById("challengeName").innerText = players[selectedIndex].name;
  document.getElementById("challengeText").innerText = arr[Math.floor(Math.random()*arr.length)];
}

function completeChallenge(){
  players[selectedIndex].state="played";
  returnToGrid();
}

function retirePlayer(){
  players[selectedIndex].state="retired";
  returnToGrid();
}

function returnToGrid(){
  document.getElementById("challengeScreen").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  checkRound();
  renderGrid();
}

function checkRound(){
  const remaining = players.filter(p=>p.state==="active");
  if(remaining.length===0){
    resetRound();
  }
}

function resetRound(){
  players.forEach(p=>{
    if(p.state==="played") p.state="active";
  });
  renderGrid();
}
