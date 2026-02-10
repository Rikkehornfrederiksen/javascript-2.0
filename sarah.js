// DEBUGGING
console.log("Sarah.js loaded");

// ARRAYS + OBJEKTER
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
let position = 0;
let billedeBredde;
let maxPosition = 0;

// FUNKTIONER
function opretGalleri() {
    const track = document.querySelector("#galleriTrack");
    
    // Tjek om elementet findes
    if (!track) {
        console.error("Kunne ikke finde #galleriTrack");
        return;
    }

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
    
    console.log("Galleri oprettet med", udstillinger.length, "items");
}

function beregnMaxPosition() {
    const track = document.querySelector("#galleriTrack");
    const viewport = document.querySelector(".galleri-viewport");

    if (!track || !viewport) {
        console.error("Kunne ikke finde galleri elementer");
        return;
    }

    const trackBredde = track.scrollWidth;
    const viewportBredde = viewport.clientWidth;

    maxPosition = Math.ceil((trackBredde - viewportBredde) / billedeBredde);
    
    console.log("MaxPosition beregnet:", maxPosition, "TrackBredde:", trackBredde, "ViewportBredde:", viewportBredde);
}

function opdaterGalleri() {
    const track = document.querySelector("#galleriTrack");
    const viewport = document.querySelector(".galleri-viewport");

    if (!track || !viewport) return;

    let forskydning = -position * billedeBredde;
    const maxScroll = track.scrollWidth - viewport.clientWidth;

    // Begræns forskydning
    if (Math.abs(forskydning) > maxScroll) {
        forskydning = -maxScroll;
    }

    track.style.transform = `translate3d(${forskydning}px, 0, 0)`;
    
    console.log("Position:", position, "Forskydning:", forskydning, "MaxScroll:", maxScroll);
}

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

// START PROGRAMMET
window.addEventListener("load", function () {
    console.log("Window loaded - starter galleri");

    // Opret galleri først
    opretGalleri();

    // Vent lidt for at sikre alle billeder er loadet
    setTimeout(function() {
        const firstItem = document.querySelector(".galleri-item");
        
        if (!firstItem) {
            console.error("Ingen galleri-items fundet");
            return;
        }

        billedeBredde = firstItem.offsetWidth + 20;
        console.log("BilledeBredde:", billedeBredde);

        beregnMaxPosition();

        // Tilføj event listeners til knapper
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