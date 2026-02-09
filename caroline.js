//Array med objekter//
//Hvert element i arrayet er et objekt//
let menuLinks = [
    {navn: "Rikke", url: "#rikke"},
    {navn: "Louise", url: "#louise"},
    {navn: "Sarah", url: "#sarah"}
]

//Variable scoope med LET//
let burgermenu = document.querySelector(".burger") //let burgermenu er en global variabel//
let dropdownmenu = document.querySelector(".dropdown")

//Loop gennem array //
for(let i = 0; i < menuLinks.length; i++) { 
    // Hent det aktuelle objekt
    let linkObjekt = menuLinks[i];
    
    // Lav et nyt <a> element
    let linkElement = document.createElement("a");
    
    // Sæt href og tekst
    linkElement.href = "#";
    linkElement.textContent = linkObjekt.navn;
    
    // Tilføj click event til linket
    linkElement.addEventListener("click", function(event) {
        event.preventDefault(); // Stop normal link-adfærd
        
        // Find sektionen
        let sektionId = linkObjekt.url;
        let sektion = document.querySelector(sektionId);
        
        // Scroll til sektionen
        sektion.scrollIntoView({ behavior: "smooth" });
        
        // Luk menuen
        dropdownmenu.classList.remove("open");
    });
    // Tilføj linket til dropdown-menuen
    dropdownmenu.appendChild(linkElement);
}

//Kontrolstruktur - If-else//
burgermenu.addEventListener("click", function() {
    if(dropdownmenu.classList.contains('open')) {
        // Menuen er åben - luk den
        dropdownmenu.classList.remove('open');
    } else {
        // Menuen er lukket - åbn den
        dropdownmenu.classList.add('open');
    }
})
