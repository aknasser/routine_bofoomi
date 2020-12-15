

//PAGE HERO


// LES VARIABLES AVEC UN GLOBAL SCOPE





// 1 -  AFFICHER LE DETAIL DES STATS SUR LA PAGE HERO

const expandStats = document.getElementsByClassName("competence");    // On cible l'element déclencheur du AddEventListener
for (let i = 0; i < expandStats.length; i++) {                           // Comme expandStats est une classe, on dégaine cette boucle FOR
  expandStats[i].addEventListener("click", expansion);                //  Dès que nous cliquons sur un élément de Classe "compétence", la fonction expansion se déclenche
  function expansion () {
    const extension =  expandStats[i].nextElementSibling;           // L'élément à afficher est l'élément suivant expandStats, on le cible et calons sa valeur dans la variable "extension"
    let visibleOrNot = extension.getAttribute("class");
    if (visibleOrNot === "detail") {
       extension.setAttribute("class", "detail-visible");       // Enfin, on modifie la class de la variable extension. Avec la classe "detail-visible", l'élément avec les détails s'affiche 
    } else {
      extension.setAttribute("class", "detail");
    }
  };                                             
};

// 2 -  AFFICHER LE DETAIL DES ACTIVITE SUR LA PAGE HERO

const expandActivites = document.getElementsByClassName("activite"); 
for (let i = 0; i < expandActivites.length; i++) {                          
  expandActivites[i].addEventListener("click", expansion);               
  function expansion () {
    const extension =  expandActivites[i].nextElementSibling;         
    let visibleOrNot = extension.getAttribute("class");
    if (visibleOrNot === "detail-activite") {
       extension.setAttribute("class", "detail-activite-visible");       
    } else {
      extension.setAttribute("class", "detail-activite");
    }
  };                                             
};


