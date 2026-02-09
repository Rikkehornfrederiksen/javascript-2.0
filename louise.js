
console.log("script.js kører");

document.addEventListener("DOMContentLoaded", function () {
    AOS.init();


  // ARRAY + OBJEKTER
let billetter = [
  { type: "Voksen (inkl. sanseudstilling)", pris: 140 },
  { type: "Børn (0-17 år)", pris: 0 },
  { type: "Studerende", pris: 75 },
  { type: "Grupper (min. 12 pers.)", pris: 105 },
  { type: "Sanseudstilling (0-17 år)", pris: 40 },
  { type: "Institution skolebørn", pris: 20 },
  { type: "Undervisere", pris: 50 }
];


  // VARIABLER
  let antal = 0;
  let valgtPris = billetter[0].pris;

  // DOM
  const select = document.getElementById("ticketType");
  const antalSpan = document.getElementById("antal");
  const totalSpan = document.getElementById("total");
  const besked = document.getElementById("besked");
  const minusBtn = document.getElementById("minusBtn");
  const cartBtn = document.getElementById("cartBtn");
  const cartMessage = document.getElementById("cartMessage");


  // LOOP
  billetter.forEach(function(billet) {
    let option = document.createElement("option");
    option.textContent = billet.type + " - " + billet.pris + " kr.";
    option.value = billet.pris;
    select.appendChild(option);
  });

  // EVENT (skift type)
  select.addEventListener("change", function() {
    valgtPris = Number(this.value);
    opdaterTotal();
  });

  // PLUS
  document.getElementById("plusBtn").addEventListener("click", function() {
    antal++;
    opdaterTotal();
  });

  // MINUS
  minusBtn.addEventListener("click", function() {
    if (antal > 0) {
      antal--;
    }
    opdaterTotal();
  });
cartBtn.addEventListener("click", function() {

  if (antal === 0) {
    cartMessage.textContent = "Du skal vælge mindst 1 billet.";
    return;
  }

  cartMessage.textContent = antal + " billetter lagt i kurv";
});

  function opdaterTotal() {
    let total = antal * valgtPris;

    antalSpan.textContent = antal;
    totalSpan.textContent = total;

    minusBtn.disabled = antal === 0;

    if (antal >= 5) {
      besked.textContent = "Grupperabat aktiveret!";
    } else {
      besked.textContent = "";
    }
  }

});

