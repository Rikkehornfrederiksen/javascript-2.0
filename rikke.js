console.log("det virker"); //min console log tjekker at jeg har kontakt til mit javascript i min html

const eventInfo = { //const står for constant, og den låse denne kode her, det betyder at jeg hvis jeg vil ændre dette ikke kan lave en ny kode, den sikre at vigtige værdier forbliver og skabe en konstans og stabil hjemmeside.
    title: "Overtaci - Jeg begyndte som Paradise fugl", //string
    location: "Kunstmuseum Brandts", //string
    isFree: true //boolean 
};
//arrey, det er en liste med flere objekter som kan skubbes ud i HTMLén 
const programData = [ //firkantet parantes definere at man har påbegyndt et arrey
    {tid: "12:00", status: "udsolgt", pladser: 0},
    {tid:"13:00", status: "få pladser", pladser: 3},
    {tid: "14:00", status: "ledig", pladser: 19},
    {tid: "15:00", status: "få pladser", pladser: 16},
    {tid: "16:00", status: "udsolgt", pladser: 0},
    {tid: "17:00", status: "få pladser", pladser: 4}
//mit arrey indeholder flere properties, som tid og 12:00 som er strings samt numbers ift hvor mange pladser der er tilrådighed i den specifikke museums rundvisning.
//et arrey stater altid dens numeriske objekt i 0.
];

function beregnSamledePladser() {
    let total = 0; // let fortælle java at den skal burge beholderen uanset om værdien ændre sig. Hvis jeg brugte cons her så vil værdien blive låst, og den vil konstant finde frem til den første værdie i arreyet som er 0. 
    //antal total fortæller at den skal tage hele summen af alle pladserne i arreyet
    //startværdien er som nævnt 0 i arreyet og derfor er let total = 0
    
    programData.forEach(event => { //her tager den mit arrey og gennemgå hvert objekt på listen. Her bruges loop igen, ellers skulle man skrive alle 6 objekter ind individuelt men loopen ved hvornår listen afsluttes af sig selv.
        //event => navnet på det første objekt den tager fat i i arreyet. Den tager event som er 0 og så 1 osv. 
        total += event.pladser; //dette er lommeregneren. event.pladser her tager den det nuværende objekt og henter tallet derfra eks 19 pladser.
    }); //+= betyder addition assignment operator som betyder at den skal tage de tal fra objekternes værdi altså event.pladser og lægge dem oveni hinanden. 

    return total; //fungere som modtageren af summen af de samlede event.pladser værdier og sender den ud i en funktion. 
} //min total er en lokal scope, da den ligger inde for tuborgklemmen. 
//return skal være der ellers vil værdien aldrig komme til syne i htmlen. Return fungere ligsom en dør der skubber summen ud. 

function genererProgram() { //dette er funktionen som fungere som en indkapslet handling. Den udskrives ikke med det samme at man trykker ind på browseren. 
    
    const velkomstBox = document.querySelector('#velkomst-sektion'); //her igen beder jeg java om at finde et specifikt element i html som er mit ID af velkomsthilsen. 
    
    const ledigeIAlt = beregnSamledePladser(); //denne funktion fortæller at den igennem paranteserne skal køre funktionen beregnsamledePladser som står længere oppe. 
    
    const antalTider = programData.length; //dette er beholderene til den værdi som beregnsamledePladser indhendter. 

    
    let velkomstHilsen = `<h3>Velkommen til Overtaci</h3>`;//denne variable let indholder nu min html -tekst som er h3
    velkomstHilsen += `<p>Vi har ${antalTider} tider i dag med i alt ${ledigeIAlt} ledige pladser.</p>`;
    // dette er en tilføjelsesoperator, fordi der er bundet et += til den. Det betyder at den skal tage min velksomshilsten og
    //tillægge en ny linje til teksten. Den tekst der skal tilføjes er ${antalTider} og ${ledieIAlt}, så de sprøjtes direkte ind i sætningen. 
    
    velkomstBox.innerHTML = velkomstHilsen; //dette sikre at velkomshilsen og antalTider og antalIAlt kommer til syne på skærmen. 
}


genererProgram();



