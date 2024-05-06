const storyElement = document.getElementById('text'); //Element hvor historien bliver displayet
const buttonsContainer = document.getElementById('option-buttons'); // Container for option knapperne

let gameState = {}; // Holder spillets stand, eller på engelsk "Holds the state of the game".

function startGame () {
    gameState = {}
    showStoryNode(1);
    }

    function showStoryNode(nodeId) {  // Funktionen her opdaterer visningen af historieteksten og knapperne baseret på den givne node.
    const node = storyNode.find(node => node.id === nodeId); // Finder noden med det givne ID i storyNode-arrayet.
    if(!node) {   // Hvis noden findes, logges en fejlbesked og funktionen afsluttes.
        console.error('no story node found with ID:', nodeId); //tjekker, om en historie-node med det givne ID eksisterer. Hvis den ikke finder en node med det angivne ID, logger den en fejlmeddelelse til konsollen, der siger "ingen historie-node fundet med ID:", efterfulgt af ID'et, der blev givet som et argument. 
        return; // funtionen aflsuttes her ved hjælp af "return" erklæringen.Det forhindrer resten af funktionen i at køre. Dette er en måde at håndtere fejl på som jeg havde hvor den sagde " iframeConsoleRunner-…6360e60b0840d9.js:1 no story node found with ID: 3" - med alle de ID'er den ikke kunne finde. Det hjalp bla at fejlsøge med dette, men det hjalp også at indsætte ID'er så den kunne finde dem.
    }

    storyElement.innerText = node.text;     // Opdaterer teksten i storyElement til teksten fra den fundne node.
     while (buttonsContainer.firstChild) {  // Fjerner alle eksisterende knapper fra buttonsContainer.
        buttonsContainer.removeChild(buttonsContainer.firstChild);
    }

    node.options.forEach(option => {   //Opretter en knap for hver mulighed i noden.
        if (isOptionAvailable(option)) {      // Tjekker om muligheen er tilgængelig baseret på spillets tilstand.
            const button = document.createElement('button');
            button.innerText = option.text;     
            button.classList.add('btn');
            button.addEventListener('click', () => chooseOption(option));  // Tilføjer event listener til knappen der kalder på chooseOption funktionen med den valgte mulighed som argument.
            buttonsContainer.appendChild(button);
        }
    });
}

// disse "|| laves ved at holde "option" (alt) + "i" - på mac!

function isOptionAvailable(option) {    // Tjekker om en given mulighed er tilgængelig baseret på spillets tilstand.
    return option.requiredState == null || option.requiredState(gameState);   // Return true hvis requiredState er null eller hvis requiredState funktionen retunerer true.
}

