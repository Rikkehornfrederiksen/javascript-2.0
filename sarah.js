// DEBUGGING
console.log("Test"); 


// DOM-MANIPULATION
const billeder = document.querySelectorAll("#galleriTrack img");


// ARRAYS + OBJEKTER
let udstillinger = Array.from(billeder).map(img => ({
  titel: img.alt,
  billede: img.src
}));


// VARIABLER + SCOPE
let position = 0;           // Hvor langt galleriet er rykket
let billedeBredde;          // Beregnes dynamisk efter load
let maxPosition = 0;        // Beregnes dynamisk

opretGalleri();

// FUNKTIONER + EVENTS + LOOPS
function opretGalleri() {
  billeder.forEach((img, index) => {
    img.addEventListener("click", function () {
      alert("Du har klikket på: " + udstillinger[index].titel);
    });
  });
}


// BEREGN MAKSIMAL POSITION (så man ikke kan rykke for langt)
function beregnMaxPosition() {
  const track = document.querySelector("#galleriTrack");
  const viewport = document.querySelector(".galleri-viewport");

  const trackBredde = track.scrollWidth;       // total bredde af alle items
  const viewportBredde = viewport.clientWidth; // synlig bredde

  // Hvor mange "steps" kan vi rykke?
  maxPosition = Math.ceil((trackBredde - viewportBredde) / billedeBredde);
}


// FLYT GALLERIET (med præcis stop ved sidste billede)
function opdaterGalleri() {
  const track = document.querySelector("#galleriTrack");
  const viewport = document.querySelector(".galleri-viewport");

  // Standard forskydning
  let forskydning = -position * billedeBredde;

  // Beregn maksimal scroll i pixels
  const maxScroll = track.scrollWidth - viewport.clientWidth;

  // Hvis vi er for langt, justér så vi stopper præcist
  if (-forskydning > maxScroll) {
    forskydning = -maxScroll;
  }

  track.style.transform = "translateX(" + forskydning + "px)";
  console.log("Position:", position);
}


// KONTROLSTRUKTUR
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
window.addEventListener("load", function () {

  // Dynamisk bredde (offsetWidth virker først efter load)
  billedeBredde = document.querySelector(".galleri-item").offsetWidth + 20;

  opretGalleri();
  beregnMaxPosition();
});