const tidsKnapper = document.querySelectorAll('.tid-btn') //const tidsknapper (tidsknapper er min varaible) med const lover man script at variablen altid skal pege på det samme element.
//document fortæller java at den skal lede i min html fil for at finde min variable.
//queryselectorAll betyder at java skal finde alle min knapper i html og lægge dem sammen i en samlet liste. Hvis jeg ikke ønksede dette så skal jeg kun bruge document.queryselect.
//i min ('.tid.btn) punktummet refere til at min knapper ligger i en class, dette er med til at sikre at min java kan finde den rette værdi. 
//HVIS det var en ID den skulle finde i stedet for, så skrev man ('#tid.btn)

tidsKnapper.forEach(knap =>{ //forEach er min loop, der gør at java kigger på alle min tidsKnapper der er. Knap er det midlertidige  navn for den specifikke knap som java er i gang med at kigge på.

    knap.addEventListener('click', function(){ //her fortæller jeg java at der skal ske en hændelse den skal "lytte" efter og funcktionen til hændelsen sker når man klikker på knappen.

        const i = this.getAttribute('data-index') //dette refere til den specfikke knap man trykker på, denne knap ligger i min Html hvor jeg har lagt den i en class attribut med navnet data-index.
        const valgtTid = programData[i]; //denne del kobles til min arrey. Jeg identificere at mine data i arreyet er i. Og mit første objekt i arreyet som er kl. 12:00 nu har værdien 0, og hermed overholder loven om at alle arrey værdier starter på 0+++. 
        opdaterStatusBesked(valgtTid); //dette er en funktion, som fortæller java at den skal køre denne specifkke opgave.
    }); //valgtid det er argumentet for at opgaven skal udføre, når man trykke på et valgt tidpunkt,Den udløse funktionen.
    
});
function opdaterStatusBesked(data) { //opdaterstatusbesked beskriver præsic hvad funktionen gør. //data er parameteren og står for at det er mit arrey som er kaldt data, det er derfra funktionen skal hendte dataerne ned fra. 
    const boks = document.querySelector('#status-besked'); //her beder jeg min java om at finde et id-tag som hedder status-besked
    

    if (data.status === "udsolgt") { //her går js ind og refere fra min data i arrey, hvor der er tilagt en værdi der hedder udsolgt. Når værdien er udsolgt, så køre js den første klemme af værdier som er den første data i rækken. 
        boks.innerHTML = `<p>Kl. ${data.tid} er <strong>udsolgt</strong>.</p>`;
    } else {
        boks.innerHTML = `<p>Kl. ${data.tid} har ${data.pladser} ledige pladser.</p>`;
    } //hvis status på arreyet er andet end udsolgt, så køre javaen else som ledig eller få pladser så hopper den herned i stedet.
}   //boks refere jeg til min tidligere (#status besked)imens innerHTML går ind og finder diven og over overwrite alt andet for at den nye html kode kan dukke op.
    
    //$(data.tid) kaldes for en Template Literals, som gør det nemmere og mere overskueligt at skrive en kode, hvor der både er linjer og varibaler til stede. 
    //`´ = (backticks) medføre at jeg kan skrive flere linjer inkl variabler blandet sammen.
    // i koden ${data.tid} starter vi med (data)= den refere tilbage til mit arrey.
    //i koden $(data.tid) har vi (.) = som står for dot-notation. Den fungere som vejviser, hvor den siger gå ind i arrey og led efter noget specifikt.
    // i koden $(data.tid) har vi til sidst (tid) = som er den specifikke værdi koden leder efter. 
    document.querySelector('#display-title').innerText = eventInfo.title;

    // Find rute event
    const ruteKnap = document.querySelector('.find-rute-btn');
    ruteKnap.addEventListener('click', function() {
        Swal.fire({
        title: "Find rute til Amfipladsen 7, tryk Ok for komme videre til rute",
        width: 600,
        padding: "3em",
        color: "#050e01",
        background: "#54c0a5",
        backdrop: `
        rgba(133, 168, 132, 0.4)
        url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXFtc2R6ZmQwNmt2Z2cyeWl4dGxhMjRqOGszY3ZsczY2NGwxMjV0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T0dCL9xdzvJqqHcC4t/giphy.gif)
        left top
        no-repeat
    `
});
});





