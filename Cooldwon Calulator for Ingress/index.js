
let modChoose = [];
let friend = "";
let coolDown = 0;
let hacks = 4;
let burnout = 0;
let minutes = 0;
let seconds = 0;

function takeInput() {
  modChoose = [
    document.getElementById("mod1").value,
    document.getElementById("mod2").value,
    document.getElementById("mod3").value,
    document.getElementById("mod4").value ];

    document.getElementById("resultBox").classList.remove("hidden");
    calculate();
}

function reset(){
    modChoose=[];
    coolDown = 180;
    hacks = 4;
    burnout = 0;
    document.getElementById("mod1").value = "none";
    document.getElementById("mod2").value = "none";
    document.getElementById("mod3").value = "none";
    document.getElementById("mod4").value = "none";
    document.getElementById("resultBox").classList.add("hidden");
    document.getElementById("friend").checked = true;
    
}

function resetOne(id){
  
  switch (id) {
    case "mod1":
      document.getElementById("mod1").value = "none";
      break;
    case "mod2":
        document.getElementById("mod2").value = "none";
        break;
    case "mod3":
      document.getElementById("mod3").value = "none";
      break;
    case "mod4":
      document.getElementById("mod4").value = "none";
      break;
    default: 
    console.log("default");
      break;
  }

  modChoose[id] = "none";
}

function calculate(){
  for (let i = 0; i < modChoose.length; i++) {
  const element = modChoose[i];

  switch (element) {
    case "none":
      modChoose[i] = 0;
      break;
    case "chs":
      modChoose[i] = 20;
      break;
    case "rhs":
      modChoose[i] = 50;
      break;
    case "vrhs":
      modChoose[i] = 70;
      break; 
      case "cmh":
        modChoose[i] = -4;
        break;
        case "rmh":
        modChoose[i] = -8;
        break;  
        case "vrmh":
        modChoose[i] = -12;
        break;       
    default: 
    modChoose[i] = 0;
      break;
    }
  }

  modChoose.sort().reverse(); 
  let hacksMod = modChoose.filter((el) => el < 0);

  if (document.getElementById("friend").checked) {
    coolDown = 180;
    let newCooldown = 0
    let newHacks = 0;
    
  } else {
    coolDown = 300;
  }

  for (let i = 0; i < modChoose.length; i++) {
    
    const element = modChoose[i];
    if (element >= 0) {
      if (i==0) {
        newCooldown = (coolDown/100)*element;
        coolDown = coolDown-newCooldown;
      } else {
        newCooldown = (coolDown/100)*(element/2);
        coolDown = coolDown-newCooldown;
      }
    } else if (element<0)  {

      for (let index = 0; index < hacksMod.length; index++) {
        const element = hacksMod[index]*(-1);
        if (index==0) {
          hacks = 4 + ((element));
        } else {
          newHacks = ((element)/2);
          hacks += newHacks;
        }
        
      }
    }
  }
  

  document.getElementById("cooldown").innerText = Math.floor(coolDown);
  document.getElementById("hackBeforeBurnout").innerText = hacks;

  let timeToBurn = (hacks-1)*coolDown;
  secondsToMinute(timeToBurn);

  document.getElementById("minute").innerText = minutes;
  document.getElementById("second").innerText = seconds;


}

function secondsToMinute(time){
  minutes = Math.floor(time/60);
  seconds = Math.floor(time - minutes * 60);
  
}



// DOM
const siteContainer = document.querySelector(".site");
const toggleButton = document.querySelector("#toggle-btn");

// Function to switch the theme
const switchTheme = () => {
  siteContainer.classList.toggle("dark");
  document.getElementById("sun").classList.toggle("hidden");
  document.getElementById("moon").classList.toggle("hidden");
  console.log(document.getElementById("#toggle-btn"));
};

// Bind event to the toggle button
toggleButton.addEventListener("click", switchTheme);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.getElementById("toggle-btn").checked = true;
  switchTheme();
}







