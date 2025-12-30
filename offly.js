import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const language = localStorage.getItem("language") || "en";
document.documentElement.lang = language;

const UI = {
  en:{title:"Add players",add:"Add player",start:"Start game",play:"PLAY",
      challenge:"Challenge",truth:"Truth",completed:"Completed",retire:"Retire"},
  es:{title:"Agregar jugadores",add:"Agregar jugador",start:"Iniciar juego",play:"JUGAR",
      challenge:"Reto",truth:"Verdad",completed:"Completado",retire:"Retirarse"},
  fr:{title:"Ajouter des joueurs",add:"Ajouter joueur",start:"Commencer",play:"JOUER",
      challenge:"Défi",truth:"Vérité",completed:"Terminé",retire:"Se retirer"}
}[language];

const $=id=>document.getElementById(id);
$("title").innerText=UI.title;
$("addBtn").innerText=UI.add;
$("startBtn").innerText=UI.start;
$("playBtn").innerText=UI.play;
$("challengeBtn").innerText=UI.challenge;
$("truthBtn").innerText=UI.truth;
$("completeBtn").innerText=UI.completed;
$("retireBtn").innerText=UI.retire;

const sndClick=$("sndClick");
const sndSpin=$("sndSpin");
const sndSelect=$("sndSelect");
const sndWin=$("sndWin");

let players=[];
let used=[];
let current=null;

function addPlayer(){
  const name=$("playerInput").value.trim();
  if(!name) return;
  sndClick.play();
  players.push({name,status:"active"});
  $("playerInput").value="";
  renderPlayers();
  if(players.length>=2) $("startBtn").classList.remove("hidden");
}
$("addBtn").onclick=addPlayer;
$("playerInput").addEventListener("keydown",e=>e.key==="Enter"&&addPlayer());

$("startBtn").onclick=()=>{
  $("addPlayers").classList.add("hidden");
  $("game").classList.remove("hidden");
  renderGame();
};

function renderPlayers(){
  $("playersList").innerHTML="";
  players.forEach(p=>{
    const s=document.createElement("span");
    s.innerText=p.name;
    $("playersList").appendChild(s);
  });
}

function renderGame(){
  $("namesBox").innerHTML="";
  players.forEach(p=>{
    const d=document.createElement("div");
    d.className=`player ${p.status}`;
    d.innerText=p.name;
    $("namesBox").appendChild(d);
  });
}

$("playBtn").onclick=()=>{
  sndSpin.play();
  let active=players.filter(p=>p.status==="active"&&!used.includes(p));
  if(active.length===0){
    used=[];
    players.forEach(p=>p.status==="used"&&(p.status="active"));
    renderGame();
    return;
  }

  setTimeout(()=>{
    current=active[Math.floor(Math.random()*active.length)];
    used.push(current);
    current.status="used";
    sndSelect.play();
    showModal();
    renderGame();
  },5000);
};

function showModal(){
  $("modal").classList.remove("hidden");
  $("currentPlayer").innerText=current.name;
  $("resultText").innerText="";
}

$("challengeBtn").onclick=()=>showResult("challenge");
$("truthBtn").onclick=()=>showResult("truth");

function showResult(type){
  const list=type==="challenge"?CHALLENGES:TRUTHS;
  const item=list[language][Math.floor(Math.random()*100)];
  $("resultText").innerText=item;
  saveToFirebase(type,item);
}

$("completeBtn").onclick=()=>$("modal").classList.add("hidden");

$("retireBtn").onclick=()=>{
  current.status="retired";
  $("modal").classList.add("hidden");
  renderGame();
};

async function saveToFirebase(type,text){
  await addDoc(collection(db,"offlySessions"),{
    player:current.name,
    type,
    text,
    language,
    time:new Date()
  });
}
