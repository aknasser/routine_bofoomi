/* LE CODE JS POUR CALER LA LIMITE DES OBJECTIFS A 2
  Update : so far the code is working. Il nous permet de cocher 2 un nombre d'objectif max = 2.


*/


let allLabels = document.getElementsByClassName("label5item");      // On cale l'ensemble des labels contenants les objectifs dans une variable

let titlePage = document.getElementById("leTitre").innerHTML;               // Ici, on récupère le titre de l'user
let objectifMax;



let laFunction = () => {  
  if (titlePage === "Bucket List") {
    objectifMax = 3;                    // Si le titre est bucket List, objectifMax = 3 (il peut choisir au maximum 3 bucketList);
  } else {
    objectifMax = 2;                                                  // Correspond au nombre d'objectifs maximum que l'user peut choisir par catégorie
  }
  let testVar = document.querySelectorAll(".aCocher:checked");          // tout les checkbox de class aCocher qui sont checker srentrer dans cette variable
  let allBoxes = document.getElementsByClassName("aCocher");            
  let buttonVisibility = document.getElementById("leBouton");           // pour choper le bouton. Il apparaît si objectif sélectionnés = 2   

 if (testVar.length === objectifMax) {                                  // En gros si le nombre d'objectifs sélectionnés par l'user est égal à la valeur max alors ...
  buttonVisibility.style.display = "block";                             // ...Le bouton "Suivant" apparaît
  for (let i = 0; i < allBoxes.length; i++) {                           // ...une boucle for s'enclenche pour balayer l'ensemble des checkboxes, celle qui ne sont pas checker sont désactivés
     if (allBoxes[i].checked === false) {
        allBoxes[i].disabled = true;

     } 
   } 
 } else if (testVar.length < objectifMax) {                         // En revanche tant que le nombre de checkboxes cochés est inférieur à la limite...
      for( let i= 0; i <allBoxes.length; i++) {                     // ... on cache le bouton "Suivant" et on parcourt les boîtes pour les laisser actives
          buttonVisibility.style.display = "none";
          allBoxes[i].disabled = false;
      }
   }
}; 

for (let i = 0; i < allLabels.length; i++) {                  // Ceci nous permet de créer l'event (click) qui déclenche la fonction quand on clique sur l'un des labels.
  allLabels[i].addEventListener("click", laFunction);
};

