// Lytter efter DOMContentLooaded-begivenheden, der udløses når det indledende HTML-dokument er fuldstændig indlæst og analyseret, uden at vente på at stylesheetsbilledeer og underframes er færdige med at indlæse.
document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll('.animate-on-scroll'); // vælger alle elementer med 'animate-on-scroll' class og gem dem i variablen 'elements'

    // Definer indstillingerne for IntersectionObserver, som bestemmmer under hvilke betingelser observatørens tilbagekaldsfunktion bliver kaldt.
    var options = {
        root: null,  // Bruger Rod elementet til intersection-tjek.  Hvis null standardindstilles det til borwserens viewport.
        rootMargin: '0px',  // Margin rundt om "roden" - sat til 0px som betyder ingen margin
        threshold: 0.1  // angiver hvilken procentdel af målets synlighed obserrvatørens tilbagekald skal udføres  - her udføres det når 10% af målet er synligt.
    };


    var observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            console.log("Observing:", entry.target);  // //log det aktuelt observerede element til konsollen
            if (entry.isIntersecting) {               
                entry.target.classList.add('active'); //Hvis elementet krydser, tilføjes klassen 'active' for at starte animationen
            } else {
                entry.target.classList.remove('active'); // hvis elementet ikke krydser, fjernes klassen 'active' for at stoppe eller nulstille animationen
            }
        });
    }, options);  // indstillingsobjekt for at konfigurere observatøren

    // kører iennem hvert element der bliver valgt tidligere.
    elements.forEach(element => {
        console.log("Setting up observation for:", element);  //log opsætningen af observation med formålet at fejlsøge.
        observer.observe(element); 
    }); 
});

