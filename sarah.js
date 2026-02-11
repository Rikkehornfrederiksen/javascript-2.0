// DEBUGGING
// Viser brug af console.log til fejlfinding
console.log("Sarah.js loaded");

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
    titel: "ROSA SEJL",
    dato: "Indtil 16.08.2026",
    billede: "billeder/rosasejl.jpg"
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
// Global variabel til at holde styr på hvor langt galleriet er scrollet
let scrollX = 0;

// FUNKTIONER + LOOPS + DOM
// Denne funktion bruger loop (forEach) og opretter galleri-items dynamisk i DOM'en
function opretGalleri() {
    const track = document.querySelector("#galleriTrack");
    
    // Tjek om elementet findes
    if (!track) {
        console.error("Kunne ikke finde #galleriTrack");
        return;
    }

    // Loop gennem arrayey og opretter et div-element for hvert billede
    udstillinger.forEach((udstilling, index) => {
        const item = document.createElement("div");
        item.classList.add("galleri-item");

        item.innerHTML = `
            <img src="${udstilling.billede}" alt="${udstilling.titel}">
            <h2 class="galleri-overskrift">${udstilling.titel}</h2>
            <p class="galleri-tekst">${udstilling.dato}</p>
        `;

        track.appendChild(item);
    });
    
    console.log("Galleri oprettet med", udstillinger.length, "items");
}

// FLYT GALLERIET
// Funktionen flytter galleriet horisontalt med scrollX og stopper ved sidste billede
function opdaterGalleri() {
    const track = document.querySelector("#galleriTrack");
    const viewport = document.querySelector(".galleri-viewport");

    if (!track || !viewport) return;

    // Beregner hvor langt vi kan scrolle, uden at gå for langt
    const maxScroll = Math.max(track.scrollWidth - viewport.clientWidth, 0);

    // Begræns scroll til området [0, maxScroll]
    scrollX = Math.min(scrollX, maxScroll);
    scrollX = Math.max(scrollX, 0);

    track.style.transform = `translateX(${-scrollX}px)`;
    
    console.log("ScrollX:", scrollX, "MaxScroll:", maxScroll);
}

// KONTROLSTRUKTUR
// Funktionen scroller galleriet til højre
function rykHoejre() {
    const viewport = document.querySelector(".galleri-viewport");

    // Scroll 90% af viewport bredden
    scrollX += viewport.clientWidth * 0.9;

    opdaterGalleri();
}

// Funktionen scroller galleriet til venstre
function rykVenstre() {
    const viewport = document.querySelector(".galleri-viewport");

    // Scroll 90% af viewport bredden tilbage
    scrollX -= viewport.clientWidth * 0.9;

    opdaterGalleri();
}

// START PROGRAMMET EFTER SIDEN ER LOAD'ET
// Beskriver hvornår koden starter, hvilket matcher brugen af load event
window.addEventListener("load", function () {
    console.log("Window loaded - starter galleri");

    // Opret galleri først
    opretGalleri();

    // Vent lidt for at sikre alle billeder er loadet
    setTimeout(function() {

        // EVENTS - KNAPPER
        const knapVenstre = document.querySelector("#knapVenstre");
        const knapHoejre = document.querySelector("#knapHoejre");

        if (knapVenstre && knapHoejre) {
            knapVenstre.addEventListener("click", rykVenstre);
            knapHoejre.addEventListener("click", rykHoejre);
            console.log("Knapper tilsluttet");
        } else {
            console.error("Kunne ikke finde knapper");
        }
    }, 100);
});

// OPDATERER VED RESIZE
// Sikrer at galleriet fungerer på alle skærmstørrelser
window.addEventListener("resize", function() {
    scrollX = 0; // reset scroll ved resize
    opdaterGalleri();
});