let allLabels = document.getElementsByClassName("label5item");      // On cale l'ensemble des labels contenants les objectifs dans une variable

let titlePage = document.getElementsByClassName("section");               // Ici, on récupère le titre de l'user
let titleBis = document.getElementById("bucketList").innerHTML;
let objectifMax ;                                                  // Correspond au nombre d'objectifs maximum que l'user peut choisir par catégorie
let objectifTotal = 15;   // 15 car 6 x 2 obj + 3 challenges Bucket List



const laFunction = () => { 
        for (let i = 0; i < titlePage.length; i ++) {

            let aCocher = "aCocher" + i;
            let aCocherChecked = ".aCocher"+i+":checked"

            let allTick = document.querySelectorAll(".dodo:checked")
            let testVar = document.querySelectorAll(aCocherChecked);          // tout les checkbox de class aCocher qui sont checker srentrer dans cette variable
            let allBoxes = document.getElementsByClassName(aCocher);            
            let buttonVisibility = document.getElementById("leBouton");           // pour choper le bouton. Il apparaît si objectif sélectionnés = 2   
            
            if (titlePage[i].innerHTML === "Bucket List") {                     // ainsi la limite pour les Challenges Bucket List sera à 3.
                objectifMax = 3;
            } else {
                objectifMax = 2;
            }

            if (testVar.length === objectifMax) {                                  // En gros si le nombre d'objectifs sélectionnés par l'user est égal à la valeur max alors ...
                for (let j = 0; j < allBoxes.length; j++) {                           // ...une boucle for s'enclenche pour balayer l'ensemble des checkboxes, celle qui ne sont pas checker sont désactivés
                    if (allBoxes[j].checked === false) {
                        allBoxes[j].disabled = true;
                    } 
                } 
            } else if (testVar.length < objectifMax) {                         // En revanche tant que le nombre de checkboxes cochés est inférieur à la limite...
                for (let j = 0; j < allBoxes.length; j++) {                     // ... on cache le bouton "Suivant" et on parcourt les boîtes pour les laisser actives
                    allBoxes[j].disabled = false;
    
                }
            }
            if (allTick.length === objectifTotal) {
                buttonVisibility.style.display = "block";                             // ...Le bouton "Suivant" apparaît
            } else {
                buttonVisibility.style.display = "none";

            }
        }

};





for (let i = 0; i < allLabels.length; i++) {                  // Ceci nous permet de créer l'event (click) qui déclenche la fonction quand on clique sur l'un des labels.
  allLabels[i].addEventListener("click", laFunction);

};

