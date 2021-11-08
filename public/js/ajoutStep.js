// 4 - AJOUT DE STEPS SUPPLEMENTAIRES DANS LA CREATION DE ROUTINES
const BoutonStep = document.getElementById("BoutonStep");

const ajoutStep = () => {
  let allSteps = document.getElementById("lesSteps");                              // Pour repérer la div dans laquelle on va placer l'élément nouvelement créée
  let leLabel =  document.createElement("label");
  let titleLabel =  document.createTextNode("Step");
  leLabel.appendChild(titleLabel);

                                                                // PART 2 - CREER L'INPUT
  let contentLabel = document.createElement("input");
  contentLabel.setAttribute("type", "text");
  contentLabel.setAttribute("name", "steps");
  leLabel.appendChild(contentLabel);
                                                                // PART 3 - AJOUTER LE LABEL COMPLETE DANS LE DOM
  allSteps.appendChild(leLabel);

}

BoutonStep.addEventListener("click", ajoutStep);



