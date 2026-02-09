//Array med objekter//
let menuLinks = [
    {navn: "Rikke", url: "rikke"},
    {navn: "Louise", url: "louise"},
    {navn: "Sarah", url: "sarah"}
]

let burgermenu = document.querySelector(".burger")
let dropdownmenu = document.querySelector(".dropdown")

//Loop gennem array//

for(let i = 0; i < menuLinks.length; i++) {
    // Hent det aktuelle objekt
    let linkObjekt = menuLinks[i];
    
    // Lav et nyt <a> element
    let linkElement = document.createElement("a");
    
    // Sæt href (url) på linket
    linkElement.href = "#";
    
    // Sæt teksten i linket
    linkElement.textContent = linkObjekt.navn;
    
    
    // Tilføj linket til dropdown-menuen
    dropdownmenu.appendChild(linkElement);
}


burgermenu.addEventListener("click", function() {
    dropdownmenu.classList.toggle('open');
})
