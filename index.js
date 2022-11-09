/*
    Cooldown Calculator for Ingress
    09.11.2022
    made by @filecc https://github.com/filecc
    idea by @Danynad https://github.com/ynad
    released under GPL-3.0 license
    source code: https://github.com/filecc/cooldown-calculator-ingress
    github-pages: https://filecc.github.io/cooldown-calculator-ingress
*/

let modChoose = [];
let friend = "";
let coolDown = 0;
let burnout = 0;
let minutes = 0;
let seconds = 0;

// event specific timing and date - single event range atm
let eventName = "Back to 90s (of cooldown)"
let coolDownEvent_friend = 90;
let coolDownEvent_enemy = 150;
let hacksEvent = 40;
let event_start = "2022-11-09T08:00:00";
let event_end = "2022-11-11T18:00:00";
let eventLink = "https://www.google.com";



function takeInput() {
  modChoose = [
    document.getElementById("mod1").value,
    document.getElementById("mod2").value,
    document.getElementById("mod3").value,
    document.getElementById("mod4").value,
  ];

  document.getElementById("resultBox").classList.remove("hidden");
  calculate();
}

function reset() {
  modChoose = [];
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

function resetOne(id) {
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

function calculate() {
  // if actual time is in event timeframe, set proper settings
  if (isDateInRange()) {
    hacks = hacksEvent;
    baseHacks = hacks;
  } else {
    hacks = 4;
    baseHacks = hacks;
  }

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
    // if actual time is in event timeframe, set proper settings
    if (isDateInRange()) {
      coolDown = coolDownEvent_friend;
    } else {
      coolDown = 180;
    }
    let newCooldown = 0;
    let newHacks = 0;
  } else {
    if (isDateInRange()) {
      coolDown = coolDownEvent_enemy;
    } else {
      coolDown = 300;
    }
  }

  for (let i = 0; i < modChoose.length; i++) {
    const element = modChoose[i];
    if (element >= 0) {
      if (i == 0) {
        newCooldown = (coolDown / 100) * element;
        coolDown = coolDown - newCooldown;
      } else {
        newCooldown = (coolDown / 100) * (element / 2);
        coolDown = coolDown - newCooldown;
      }
    } else if (element < 0) {
      for (let index = 0; index < hacksMod.length; index++) {
        const element = hacksMod[index] * -1;
        if (index == 0) {
          hacks = baseHacks + element;
        } else {
          newHacks = element / 2;
          hacks += newHacks;
        }
      }
    }
  }

  document.getElementById("cooldown").innerText = Math.floor(coolDown);
  document.getElementById("hackBeforeBurnout").innerText = hacks;

  let timeToBurn = (hacks - 1) * coolDown;
  secondsToMinute(timeToBurn);

  document.getElementById("minute").innerText = minutes;
  document.getElementById("second").innerText = seconds;
}

function secondsToMinute(time) {
  minutes = Math.floor(time / 60);
  seconds = Math.floor(time - minutes * 60);
}

// compare current date and pre-defined event start and end dates, returns boolean value if current date is in event timeframe
function isDateInRange() {
  let start_date = new Date(event_start);
  let end_date = new Date(event_end);
  let curr_date = new Date(); // current time

  document.getElementById("eventName").innerText = eventName;
  document.getElementById("startDate").innerText = "Start: " + start_date.toDateString() + " - " + start_date.getHours() +":"+start_date.getMinutes();
  document.getElementById("endDate").innerText = "End: " +  end_date.toDateString()+ " - " + end_date.getHours() +":"+end_date.getMinutes();
  document.getElementById("eventLink").setAttribute("href", eventLink);

  if ((curr_date >= start_date) && (curr_date <= end_date)) {
    let in_range = true;
    return in_range;
  } else {
    let in_range = false;
    return in_range;
  }

}

function closeAlert(){
  document.getElementById("event").classList.toggle("hidden");
}

if (isDateInRange()) {
  document.getElementById("event").classList.remove("hidden");
  document.getElementById("containerEvent").classList.remove("hidden");

}

    let end = new Date(event_end);

    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
    let timer;

    function showRemaining() {
        let now = new Date();
        let distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdown').innerHTML = days + 'days ';
        document.getElementById('countdown').innerHTML += hours + 'hrs ';
        document.getElementById('countdown').innerHTML += minutes + 'mins ';
        document.getElementById('countdown').innerHTML += seconds + 'secs';
    }

    timer = setInterval(showRemaining, 1000);


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

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.getElementById("toggle-btn").checked = true;
  switchTheme();
}
