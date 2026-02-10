// DEBUGGING
// Viser brug af console.log til fejlfinding
console.log("Test");


// ARRAYS + OBJEKTER
// Viser et array af objekter
let udstillinger = [
  {
    titel: "OVARTACI",
    dato: "Indtil 01.03.2026",
    billede: "billeder/ovartacicoverbillede.jpg"
  },
  {
    titel: "HUSKMITNAVN",
    dato: "Indtil 30.12.2026",
    billede: "billeder/huskmitnavn.jpg"
  },
  {
    titel: "DEN FANTASTISKE BUS",
    dato: "Indtil 18.10.2026",
    billede: "billeder/denfantastiskebus.jpg"
  },
  {
    titel: "CATHIE PILKINGTON",
    dato: "Indtil 06.04.2026",
    billede: "billeder/cathie.jpg"
  },
  {
    titel: "H.A. BRENDEKILDE",
    dato: "Indtil 22.02.2026",
    billede: "billeder/brendekilde.jpg"
  },
  {
    titel: "SAMLINGEN",
    dato: "PERMANENT UDSTILLING",
    billede: "billeder/samlingen.jpg"
  }
];


// VARIABLER + SCOPE
// Variabler defineres med let, som har blockscope
let position = 0;           // Hvor langt galleriet er rykket
let billedeBredde;          // Beregnes dynamisk efter load
let maxPosition = 0;        // Beregnes dynamisk


// FUNKTIONER + EVENTS + LOOPS + DOM
// Denne funktion bruger loop (forEach) og tilføjer events (click) til alle billeder
function opretGalleri() {
    const track = document.querySelector("#galleriTrack");

    udstillinger.forEach((udstilling, index) => {

    const item = document.createElement("div");
    item.classList.add("galleri-item");

    item.innerHTML = `
        <img src="${udstilling.billede}" alt="${udstilling.titel}">
        <h2 class="galleri-overskrift">${udstilling.titel}</h2>
        <p class="galleri-tekst">${udstilling.dato}</p>
    `;

    item.querySelector("img").addEventListener("click", function () {
        alert("Du har klikket på: " + udstillinger[index].titel);
    });

    track.appendChild(item);
  });
}


// BEREGN MAKSIMAL POSITION
// Beregner max position, så galleriet ikke rykker for langt
function beregnMaxPosition() {
    const track = document.querySelector("#galleriTrack");
    const viewport = document.querySelector(".galleri-viewport");

    const trackBredde = track.scrollWidth;       // total bredde af alle items
    const viewportBredde = viewport.clientWidth; // synlig bredde

    maxPosition = Math.ceil((track.scrollWidth - viewport.clientWidth) / billedeBredde);
}


// FLYT GALLERIET
// Funktionen flytter galleriet og stopper ved sidste billede
function opdaterGalleri() {
    const track = document.querySelector("#galleriTrack");
    const viewport = document.querySelector(".galleri-viewport");

    // Standard forskydning
    let forskydning = -position * billedeBredde;

    // Beregn maksimal scroll i pixels
    const maxScroll = track.scrollWidth - viewport.clientWidth;

    // Hvis vi er for langt, justér så galleri stopper præcist
    if (-forskydning > maxScroll) {
    forskydning = -maxScroll;
    }

    track.style.transform = "translateX(" + forskydning + "px)";
    console.log("Position:", position);
}


// KONTROLSTRUKTUR
// If-statement kontrolstruktur
function rykHoejre() {
  if (position < maxPosition) {
    position++;
  }
  opdaterGalleri();
}

function rykVenstre() {
  if (position > 0) {
    position--;
  }
  opdaterGalleri();
}


// START PROGRAMMET EFTER SIDEN ER LOAD'ET
// Beskriver hvornår koden starter, hvilket matcher brugen af load event
window.addEventListener("load", function () {

    // Opret galleri-indhold først
    opretGalleri();

    // Dynamisk bredde (offsetWidth virker først efter load)
    billedeBredde = document.querySelector(".galleri-item").offsetWidth + 20;

    beregnMaxPosition();


// EVENTS - KNAPPER
document
    .querySelector("#knapVenstre")
    .addEventListener("click", rykVenstre);

document
    .querySelector("#knapHoejre")
    .addEventListener("click", rykHoejre);

});
