const canvas = document.getElementById("game");
const engine = new Engine(canvas);

engine.start();

engine.spawn("ground",[
  {
    startX: 30,
    startY: 600,
    endX: 600,
    endY: 600,
    size: 15
  },
  {
    startX: 600,
    startY: 600,
    endX: 600,
    endY: 500,
    size: 15
  },
  {
    startX: 30,
    startY: 0,
    endX: 30,
    endY: 600,
    size: 15
  },
  {
    startX: 850,
    startY: 0,
    endX: 850,
    endY: 600,
    size: 15
  },
  {
    startX: 500,
    startY: 400,
    endX: 850,
    endY: 300,
    size: 15
  }
]);

let saveData = engine.export();

document.addEventListener("keydown",(event)=>{
  engine.spawn("entity",[{
    posX: 450,
    posY: 200,
    size: 20,
    mass: 50,
    stiff: 0.5
  }]);
});

canvas.addEventListener("mousedown",(event)=>{
  event.preventDefault();

  const rect = event.target.getBoundingClientRect();

  engine.spawn("entity",[{
    posX: event.clientX - rect.left,
    posY: event.clientY - rect.top,
    size: 15,
    mass: 10,
    stiff: 0.3
  }]);
});

const gravityInput = document.getElementById("gravityInput");
const gravityValue = document.getElementById("gravityValue");

const frictionInput = document.getElementById("frictionInput");
const frictionValue = document.getElementById("frictionValue");

const debug = document.getElementById("debug");
const track = document.getElementById("track");
const trackReset = document.getElementById("trackReset");
const reset = document.getElementById("reset");

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const save = document.getElementById("save");
const load = document.getElementById("load");
const link = document.getElementById("link");

const dataFile = document.getElementById("dataFile");

gravityValue.textContent = gravityInput.value;
frictionValue.textContent = frictionInput.value;

gravityInput.addEventListener("input",(event)=>{
  gravityValue.textContent = event.target.value;
  engine.gravity = event.target.value;
});

frictionInput.addEventListener("input",(event)=>{
  frictionValue.textContent = event.target.value;
  engine.friction = event.target.value;
});

debug.addEventListener("click",()=>{
  if(engine.isDebug){
    engine.isDebug = false;
  }else{
    engine.isDebug = true;
  }
});

track.addEventListener("click",()=>{
  if(engine.isTrack){
    engine.isTrack = false;
  }else{
    engine.isTrack = true;
  }
});

trackReset.addEventListener("click",()=>{
  engine.tracks = [];
});

reset.addEventListener("click",()=>{
  engine.entities = {};
  engine.tracks = [];
});

dataFile.addEventListener("change",(event)=>{
  const reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  reader.addEventListener("load",()=>{
    data = JSON.parse(reader.result);

    saveData = reader.result;
    engine.import(data);

    gravityValue.textContent = data.gravity;
    gravityInput.value = data.gravity;

    frictionValue.textContent = data.friction;
    frictionInput.value = data.friction;
  });
});

start.addEventListener("click",()=>{
  engine.start();
});

stop.addEventListener("click",()=>{
  engine.stop();
});

save.addEventListener("click",()=>{
  saveData = engine.export();
  link.href = URL.createObjectURL(new Blob([saveData],{"type":"application/json"}));
});

load.addEventListener("click",()=>{
  const data = JSON.parse(saveData);

  engine.import(data);

  gravityValue.textContent = data.gravity;
  gravityInput.value = data.gravity;

  frictionValue.textContent = data.friction;
  frictionInput.value = data.friction;
});
