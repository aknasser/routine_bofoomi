// Pour contourner querySelectorAll()

let allLabels = document.getElementsByClassName("item");
let objectifMax = 2;

let laFunction = () => {
  let testVar = [];
  let allBoxes = document.getElementsByClassName("aCocher");
  for(let i = 0; i< allBoxes.length; i++) {
  	if(allBoxes[i].checked === true) {
    		testVar.push(allBoxes[i]);
    }
  }
  
  let buttonVisibility = document.getElementById("LeBouton");

 if (testVar.length === 2) {
   for (let i = 0; i < allBoxes.length; i++) {
     if (allBoxes[i].checked === false) {
        allBoxes[i].disabled = true;
        buttonVisibility.style.display = "block";

     } 
   } 
 } else if (testVar.length < 2) {
   for( let i= 0; i <allBoxes.length; i++) {
      allBoxes[i].disabled = false;
      buttonVisibility.style.display = "none";
   }
 }
}; 


for (let i = 0; i < allLabels.length; i++) {
  allLabels[i].addEventListener("click", laFunction);
};

