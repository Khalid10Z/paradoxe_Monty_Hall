// Variables globales
let portes = [0, 0, 0]; 
let choixJoueur = null;
let porteRevelee = null;
let strategieSimulation = null; 
let nombreParties = 0; 

// Fonction pour initialiser un nouveau jeu
function initialiserJeu() {
    portes = [0, 0, 0];
    const indexVoiture = Math.floor(Math.random() * 3);
    portes[indexVoiture] = 1;
    choixJoueur = null;
    porteRevelee = null;

    document.getElementById("doors").style.display = "block";
    document.getElementById("infoMessage").textContent = "";
    document.getElementById("options").style.display = "none";
    document.getElementById("resultat").style.display = "none";
}

// Fonction pour choisir une porte
function choisirPorte(porte) {
    if (choixJoueur !== null) return; 

    choixJoueur = porte - 1; 
    do {
        porteRevelee = Math.floor(Math.random() * 3);
    } while (porteRevelee === choixJoueur || portes[porteRevelee] === 1);

    document.getElementById("infoMessage").textContent = `Vous avez choisi la porte ${porte}. Le présentateur ouvre la porte ${porteRevelee + 1}, qui contient une chèvre.`;
    document.getElementById("options").style.display = "block";
}

// Choisir de garder son choix initial
function garderPorte() {
    finirJeu(choixJoueur);
}

// Choisir de changer de porte
function changerPorte() {
    const nouvellePorte = [0, 1, 2].find(porte => porte !== choixJoueur && porte !== porteRevelee);
    finirJeu(nouvellePorte);
}

// Choix aléatoire (garder ou changer)
function choixAleatoire() {
    const decisionAleatoire = Math.random() < 0.5 ? garderPorte : changerPorte;
    decisionAleatoire();
}

// Finir le jeu et afficher le résultat
function finirJeu(porteFinale) {
    const victoire = portes[porteFinale] === 1;
    const messageResultat = victoire ? "Félicitations ! Vous avez gagné la voiture ! 🎉" : "Dommage ! Vous avez obtenu une chèvre. 🐐";
    
    document.getElementById("doors").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("resultat").style.display = "block";
    document.getElementById("resultMessage").textContent = messageResultat;
}

// Relancer un nouveau jeu unitaire
function rejouer() {
    initialiserJeu();
}

// Préparer et lancer la simulation
function lancerSimulation() {
    const strategieChoisie = document.getElementById("strategie").value;
    const nbPartiesInput = document.getElementById("nbParties").value;

    if (choixJoueur === null) {
        alert("Vous devez d'abord choisir une porte pour commencer la simulation !");
        return;
    }

    strategieSimulation = strategieChoisie;
    nombreParties = parseInt(nbPartiesInput, 10);

    simulerParties();
}

// Simuler plusieurs parties selon la stratégie
function simulerParties() {
    let victoires = 0;

    for (let i = 0; i < nombreParties; i++) {
        const portesSimulees = [0, 0, 0];
        const indexVoiture = Math.floor(Math.random() * 3);
        portesSimulees[indexVoiture] = 1;

        const choixInitial = choixJoueur;

        // Le présentateur révèle une porte avec une chèvre
        let porteReveleeSimulee;
        do {
            porteReveleeSimulee = Math.floor(Math.random() * 3);
        } while (porteReveleeSimulee === choixInitial || portesSimulees[porteReveleeSimulee] === 1);

        // Appliquer la stratégie choisie
        let choixFinal;
        if (strategieSimulation === "garder") {
            choixFinal = choixInitial;
        } else if (strategieSimulation === "changer") {
            choixFinal = [0, 1, 2].find(porte => porte !== choixInitial && porte !== porteReveleeSimulee);
        } else if (strategieSimulation === "aleatoire") {
            choixFinal = Math.random() < 0.5 ? choixInitial : [0, 1, 2].find(porte => porte !== choixInitial && porte !== porteReveleeSimulee);
        }

        if (portesSimulees[choixFinal] === 1) {
            victoires++;
        }
    }

    const defaites = nombreParties - victoires;
    document.getElementById("simulationResult").textContent = `${victoires} victoires, ${defaites} défaites sur ${nombreParties} parties. (${(victoires / nombreParties * 100).toFixed(2)}% de victoires)`;
}

// Relancer la simulation après réinitialisation
function rejouerSimulation() {
    choixJoueur = null;
    porteRevelee = null;
    strategieSimulation = null;
    nombreParties = 0;

    document.getElementById("simulationResult").textContent = "";
    document.getElementById("gameSection").style.display = "block";
    document.getElementById("infoMessage").textContent = "Choisissez une porte pour commencer la simulation.";
    document.getElementById("options").style.display = "none";
    document.getElementById("resultat").style.display = "none";
}

// Initialisation du jeu au démarrage
initialiserJeu();