function chooseOption(option) {   // Funktion der håndterer valg af en mulighed
    const nextNodeId = option.nextText;        // Henter ID for næste node
    if (nextNodeId <= 0 ) {                   
        startGame();
    } else {
        gameState = Object.assign(gameState, option.setState || {});
        showStoryNode(nextNodeId);
    }
}
const storyNode = [
    {
        id: 1,
        text: "En dag åbner du en mail, der hævder at være fra din icloud-tjeneste på din Iphone/apple produkter. Den beder dig straks at nulstille din adgangskode fordi der er mistanke om en sikkerhedsbrist.",
        options: [
            { text: "Nulstil adgangskoden via linket i emailen.", nextText: 2 },
            { text: "Ignorer emailen og log ind på tjenestens officielle hjemmeside for at undersøge sagen.", nextText: 3 },
            { text: "Tjek emailens afsenderadresse for at sikre, at den er legitim.", nextText: 4 },
        ]
    },
    {
        id: 2,
        text: "Du klikker  på linket og nulstiller din adgangskode,men kort efter opdager du, at det var et phising-forsøg.Uautoriserede ændringer foretages nu på din konto.Hvad gør du?",
        options: [
            { text: "Kontakt tjenestens support og rapporter hændelsen!", nextText: 6 }, 
            { text: "Ændr dine adgangskoder på alle dine konti.", nextText: 7 }, 
            { text: "Kør en sikkerhedsscanning på din enhed.", nextText: 8 }, 
        ]
    },
    {
        id: 3,
        text: "Ved at logge ind direkte på hjemmesiden opdager du ingen sikkerhedsadvarsler fra tjenesten. Det bekræfter din mistanke om, at emailen var phishing. Hvordan styrker du dine sikkerhedsforanstaltninger fremadrettet?",
        options: [
            { text: "Aktiver to-faktor-autentifikation på alle dine konti.", nextText: 9 },
            { text: "Uddan dig selv om phishing og sikre adgangskodepraksisser.", nextText: 10 }, 
        ]
    },
    {
        id: 4,
        text: "Du tjekker afsenderadressen og opdager, at den ikke matcher tjenestens officielle domæne. Du har undgået et phishing-forsøg. Hvad gør du for at sikre dine andre konti?",
        options: [
            { text: "Skift adgangskoder på vigtige konti til stærkere, unikke kombinationer.", nextText: 21 },
            { text: "Gennemgå og opdater dine sikkerhedsindstillinger.", nextText: 12 },
            { text: "Ingen yderligere handling - du føler dig sikker nok.", nextText: 18 },
        ]
    },
    {
        id: 5,
        text: "Kundeservice bekræfter, at de ikke har sendt nogen emails om at nulstille nogle adgangskoder. De råder dig til at du ændrer din adgangskode, som en forholdsregel og derefter rapportere den mistænkelige email. Hvordan håndterer du dette?",
        options: [
            { text: "Ændr din adgangskode umiddelbart og rapporter phising forsøget.", nextText: 15 },
            { text: "Ignorer rådet, da du ikke bemærkede andre problemer.", nextText: 16 },
        ]
    },
    {
        id: 6,
        text: "Du kontakter supporten og rapporterer hændelsen.Du får at vide, at de vil undersøge sagen. Senere modtager du en bekræftelse på, at din konto er sikret igen.Overvejer du at tage yderligere sikkerhedsforanstaltninger?",
        options: [
            { text: "Ja, opdater alle sikkerhedsindstillinger nu.", nextText: 17 },
            { text: "Nej, jeg stoler på, at tjenesten håndterer det.", nextText: 18 },
        ]
    },
    {
        id: 7,
        text: "Efter at have ændret dine adganskoder til stærkere versioner på alle dine konti, føler du dig mere sikker. Du beslutter at abbonere på en adgangskode-manager for at forbedre håndteringen af dine adgangskoder ",
        options: [
            { text: "Jeg er tilfreds og føler mig sikker", nextText: 19 },
            { text: "Jeg beslutter at tage yderligere kursus i cybersikkerhed for at styrke min viden.", nextText: 17 },
        ]
    },
    {
        id: 8,
        text: "Sikkerhedsscanningen afslører flere malware-infektiner, som du straks fjerner.Du opdager også, at dine sikkerhedsindstillinger trænger tit en opdatering.Implementerer du yderligere sikkerhedssoftware?",
        options: [
            { text: "Ja, installer avanceret antivirussoftware.", nextText: 17 },
            { text: "Nej, jeg vil kun opdatere det eksisterende..", nextText: 19 },
        ]
    },
    {
        id: 9,
        text: "Du beslutter at opdatere alle dine sikkerhedsindstillinger. Du er nu sikret yderligere og har fået et godt udfald! Godt klaret!Vil du tage udfordringen igen og se hvilke andre retninger du kan tage?Vi forsikrer dig om du kan lære endnu mere ved at tage udfordringen igen!",
        options: [
            { text: "Fedt! Ja meget gerne!", nextText: 1 },
            { text: "Ellers tak!", nextText: 30 },
        ]
    },
    {
        id: 10,
        text: "Du læser op på phising og sikre adgangskode praksisser,vil du gøre yderlige sikkerhedsforanstaltninger nu?",
        options: [
            { text: "Ja jeg opdaterer alle mine adgangskoder nu!", nextText: 21 },
            { text: "Nej jeg føler mig sikker.", nextText: 16 },
        ]
    },
    {
        id: 12,
        text: "Da du opdaterer dine sikkerhedsindstillinger, kommer der en advarsel op omo virus.Hvordan reagerer du?",
        options: [
            { text: "Lukker alle hjemmesider ned og programmer og installerer et virus program.", nextText: 17 },
            { text: "Beslutter at det er for sent og gør intet.", nextText: 20 },
        ]
    },
    {
        id: 15,
        text: "Du kontakter tjenesten der råder dig til at ændre din adgangskode - gør du det?",
        options: [
            {
                text: "Ja, jeg ændrer mine adgangskoder med det samme.Men denne gang med stærkere adgangskoder",
                nextText: 21,
            },
            {
                text: "Du siger til din tjeneste du ikke vil have deres tjeneste mere i håb om at du ikke ender i et datalæk igen.",
                nextText: 16
            },
        ]

    },
            
  //Scenarie slutninger//

    {
        id: 21, 
        text: "Din proaktive tilgang har sikret alle dine digitale konti mod potentielle trusler. Du er et eksempel på cybersikkerhedsbest practices.",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 22, 
        text: "Ved at implementere det du har lært på dine vigtigste konti, har du forbedret din sikkerhed betydeligt, men nogle mindre vigtige konti forbliver sårbare.",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 16, 
        text: "Ved at ignorere problemet er din digitale sikkerhed nu alvorligt kompromitteret, hvilket fører til gentagne sikkerhedsbrud og potentielt identitetstyveri.",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 17, 
        text: "Din beslutning om at implementere regelmæssig monitorering af din digitale fodaftryk har gjort det muligt at opdage og afværge trusler proaktivt.Du har godt styr på cybersikkerhed, flot klaret!",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 18, 
        text: "Du har ikke implementeret yderligere sikkerhedstiltag, hvilket har efterladt nogle sårbarheder i din sikkerhed, selvom ingen alvorlige brud er sket endnu.",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 19, 
        text: "Du har valgt at acceptere risikoen for sikkerhedsbrud som en del af dit digitale liv, hvilket desværre fører til konstante sikkerhedsbrud og opkald til din bank",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 20,
        text: "Din inaktivitet efter flere sikkerhedsbrud har resulteret i omfattende skader på din online tilstedeværelse og personlige økonomi.",
        options: [
            {
                text: "Prøv igen.",
                nextText: 1
            }
        ]
    },
    {
        id: 30,
        text: "Vi respekterer dit valg og men opfordrer dig til allligevel at tage vores udfordring. Det vil give dig seelv indblik i om du er på rette vej når det kommer til sikkerhed,eller skal opdatere din viden. Vi tænker kun på at du skal være sikker!Vi takker for dit besøg, og ønsker dig en god rejse igennem cyberverdenen i dinn hverdag, uanset dit valg!.",
        options: [
            {
                text: "Okay, jeg vil gerne prøve udfordringen alligevel.",
                nextText: 1
            }
        ]
    }
];

startGame();


document.addEventListener("DOMContentLoaded", function() {
    const backButton = document.getElementById('.backButton');
    console.log('buttonelement', backButton); // checker hvad der logges.

    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'indexb.html';
        });
    } else {
        console.log('Back button not found');
    }
});

