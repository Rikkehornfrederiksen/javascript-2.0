// DEBUGGING
console.log("Test"); 

// ARRAY MED UDSTILLINGER + OBJEKTER
let udstillinger = [
    { titel: "OVARTACI", billede: "billeder/ovartacicoverbillede.jpg", tekst: "Indtil 01.03.2026" },
    { titel: "HUSKMITNAVN", billede: "billeder/huskmitnavn.jpg", tekst: "Indtil 30.12.2026" },
    { titel: "DEN FANTASTISKE BUS", billede: "billeder/denfantastiskebus.jpg", tekst: "Indtil 18.10.2026" },
    { titel: "CATHIE PILKINGTON", billede: "billeder/cathie.jpg", tekst: "Indtil 06.04.2026" },
    { titel: "H.A. BRENDEKILDE", billede: "billeder/brendekilde.j", tekst: "Indtil 22.02.2026" },
    { titel: "SAMLINGEN", billede: "billeder/samlingen.jpg", tekst: "PERMANENT UDSTILLING" }
];

// VARIABLER + SCOPE
let position = 0;           // Hvor langt galleriet er rykket
let billedeBredde;          // Beregnes dynamisk efter load
let maxPosition = 0;        // Beregnes dynamisk

// FUNKTION: OPRET GALLERI DYNAMISK
function opretGalleri() {
    const track = document.querySelector("#galleriTrack");

    // Første gang: fjern gamle billeder
    track.innerHTML = "";

    // Opret alle gallerielementer
    udstillinger.forEach((udstilling, index) => {
        const item = document.createElement("div");
        item.classList.add("galleri-item");

        const img = document.createElement("img");
        img.src = udstilling.billede;
        img.alt = udstilling.titel;

        const h2 = document.createElement("h2");
        h2.classList.add("galleri-overskrift");
        h2.textContent = udstilling.titel;

        const p = document.createElement("p");
        p.classList.add("galleri-tekst");
        p.textContent = udstilling.tekst;

        // Klik-event
        img.addEventListener("click", () => {
            alert("Du har klikket på: " + udstilling.titel);
        });

        // Tilføj elementer til track
        item.appendChild(img);
        item.appendChild(h2);
        item.appendChild(p);
        track.appendChild(item);
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

window.addEventListener("load", function () {

  // Først opret galleri dynamisk
  opretGalleri();

  // Dynamisk bredde (offsetWidth virker først efter load)
  billedeBredde = document.querySelector(".galleri-item").offsetWidth + 20;

  beregnMaxPosition();

  // TILFØJ DISSE FIRE NYE LINJER HER:
  let venstreKnap = document.querySelector("#venstre-knap");
  let hoejreKnap = document.querySelector("#hoejre-knap");
  
  venstreKnap.addEventListener("click", rykVenstre);
  hoejreKnap.addEventListener("click", rykHoejre);
});
